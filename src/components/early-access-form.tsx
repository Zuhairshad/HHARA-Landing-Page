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
      <div className="py-3 text-left">
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
    <form action={formAction} className="flex flex-col gap-3" noValidate>
      <LabeledField
        label="First Name"
        name="first_name"
        type="text"
        placeholder="Your first name"
        autoComplete="given-name"
        required
      />
      <LabeledField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
      />
      <LabeledDateField
        label="Date of Birth"
        name="date_of_birth"
        autoComplete="bday"
        required
        max={today()}
      />

      {state.status === "error" && (
        <p
          role="alert"
          className="mt-1 font-serif italic text-zinfandel text-[13px]"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-full min-h-[48px] px-4 bg-bark text-cream-off text-[10px] font-medium tracking-[0.32em] sm:tracking-cta uppercase transition-colors duration-300 ease-out hover:bg-zinfandel disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Joining…" : "Join the HHARA Circle"}
      </button>

      <p className="mt-1.5 text-center font-sans font-light text-[9px] leading-[1.4] tracking-[0.03em] text-warm">
        By joining, you agree to receive emails from HHARA. Unsubscribe anytime.
      </p>
    </form>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function LabeledField({ label, ...props }: FieldProps) {
  return (
    <label className="block">
      <span className="block font-sans font-semibold text-[9px] tracking-eyebrow uppercase text-gold">
        {label}
      </span>
      <input
        {...props}
        className="mt-1 w-full bg-transparent border-0 border-b border-ink/[0.14] focus:border-gold focus:outline-none focus:ring-0 py-2.5 text-[13px] font-light tracking-[0.04em] text-ink placeholder:text-warm/60 transition-colors duration-300"
      />
    </label>
  );
}

function LabeledDateField({ label, ...props }: FieldProps) {
  return (
    <label className="block">
      <span className="block font-sans font-semibold text-[9px] tracking-eyebrow uppercase text-gold">
        {label}
      </span>
      <input
        {...props}
        type="date"
        defaultValue=""
        className="mt-1 w-full bg-transparent border-0 border-b border-ink/[0.14] focus:border-gold focus:outline-none focus:ring-0 py-2 text-[13px] font-light tracking-[0.04em] text-ink transition-colors duration-300 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[0.4] [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:hue-rotate-[10deg]"
      />
    </label>
  );
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
