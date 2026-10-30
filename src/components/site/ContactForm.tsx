"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { getApiBase } from "@/lib/api";
import { whatsappUrl } from "@/lib/seo";
import { IconCheck, IconWhatsapp } from "./Icons";

// Values are sent as-is; keep in sync with the backend contact options (GET /api/platform/contact).
const monthlyOptions = ["Up to 1,000", "1,001 – 5,000", "5,001 – 10,000", "10,001 – 20,000", "20,000+"];

const initialForm = { shopName: "", fullName: "", email: "", phoneNumber: "", monthlyVolume: "", message: "" };
const isEmailValid = (v: string) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(v);
const isPhoneValid = (v: string) => v.replace(/\D/g, "").length >= 10;
const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-foreground placeholder:text-slate-400 transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

export default function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary["contact"] }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const set = (field: keyof typeof initialForm, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setFeedback(null);
    if (!form.shopName.trim() || !form.fullName.trim() || !form.email.trim() || !form.phoneNumber.trim() || !form.monthlyVolume) {
      return setFeedback({ type: "error", message: dict.errRequired });
    }
    if (!isEmailValid(form.email)) return setFeedback({ type: "error", message: dict.errEmail });
    if (!isPhoneValid(form.phoneNumber)) return setFeedback({ type: "error", message: dict.errPhone });
    if (!monthlyOptions.includes(form.monthlyVolume)) return setFeedback({ type: "error", message: dict.errVolume });

    setSubmitting(true);
    try {
      const res = await fetch(`${getApiBase()}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopName: form.shopName.trim(),
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          monthlyVolume: form.monthlyVolume,
          message: form.message.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) throw new Error(locale === "en" ? data.message ?? data.error ?? dict.errGeneric : dict.errGeneric);
      setForm(initialForm);
      setFeedback({ type: "success", message: dict.success });
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error && error.message ? error.message : dict.errGeneric });
    } finally {
      setSubmitting(false);
    }
  };

  const label = "text-sm font-semibold text-foreground";
  const req = <span className="ml-0.5 text-rose-500">*</span>;

  return (
    <main className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,140,251,0.25),transparent)]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.25fr]">
        <div className="animate-fade-up lg:pt-6">
          <span className="eyebrow">{dict.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{dict.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{dict.subtitle}</p>
          <ul className="mt-8 space-y-3">
            {dict.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm font-medium text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><IconCheck className="h-4 w-4" /></span>
                {perk}
              </li>
            ))}
          </ul>
          <div className="card mt-10 flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366]"><IconWhatsapp className="h-6 w-6" /></span>
            <div>
              <p className="text-sm font-semibold text-foreground">{dict.whatsapp}</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand underline-offset-4 hover:underline">{dict.whatsappCta} →</a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="card animate-fade-up space-y-6 p-6 [animation-delay:120ms] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={`${label} sm:col-span-2`}>{dict.shopName}{req}
              <input className={inputClass} value={form.shopName} onChange={(e) => set("shopName", e.target.value)} placeholder={dict.shopNamePlaceholder} required autoComplete="organization" />
            </label>
            <label className={label}>{dict.fullName}{req}
              <input className={inputClass} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder={dict.fullNamePlaceholder} required autoComplete="name" />
            </label>
            <label className={label}>{dict.email}{req}
              <input type="email" className={inputClass} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required autoComplete="email" />
            </label>
            <label className={`${label} sm:col-span-2`}>{dict.phone}{req}
              <input type="tel" className={inputClass} value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} placeholder={dict.phonePlaceholder} required autoComplete="tel" />
            </label>
          </div>

          <fieldset>
            <legend className={label}>{dict.volume}{req}</legend>
            <p className="mt-1 text-xs text-muted">{dict.volumeHelp}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {monthlyOptions.map((option) => {
                const checked = form.monthlyVolume === option;
                return (
                  <label key={option} className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition ${
                    checked ? "border-brand bg-brand text-white shadow" : "border-line bg-white text-foreground hover:border-primary/50"
                  } has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/20`}>
                    <input type="radio" name="volume" value={option} checked={checked} onChange={(e) => set("monthlyVolume", e.target.value)} className="sr-only" />
                    {dict.volumeLabels[option] ?? option}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className={`${label} block`}>{dict.message}
            <textarea rows={4} className={`${inputClass} resize-none`} value={form.message} maxLength={1000} onChange={(e) => set("message", e.target.value)} placeholder={dict.messagePlaceholder} />
          </label>

          {feedback && (
            <div role={feedback.type === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${
              feedback.type === "error" ? "border-rose-200 bg-rose-50 text-rose-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}>
              {feedback.message}
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full px-5 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? dict.submitting : dict.submit}
          </button>
          <p className="text-center text-xs text-muted">{dict.privacy}</p>
        </form>
      </div>
    </main>
  );
}
