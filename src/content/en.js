// ── Content for the service pages, the local page and the FAQ (en) ──
// Plain JS: src/seo/meta.js also imports it for titles and structured
// data. No prices and nothing that isn't Biel's own information.

export default {
  ui: {
    home: "Home",
    services: "Services",
    forWho: "Who it’s for",
    includes: "What’s included",
    process: "How I work",
    related: "Related project",
    relatedLink: "See the project",
    allProjects: "See all projects",
    faq: "Frequently asked questions",
    otherServices: "Other services",
    more: "Learn more",
    ctaTitle: "Let’s talk about your project",
    ctaText: "Tell me what you need and I’ll reply within 24 hours, no commitment.",
    ctaButton: "Let’s talk",
    processSteps: [
      { title: "We talk", text: "A first conversation, with no commitment, to understand what you need and what you want to achieve." },
      { title: "Proposal", text: "I prepare a proposal with the scope, timeline and price, so you know exactly what you’ll get." },
      { title: "Design and development", text: "I show you progress and we refine it until the site or app does the job you need." },
      { title: "Launch", text: "We publish it, I show you how to use it and I stay on hand if changes are needed." },
    ],
  },

  services: {
    "custom-apps": {
      metaTitle: "Custom management apps in Manresa, Catalonia | Biel Díaz",
      metaDescription: "Management apps built around the way you work: clients, bookings, inventory or whatever you need, in one place. Developer in Manresa, Catalonia.",
      h1: "Custom management apps",
      intro: "Tools built around the way you work: clients, bookings, inventory or whatever you need, all in one place. No more spreadsheets that don’t talk to each other.",
      forWho: [
        "Businesses running on spreadsheets, paper or several apps that don’t connect.",
        "Teams doing the same tasks by hand every day who want to automate them.",
        "Professionals who can’t find off-the-shelf software that fits how they work.",
      ],
      includes: [
        "A review of how you work now and what needs solving.",
        "Clear, easy-to-use screens on phones and computers.",
        "Users and permissions for each person on the team.",
        "Data import and export, and email notifications when needed.",
        "Launch and training so the team can use it from day one.",
      ],
      related: "sergigarcia",
      faqs: [
        { q: "Can I start with a small version and grow it later?", a: "Yes. That’s the recommended approach: we start with what you need most and add features as the app gets used." },
        { q: "Can I use the app on my phone?", a: "Yes. The apps are designed to work well on phones, tablets and computers, with nothing to install." },
      ],
    },
    gyms: {
      metaTitle: "Gym and personal trainer management software | Biel Díaz",
      metaDescription: "Members, fees, schedules and class bookings from a single app. Management for gyms, studios and personal trainers, with a client portal.",
      h1: "Gym management",
      intro: "Members, fees, schedules and class bookings from a single app. You focus on training and spend less time on paperwork.",
      forWho: [
        "Small gyms and studios (yoga, pilates, spinning, functional training).",
        "Personal trainers managing clients and sessions.",
        "Sports clubs and academies with groups and sign-ups.",
      ],
      includes: [
        "A profile for each client with status, notes and history.",
        "One-to-one or group sessions with capacity and a waitlist.",
        "Session packs or monthly plans, with alerts before they run out.",
        "A portal where clients book and cancel from their phone.",
        "Email reminders and PDF invoices.",
      ],
      related: "repwise",
      faqs: [
        { q: "Do you have ready-made software or build it from scratch?", a: "Both. Repwise is my management software for trainers and small clubs, and if you need something different, I can adapt it or build one to measure." },
        { q: "Do clients need to install an app?", a: "No. The client portal works in the phone’s browser, with nothing to install." },
      ],
    },
    portfolios: {
      metaTitle: "Custom portfolio websites for creatives | Biel Díaz",
      metaDescription: "A site that shows your work the way it deserves, designed from scratch with no templates. Portfolios for designers, photographers and professionals.",
      h1: "Custom portfolio websites",
      intro: "A site that shows your work the way it deserves, designed from scratch with no templates. Ideal for creatives and professionals who want to stand out.",
      forWho: [
        "Designers, illustrators, photographers and creative studios.",
        "Professionals who want their own site, not the same template as everyone else.",
        "Anyone who wants their work to be the first thing people see.",
      ],
      includes: [
        "A bespoke design based on your identity, with no templates.",
        "A work gallery and project pages that are easy to update.",
        "Careful animations that don’t slow the site down.",
        "A fast site that works on phones and is ready for Google.",
        "A contact form and links to your social profiles.",
      ],
      related: "tresdege",
      faqs: [
        { q: "Can I add new projects myself?", a: "Yes. We set up an easy way to add new ones so the portfolio doesn’t go stale." },
        { q: "Can you help with the copy?", a: "Yes. We review the text together so it explains what you do and helps you show up on Google." },
      ],
    },
    wordpress: {
      metaTitle: "WordPress websites in Manresa, Catalonia | Biel Díaz",
      metaDescription: "Simple, fast WordPress websites you can update yourself. For businesses in Manresa and the Bages that want to get online.",
      h1: "Simple WordPress websites",
      intro: "A simple, fast website you can update yourself. Perfect for getting online without the hassle.",
      forWho: [
        "Local businesses with no website yet or an outdated one.",
        "Professionals who want to change text and photos without depending on anyone.",
        "Anyone who needs a clear site of a few pages, well made and soon.",
      ],
      includes: [
        "A modern design that works on phones.",
        "The pages you need: from a single page to four or five.",
        "A contact form, map and WhatsApp button.",
        "Basic SEO and a Google Business profile.",
        "Training so you can update the site yourself.",
      ],
      related: null,
      faqs: [
        { q: "How long does it take?", a: "A one-page site is usually ready in one or two weeks, and a four- or five-page site in two or three. The proposal gives you the exact timeline." },
        { q: "WordPress or a custom website?", a: "WordPress is ideal if you want a simple site you can edit yourself. If you need a unique design, animations or special features, a custom site is a better fit." },
      ],
    },
    seo: {
      metaTitle: "SEO in Manresa and the Bages, Catalonia | Biel Díaz",
      metaDescription: "I help people find you on Google: technical review, content and your Google Business profile. SEO for businesses in Manresa and Catalonia.",
      h1: "SEO management",
      intro: "I help people find you on Google: technical review, content and your Google Business profile. More visits from people looking for exactly what you offer.",
      forWho: [
        "Businesses that have a website but don’t show up on Google.",
        "Local businesses that want to appear when someone searches for their service nearby.",
        "Sites that have lost traffic and don’t know why.",
      ],
      includes: [
        "A technical audit: speed, indexing, errors and structured data.",
        "Keyword research based on difficulty and what your customers search for.",
        "Better titles, descriptions and copy on every page.",
        "Setting up and optimising your Google Business profile.",
        "Search Console setup and results tracking.",
      ],
      related: null,
      faqs: [
        { q: "How long until I see results?", a: "SEO is a medium-term effort: the first changes usually show within weeks and solid results within a few months, depending on the competition." },
        { q: "Can you do SEO on a site you didn’t build?", a: "Yes. We review your current site and I suggest what to improve, whether or not we rebuild it." },
      ],
    },
    smb: {
      metaTitle: "Small business apps: quotes, orders and tasks | Biel Díaz",
      metaDescription: "I digitise your business processes with apps built for small teams: quotes, orders or tasks. Easy to use from day one.",
      h1: "Apps for small businesses",
      intro: "I digitise your business processes with apps built for small teams: quotes, orders or tasks. Easy to use from day one.",
      forWho: [
        "Small businesses and freelancers losing time to paperwork and email.",
        "Small teams that need to share information instantly.",
        "Businesses that want to stop depending on spreadsheets.",
      ],
      includes: [
        "Quotes, orders, tasks or whatever process you need to digitise.",
        "Access for the whole team with users and permissions.",
        "Statistics to see how the business is doing.",
        "Import of the data you already have, from Excel or PDF.",
        "Automatic email notifications.",
      ],
      related: "camescola",
      faqs: [
        { q: "Is the data secure?", a: "Yes. Everyone signs in with their own user, only sees what they should and the connection is encrypted." },
        { q: "Can we import the data we already have?", a: "Yes. We can bring in the data from your spreadsheets or documents so you don’t start from scratch." },
      ],
    },
  },

  local: {
    metaTitle: "Web design in Manresa and the Bages, Catalonia | Biel Díaz",
    metaDescription: "Web designer and developer in Sant Fruitós de Bages. Websites, custom apps and SEO for businesses in Manresa and the Bages, working directly with you.",
    h1: "Web design in Manresa and the Bages",
    intro: "I’m Biel, a web developer and designer in Sant Fruitós de Bages, right next to Manresa. I build websites, custom apps and SEO for local businesses and professionals.",
    whyTitle: "Why work with someone local",
    why: [
      "Direct contact: you talk to the person who designs and builds your site, with no middlemen.",
      "I know the area: I know how people in Manresa and the Bages search, and I use that to help you show up on Google.",
      "If you’re nearby, we can meet in person to talk about the project.",
    ],
    areasTitle: "Where I work",
    areas: "Manresa, Sant Fruitós de Bages, Navarcles, Santpedor, Sant Joan de Vilatorrada, Sallent, Callús, Artés and the rest of the Bages. I also work remotely with businesses across Catalonia.",
    servicesTitle: "What I can do for you",
    faqs: [
      { q: "Do you have to be in the Bages to work with you?", a: "No. Many clients are from Manresa and nearby, but I work remotely with businesses across Catalonia." },
      { q: "Can you help me show up on Google when people search locally?", a: "Yes. We optimise your site and Google Business profile so you appear when someone searches for your service in Manresa and the Bages." },
    ],
  },

  homeFaq: {
    eyebrow: "Questions",
    title: "Frequently asked questions",
    items: [
      { q: "Do you only work with businesses in the Bages?", a: "No. I’m based in Sant Fruitós de Bages and many clients are from Manresa and nearby, but I work remotely with businesses across Catalonia." },
      { q: "How much does a website or app cost?", a: "It depends on what you need. After a first conversation, with no commitment, I prepare a proposal with the scope, timeline and price." },
      { q: "How long does a website take?", a: "A simple site is usually ready in one or two weeks, and a more complete one in three or four. A custom app depends on its scope. The proposal gives you the timeline." },
      { q: "WordPress or a custom website?", a: "WordPress is ideal if you want a simple site you can edit yourself. If you need a unique design, animations or special features, a custom site is a better fit." },
      { q: "Can you help if I already have a website?", a: "Yes. I can review it, improve its SEO so it shows up on Google, or redesign it." },
    ],
  },
}
