"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200";

type PlatformResponse = Record<string, unknown> & {
  status?: string | number;
  message?: string;
  timestamp?: string;
};

type ApiBanner = {
  type: "success" | "error";
  message: string;
  platformStatus?: string | number;
};

const monthlyOptions = [
  "Up to 1,000",
  "1,001 – 5,000",
  "5,001 – 10,000",
  "10,001 – 20,000",
  "20,000+",
];

const initialFormState = {
  shopName: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  monthlyVolume: "",
  message: "",
};

const isEmailValid = (value: string) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
const isPhoneValid = (value: string) => value.replace(/\D/g, "").length >= 10;


export default function ContactFormPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<ApiBanner | null>(null);
  const [platformResponseMeta, setPlatformResponseMeta] = useState<PlatformResponse | null>(null);

  const handleInputChange = (field: keyof typeof initialFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setFeedback(null);

    if (
      !formData.shopName.trim() ||
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.monthlyVolume
    ) {
      setFeedback({ type: "error", message: "Please fill out all required fields." });
      return;
    }

    if (!isEmailValid(formData.email)) {
      setFeedback({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    if (!isPhoneValid(formData.phoneNumber)) {
      setFeedback({ type: "error", message: "Phone number must contain at least 10 digits." });
      return;
    }

    if (!monthlyOptions.includes(formData.monthlyVolume)) {
      setFeedback({ type: "error", message: "Please select a valid monthly volume option." });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        shopName: formData.shopName.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        monthlyVolume: formData.monthlyVolume,
        message: formData.message.trim() || undefined,
      };

      const baseUrl = process.env.NEXT_PUBLIC_KEEPUR_BASE_API;
      const endpoint = baseUrl ? `${baseUrl}/api/contact` : "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        platformResponse?: PlatformResponse;
        message?: string;
      };

      const platformResponse = data.platformResponse ?? {
        status: res.status,
        message: data.message,
      };

      setPlatformResponseMeta(platformResponse);
      if (process.env.NODE_ENV !== "production") {
        console.debug("POST /api/contact metadata", platformResponse);
      }

      if (!res.ok) {
        throw {
          message: data.message ?? "Submission failed. Please try again.",
          platformStatus: platformResponse.status ?? res.status,
        };
      }

      setFormData(initialFormState);
      setFeedback({
        type: "success",
        message: `${platformResponse.message ?? "Submission received."} Thanks for reaching out!`,
        platformStatus: platformResponse.status,
      });
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message ?? "Something went wrong."
          : "Something went wrong.";
      const platformStatus =
        typeof error === "object" && error !== null && "platformStatus" in error
          ? (error as { platformStatus?: string | number }).platformStatus
          : undefined;
      setFeedback({ type: "error", message: errorMessage, platformStatus });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900">
        <div className="relative isolate overflow-hidden">

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#dbe4ff] blur-3xl" />
          <div className="absolute top-10 -right-10 h-80 w-80 rounded-full bg-[#c8f6ff] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#e0defb] blur-3xl" />
        </div>

        <main className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-32 sm:px-10">
          <section className="space-y-3 rounded-3xl border border-slate-200/70 bg-white/80 px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <p className="text-xs  text-slate-500">Talk to sales</p>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Get started today</h1>
            <p className="text-sm leading-6 text-slate-600">
              Share a few details about your store so we can recommend the right plan. A Keepur specialist will reach out within one business day.
            </p>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
            <div
              aria-live="polite"
              className="sr-only"
              data-platform-response={platformResponseMeta ? JSON.stringify(platformResponseMeta) : undefined}
            >
              Platform response metadata is available for debugging.
            </div>

            

            <form className="space-y-6 text-sm text-slate-700" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="shop-name" className="text-xs font-semibold  text-slate-500">
                  Shop name
                  <span className="ml-1 text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="shop-name"
                  placeholder="Dellly store"
                  className={`${inputClass} mt-2`}
                  value={formData.shopName}
                  onChange={(event) => handleInputChange("shopName", event.target.value)}
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex w-full flex-col gap-2">
                  <span className="text-xs font-semibold  text-slate-500">
                    Full Name
                    <span className="ml-1 text-rose-500">*</span>
                  </span>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Example Name"
                    className={inputClass}
                    value={formData.fullName}
                    onChange={(event) => handleInputChange("fullName", event.target.value)}
                    required
                  />
                </label>

                <label className="flex w-full flex-col gap-2">
                  <span className="text-xs font-semibold  text-slate-500">
                    Email Address
                    <span className="ml-1 text-rose-500">*</span>
                  </span>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={formData.email}
                    onChange={(event) => handleInputChange("email", event.target.value)}
                    required
                  />
                </label>
              </div>

              <div>
                <label className="flex w-full flex-col gap-2">
                  <span className="text-xs font-semibold  text-slate-500">
                    Phone Number
                    <span className="ml-1 text-rose-500">*</span>
                  </span>
                  <input
                    id="phone-number"
                    type="tel"
                    placeholder="e.g. +880 1XXXXXXXXX"
                    className={inputClass}
                    value={formData.phoneNumber}
                    onChange={(event) => handleInputChange("phoneNumber", event.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold  text-slate-500">
                  Monthly order volume
                  <span className="ml-1 text-rose-500">*</span>
                </p>
                <p className="text-xs text-slate-500">
                  Choose the bracket that best matches your typical monthly order volume.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {monthlyOptions.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                    >
                      <input
                        type="radio"
                        name="volume"
                        className="h-4 w-4"
                        value={option}
                        checked={formData.monthlyVolume === option}
                        onChange={(event) => handleInputChange("monthlyVolume", event.target.value)}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>




              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold  text-slate-500">
                  Message (optional)
                </span>
                <textarea
                  rows={3}
                  placeholder="Tell us about your retail tech, pain points, or launch timeline."
                  className={`${inputClass} resize-none`}
                  value={formData.message}
                  onChange={(event) => handleInputChange("message", event.target.value)}
                />
              </label>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-500">
                <p>We will contact you within one business day. Keeping your data secure is our priority.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold  text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting…" : "Sign up"}
              </button>

              {feedback && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${feedback.type === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-800"
                    : "border-emerald-200 bg-emerald-50 text-emerald-800"
                    }`}
                >
                  <p>{feedback.message}</p>
                  {feedback.platformStatus && (
                    <p className="mt-1 text-xs text-slate-500">Platform status: {feedback.platformStatus}</p>
                  )}
                </div>
              )}
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
