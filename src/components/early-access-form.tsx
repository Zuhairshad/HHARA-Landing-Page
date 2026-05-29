"use client";

import { useActionState } from "react";
import { subscribeToKlaviyo, type SubscribeState } from "@/app/actions";

const initialState: SubscribeState = { status: "idle" };

export function EarlyAccessForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToKlaviyo,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="py-3 text-center">
        <p className="font-serif italic text-ink text-xl">
          Welcome to the HHARA Circle.
        </p>
        <p className="mt-2 font-sans font-light text-[12px] tracking-[0.05em] text-warm">
          We&apos;ll be in touch soon. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col" noValidate>
      <Field
        name="first_name"
        type="text"
        placeholder="First name"
        autoComplete="given-name"
        required
      />
      <DateField
        name="date_of_birth"
        autoComplete="bday"
        required
        max={today()}
      />
      <Field
        name="email"
        type="email"
        placeholder="Email address"
        autoComplete="email"
        required
      />

      {state.status === "error" && (
        <p
          role="alert"
          className="mt-2 font-serif italic text-zinfandel text-[13px]"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full min-h-[48px] bg-gold text-cream-off text-[10px] font-medium tracking-cta uppercase transition-colors duration-300 ease-out hover:bg-zinfandel disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Joining…" : "Join the HHARA Circle"}
      </button>
    </form>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-transparent border-0 border-b border-ink/[0.14] focus:border-gold focus:outline-none focus:ring-0 py-3 text-[13px] font-light tracking-[0.04em] text-ink placeholder:text-warm/60 transition-colors duration-300"
    />
  );
}

function DateField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  // Native <input type="date"> uses the locale picker. Value is always ISO
  // (YYYY-MM-DD) on submit, which the server action converts to DD/MM/YYYY.
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[13px] font-light tracking-[0.04em] text-warm/60 transition-opacity peer-[:not([data-empty='true'])]:opacity-0"
      >
        Date of birth
      </span>
      <input
        {...props}
        type="date"
        defaultValue=""
        onChange={(e) =>
          (e.currentTarget.dataset.empty = e.currentTarget.value
            ? "false"
            : "true")
        }
        data-empty="true"
        className="peer w-full bg-transparent border-0 border-b border-ink/[0.14] focus:border-gold focus:outline-none focus:ring-0 py-3 text-[13px] font-light tracking-[0.04em] text-ink transition-colors duration-300 data-[empty=true]:text-transparent data-[empty=true]:[&::-webkit-datetime-edit]:opacity-0 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[0.4] [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:hue-rotate-[10deg]"
      />
    </div>
  );
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
