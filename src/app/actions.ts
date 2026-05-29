"use server";

import { Resend } from "resend";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const KLAVIYO_API_REVISION = "2024-10-15";

export async function subscribeToKlaviyo(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const firstName = String(formData.get("first_name") ?? "").trim();
  const dob = String(formData.get("date_of_birth") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!firstName) return { status: "error", message: "Please enter your first name." };
  // Accept native ISO (YYYY-MM-DD) from <input type="date"> as primary;
  // fall back to DD/MM/YYYY for compatibility.
  let isoDob: string;
  let displayDob: string;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    isoDob = dob;
    const [yyyy, mm, dd] = dob.split("-");
    displayDob = `${dd}/${mm}/${yyyy}`;
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
    const [dd, mm, yyyy] = dob.split("/");
    isoDob = `${yyyy}-${mm}-${dd}`;
    displayDob = dob;
  } else {
    return { status: "error", message: "Please pick a valid date of birth." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { status: "error", message: "Please enter a valid email address." };

  // TEMP: Klaviyo disabled while we verify Resend in isolation.
  // Restore by un-commenting and re-checking creds when ready.
  //
  // const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  // const listId = process.env.KLAVIYO_LIST_ID;
  // if (!apiKey || !listId) {
  //   console.error("[klaviyo] Missing env vars");
  //   return { status: "error", message: "We're not quite ready yet. Please try again shortly." };
  // }
  // const klaviyoResult = await postToKlaviyo({ apiKey, listId, email, firstName, dob, isoDob });
  // if (klaviyoResult.status === "error") return klaviyoResult;

  // Resend test path: await it so we surface real errors to the UI.
  try {
    await sendResendNotification({ firstName, email, dob: displayDob, isoDob });
  } catch (err) {
    console.error("[resend] notification failed", err);
    return {
      status: "error",
      message: "Resend notification failed. Check terminal logs.",
    };
  }

  return { status: "success" };
}

async function postToKlaviyo({
  apiKey,
  listId,
  email,
  firstName,
  dob,
  isoDob,
}: {
  apiKey: string;
  listId: string;
  email: string;
  firstName: string;
  dob: string;
  isoDob: string;
}): Promise<SubscribeState> {
  const body = {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source: "HHARA Early Access Landing",
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email,
                first_name: firstName,
                properties: {
                  date_of_birth: isoDob,
                  date_of_birth_input: dob,
                  source: "hhara-early-access",
                },
                subscriptions: {
                  email: { marketing: { consent: "SUBSCRIBED" } },
                },
              },
            },
          ],
        },
      },
      relationships: {
        list: { data: { type: "list", id: listId } },
      },
    },
  };

  try {
    const res = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          "Content-Type": "application/json",
          accept: "application/json",
          revision: KLAVIYO_API_REVISION,
        },
        body: JSON.stringify(body),
      },
    );

    if (res.status === 202 || res.ok) return { status: "success" };

    const errText = await res.text();
    console.error("[klaviyo] subscribe failed", res.status, errText);
    return {
      status: "error",
      message:
        res.status === 409
          ? "You're already on the list. See you soon."
          : "Something went wrong. Please try again in a moment.",
    };
  } catch (err) {
    console.error("[klaviyo] network error", err);
    return {
      status: "error",
      message: "We couldn't reach the network. Please try again.",
    };
  }
}

async function sendResendNotification({
  firstName,
  email,
  dob,
  isoDob,
}: {
  firstName: string;
  email: string;
  dob: string;
  isoDob: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_NOTIFICATION_TO;
  const from = process.env.RESEND_FROM ?? "HHARA Site <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "[resend] Missing RESEND_API_KEY or RESEND_NOTIFICATION_TO env vars",
    );
    throw new Error("Resend not configured");
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toISOString();

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New HHARA early access signup · ${firstName}`,
    replyTo: email,
    text: [
      "A new sign-up just joined the HHARA Circle.",
      "",
      `First name:    ${firstName}`,
      `Email:         ${email}`,
      `Date of birth: ${dob} (ISO: ${isoDob})`,
      `Submitted at:  ${submittedAt}`,
      "",
      "Profile has also been pushed to Klaviyo.",
    ].join("\n"),
    html: `
      <div style="font-family: -apple-system, system-ui, sans-serif; color:#2A1F14; background:#F7F3ED; padding:32px;">
        <h2 style="font-weight:300; letter-spacing:-0.01em; margin:0 0 16px;">New HHARA early access signup</h2>
        <p style="color:#7A6555; line-height:1.6; margin:0 0 24px;">A new sign-up just joined the HHARA Circle.</p>
        <table style="border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:6px 16px 6px 0; color:#7A6555;">First name</td><td style="padding:6px 0;">${escapeHtml(firstName)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0; color:#7A6555;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#B8892E; text-decoration:none;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0; color:#7A6555;">Date of birth</td><td style="padding:6px 0;">${escapeHtml(dob)} <span style="color:#7A6555;">(ISO: ${escapeHtml(isoDob)})</span></td></tr>
          <tr><td style="padding:6px 16px 6px 0; color:#7A6555;">Submitted at</td><td style="padding:6px 0;">${escapeHtml(submittedAt)}</td></tr>
        </table>
        <p style="color:#7A6555; font-size:12px; margin-top:32px;">Profile has also been pushed to Klaviyo.</p>
      </div>
    `,
  });

  if (error) {
    console.error("[resend] send error", error);
    throw new Error(`Resend error: ${error.message ?? "unknown"}`);
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
