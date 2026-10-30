import type { Locale } from "@/i18n/config";

type SolutionCopy = {
  heading: string;
  summary: string;
  description: string;
  sections: readonly (readonly [string, string])[];
};

type Solution = { slug: string } & Record<Locale, SolutionCopy>;

export const solutions: readonly Solution[] = [
  {
    slug: "pos-software-bangladesh",
    en: {
      heading: "POS software in Bangladesh",
      summary: "Manage retail checkout, invoices, sales history, and refunds with a web-based point-of-sale system.",
      description: "Explore Keepur POS software for Bangladesh: retail checkout, billing, product inventory, sales history, staff access, and reports in one web-based system.",
      sections: [
        ["What is POS software?", "Point-of-sale software records retail transactions and helps staff create bills at checkout. Keepur connects these sales records with product inventory and business reports."],
        ["Checkout and retail billing", "Find products, build a sale, create an invoice, and review previous transactions. Barcode workflows support product lookup and help staff work with larger product catalogs."],
        ["Choose a POS for your shop", "Compare product limits, staff access, store allowances, and reporting features before selecting a plan. Keepur publishes its available plan limits in the pricing section."],
      ],
    },
    bn: {
      heading: "বাংলাদেশে পস সফটওয়্যার",
      summary: "ওয়েব-ভিত্তিক পস সিস্টেমে চেকআউট, ইনভয়েস, বিক্রির ইতিহাস ও রিফান্ড পরিচালনা করুন।",
      description: "বাংলাদেশের জন্য Keepur পস সফটওয়্যার: চেকআউট, বিলিং, পণ্যের ইনভেন্টরি, বিক্রির ইতিহাস, স্টাফ অ্যাক্সেস ও রিপোর্ট — এক ওয়েব-ভিত্তিক সিস্টেমে।",
      sections: [
        ["পস সফটওয়্যার কী?", "পয়েন্ট-অব-সেল (পস) সফটওয়্যার দোকানের প্রতিটি বিক্রি রেকর্ড করে এবং চেকআউটে স্টাফকে বিল তৈরি করতে সাহায্য করে। Keepur এই বিক্রির রেকর্ডকে পণ্যের ইনভেন্টরি ও ব্যবসার রিপোর্টের সাথে যুক্ত করে।"],
        ["চেকআউট ও বিলিং", "পণ্য খুঁজুন, বিক্রি তৈরি করুন, ইনভয়েস দিন এবং আগের লেনদেন দেখুন। বারকোড দিয়ে পণ্য খোঁজা যায়, ফলে বড় পণ্য তালিকাতেও স্টাফ দ্রুত কাজ করতে পারে।"],
        ["আপনার দোকানের জন্য পস বেছে নিন", "প্ল্যান বেছে নেওয়ার আগে পণ্যের সীমা, স্টাফ অ্যাক্সেস, দোকানের সংখ্যা ও রিপোর্টের ফিচার তুলনা করুন। Keepur-এর প্রতিটি প্ল্যানের সীমা মূল্য-সেকশনে দেওয়া আছে।"],
      ],
    },
  },
  {
    slug: "shop-management-software",
    en: {
      heading: "Shop management software",
      summary: "Bring daily sales, stock, expenses, and staff permissions into one place for your retail shop.",
      description: "Keepur shop management software helps Bangladesh retailers organize sales, billing, inventory, expenses, staff permissions, and daily reports.",
      sections: [
        ["Daily shop operations in one place", "A shop management system connects the tasks that happen throughout the day: selling products, checking stock, recording expenses, and reviewing performance. Keepur provides these workflows in a web-based retail application."],
        ["Staff and owner access", "Give staff access to the tasks they need and use owner reports to review business activity. Team-member allowances depend on your selected plan."],
        ["From spreadsheets to organized records", "Keep product and transaction records together rather than maintaining separate daily sales and stock sheets. Review available expense tracking and reporting features when choosing your subscription."],
      ],
    },
    bn: {
      heading: "দোকান ম্যানেজমেন্ট সফটওয়্যার",
      summary: "দৈনিক বিক্রি, স্টক, খরচ ও স্টাফ পারমিশন — আপনার দোকানের সবকিছু এক জায়গায়।",
      description: "Keepur দোকান ম্যানেজমেন্ট সফটওয়্যার দিয়ে বাংলাদেশের খুচরা ব্যবসায়ীরা বিক্রি, বিলিং, ইনভেন্টরি, খরচ, স্টাফ পারমিশন ও দৈনিক রিপোর্ট গুছিয়ে রাখতে পারেন।",
      sections: [
        ["দোকানের প্রতিদিনের কাজ এক জায়গায়", "দোকান ম্যানেজমেন্ট সিস্টেম সারাদিনের কাজগুলোকে একসাথে যুক্ত করে: পণ্য বিক্রি, স্টক দেখা, খরচ লেখা আর ব্যবসার অবস্থা যাচাই। Keepur এসব কাজ একটি ওয়েব-ভিত্তিক অ্যাপে দেয়।"],
        ["স্টাফ ও মালিকের অ্যাক্সেস", "স্টাফকে শুধু তাদের কাজের অ্যাক্সেস দিন, আর মালিক রিপোর্ট থেকে ব্যবসার সব কার্যক্রম দেখুন। কতজন টিম মেম্বার যুক্ত করা যাবে তা প্ল্যানের উপর নির্ভর করে।"],
        ["খাতা ও এক্সেল থেকে গোছানো রেকর্ডে", "বিক্রি আর স্টকের আলাদা খাতা বা শিট না রেখে পণ্য ও লেনদেনের রেকর্ড একসাথে রাখুন। সাবস্ক্রিপশন বেছে নেওয়ার সময় খরচের হিসাব ও রিপোর্টের ফিচার দেখে নিন।"],
      ],
    },
  },
  {
    slug: "inventory-management-software",
    en: {
      heading: "Inventory management software",
      summary: "Track product quantities, stock movements, adjustments, and replenishment needs alongside retail sales.",
      description: "Keepur inventory management software for retail shops in Bangladesh connects product stock, sales, stock movements, adjustments, and inventory reports.",
      sections: [
        ["Know what is in stock", "Maintain your product catalog and review stock quantities by SKU. Connecting checkout with inventory helps shop owners understand how sales affect available products."],
        ["Track stock movements", "Review movements and adjustments to understand changes in product quantities. Stock movement history and inventory alert availability depend on your plan."],
        ["Compare inventory plans", "Check product limits, store allowances, stock movement history, and inventory alerts in the pricing section. Choose limits that fit your current catalog and expected growth."],
      ],
    },
    bn: {
      heading: "ইনভেন্টরি ম্যানেজমেন্ট সফটওয়্যার",
      summary: "বিক্রির সাথে সাথে পণ্যের পরিমাণ, স্টক মুভমেন্ট, অ্যাডজাস্টমেন্ট ও রিস্টকের প্রয়োজন ট্র্যাক করুন।",
      description: "বাংলাদেশের খুচরা দোকানের জন্য Keepur ইনভেন্টরি ম্যানেজমেন্ট সফটওয়্যার — পণ্যের স্টক, বিক্রি, স্টক মুভমেন্ট, অ্যাডজাস্টমেন্ট ও ইনভেন্টরি রিপোর্ট একসাথে।",
      sections: [
        ["কী স্টকে আছে জানুন", "পণ্যের তালিকা গুছিয়ে রাখুন এবং SKU অনুযায়ী স্টকের পরিমাণ দেখুন। চেকআউট আর ইনভেন্টরি যুক্ত থাকায় বিক্রির প্রভাব স্টকে সাথে সাথে বোঝা যায়।"],
        ["স্টক মুভমেন্ট ট্র্যাক করুন", "পণ্যের পরিমাণ কেন বদলেছে তা মুভমেন্ট ও অ্যাডজাস্টমেন্ট থেকে দেখুন। স্টক মুভমেন্টের ইতিহাস ও ইনভেন্টরি অ্যালার্ট প্ল্যানের উপর নির্ভর করে।"],
        ["ইনভেন্টরি প্ল্যান তুলনা করুন", "মূল্য-সেকশনে পণ্যের সীমা, দোকানের সংখ্যা, স্টক মুভমেন্টের ইতিহাস ও অ্যালার্ট দেখুন। আপনার বর্তমান পণ্য তালিকা ও ভবিষ্যৎ প্রবৃদ্ধির সাথে মানানসই প্ল্যান বেছে নিন।"],
      ],
    },
  },
  {
    slug: "multi-store-pos",
    en: {
      heading: "Multi-store POS software",
      summary: "Manage multiple retail stores with store-level stock, sales records, and reporting under one business.",
      description: "Explore Keepur multi-store POS software for Bangladesh retailers. Manage store-level sales, inventory, staff access, and reports with configured store allowances.",
      sections: [
        ["Manage more than one retail store", "Multi-store POS software organizes sales and inventory by store while keeping the business under one account. Keepur supports stores as part of its retail management system."],
        ["Store-level visibility", "Review sales and stock for individual locations so records stay associated with the correct store. Organize staff access around the work your team performs."],
        ["Check your store allowance", "Store limits are shown with available plans. Select a plan that supports the number of stores you operate, or contact Keepur to discuss your requirements."],
      ],
    },
    bn: {
      heading: "একাধিক দোকানের পস সফটওয়্যার",
      summary: "এক ব্যবসার অধীনে একাধিক দোকান চালান — প্রতিটি দোকানের আলাদা স্টক, বিক্রি ও রিপোর্ট।",
      description: "বাংলাদেশের খুচরা ব্যবসায়ীদের জন্য Keepur মাল্টি-স্টোর পস। প্রতিটি দোকানের বিক্রি, ইনভেন্টরি, স্টাফ অ্যাক্সেস ও রিপোর্ট আলাদাভাবে পরিচালনা করুন।",
      sections: [
        ["একাধিক দোকান পরিচালনা করুন", "মাল্টি-স্টোর পস সফটওয়্যার এক অ্যাকাউন্টের অধীনে দোকানভিত্তিক বিক্রি ও ইনভেন্টরি গুছিয়ে রাখে। Keepur-এর রিটেইল ম্যানেজমেন্ট সিস্টেমে একাধিক দোকান যুক্ত করা যায়।"],
        ["প্রতিটি দোকানের আলাদা হিসাব", "প্রতিটি দোকানের বিক্রি ও স্টক আলাদাভাবে দেখুন, যাতে রেকর্ড সঠিক দোকানের সাথেই থাকে। টিমের কাজ অনুযায়ী স্টাফ অ্যাক্সেস ঠিক করুন।"],
        ["দোকানের সংখ্যা যাচাই করুন", "প্রতিটি প্ল্যানে কয়টি দোকান অন্তর্ভুক্ত তা দেখানো আছে। আপনার দোকানের সংখ্যার সাথে মানানসই প্ল্যান বেছে নিন, অথবা Keepur-এর সাথে যোগাযোগ করুন।"],
      ],
    },
  },
];

export function findSolution(slug: string) {
  return solutions.find((item) => item.slug === slug);
}
