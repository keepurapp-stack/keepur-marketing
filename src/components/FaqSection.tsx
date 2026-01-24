"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How quickly can a shop start using keepur?",
    a: "Most shops get started within a  hours. We help with basic setup, product list import, and staff onboarding so you can start using keepur without slowing down daily business.",
  },
  {
    q: "Do I need to replace my existing POS?",
    a: "No. keepur is designed to work with what you already use. It connects sales, inventory, and reports into one place, without forcing you to change your current setup.",
  },
  {
    q: "Is keepur suitable for small shops, or only big retailers?",
    a: "keepur works for a single shop just as well as for growing businesses. You can start small and scale to multiple outlets when your business grows.",
  },
  {
    q: "What happens if internet is slow or unstable?",
    a: "keepur is built for real conditions. Daily operations continue smoothly, and data syncs automatically once the connection is stable again.",
  },
  {
    q: "Is my business data safe?",
    a: "Yes. Your data belongs to you. keepur uses secure infrastructure and access controls so only authorized people from your team can see sensitive information.",
  },
  {
    q: "How does keepur use AI?",
    a: "Our goal is to build a self-driven business manager. Over time, keepur will learn from your sales, stock movement, and customer patterns to suggest what needs attention — without you having to search through reports.",
  },
  {
    q: "Will keepur replace managers or staff?",
    a: "No. keepur is built to support people, not replace them. It reduces manual work and confusion so teams can focus on customers and better decisions.",
  },
  {
    q: "Can we integrate keepur with other tools later?",
    a: "Yes. keepur is built with future integrations in mind, so it can connect with accounting tools, CRM systems, and other services as your business evolves.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative rounded-[44px] border border-slate-200 bg-white px-6 py-12 sm:px-10"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Common questions
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground">
            Everything you need to know.
          </h2>
          <p className="max-w-prose text-sm text-slate-600">
            Clear answers to help you understand how keepur fits into your daily
            business and long-term growth.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {faq.q}
                  </span>
                  <span className="text-slate-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-6 text-slate-600">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Closing reassurance */}
        <p className="text-xs text-slate-500">
          Still have questions? We’re happy to talk and understand your business.
        </p>
      </div>
    </section>
  );
}
