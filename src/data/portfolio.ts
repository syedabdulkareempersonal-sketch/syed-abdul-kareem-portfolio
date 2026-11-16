export interface NavItem {
  label: string;
  href: string;
}

export interface RingItem {
  id: string;
  type: 'project' | 'category';
  title: string;
  subtitle: string;
  logo?: string;
  accent: 'emerald' | 'navy' | 'gold' | 'glass';
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  sublabel: string;
  theme: 'emerald' | 'navy' | 'gold' | 'glass';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  extraDetail?: string;
  tags: string[];
  logo: string;
  logoAlt: string;
  featuredWide?: boolean;
  tilt: string;
  accentColor: string;
  /**
   * Optional live URL. Leave empty ("") when not yet public.
   * As soon as you add a URL here (e.g. "https://waqtos.com"),
   * the card will automatically display a "Visit live project" button.
   */
  url?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  accent: 'emerald' | 'gold';
  icon: 'app' | 'web' | 'video' | 'marketing';
}

export interface VideoReelItem {
  id: string;
  title: string;
  format: string;
  shortUrl: string;
  embedUrl: string;
  videoId: string;
  description: string;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  description: string;
  badge: string;
}

export interface EducationData {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  certificateSingleLine: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export const PORTFOLIO_DATA = {
  owner: {
    firstName: 'Abdul',
    lastName: 'Kareem',
    fullName: 'Syed Abdul Kareem',
    badge: 'AI BUILDER · KADAPA, INDIA',
    positioningLine: '4 years of hands-on AI experience.',
    availableText: 'Available for work',
    rotatingBadgeText: 'APPS · WEBSITES · VIDEOS · MARKETING · ',
    portraitArch: 'assets/abdul-arch.webp',
    portraitAlt: 'Syed Abdul Kareem — AI Builder based in Kadapa, India',
  },
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'AI Video', href: '#videos' },
    { label: 'Journey', href: '#journey' },
    { label: 'Toolkit', href: '#toolkit' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],
  hero: {
    headlinePrefix: 'I build',
    headlineItalic: 'real',
    headlineMiddle: 'products with',
    headlineAccent: 'AI.',
    positioningLine: '4 years of hands-on AI experience.',
    subline:
      'Apps, websites, videos and marketing, built end to end with AI. I have used these tools for hours every day since ChatGPT opened to the public in 2022.',
    primaryCta: { label: 'See the work', href: '#work' },
    secondaryCta: { label: 'Start a project', href: '#contact' },
  },
  ringItems: [
    {
      id: 'waqtos',
      type: 'project',
      title: 'WaqtOS',
      subtitle: 'Personal OS',
      logo: 'assets/waqtos.webp',
      accent: 'glass',
    },
    {
      id: 'apps',
      type: 'category',
      title: 'Apps',
      subtitle: '01 · End-to-End',
      accent: 'emerald',
    },
    {
      id: 'hoor-e-ain',
      type: 'project',
      title: 'HOOR-E-AIN',
      subtitle: 'AI Companion',
      logo: 'assets/hoor-e-ain.webp',
      accent: 'glass',
    },
    {
      id: 'websites',
      type: 'category',
      title: 'Websites',
      subtitle: '02 · Responsive Web',
      accent: 'navy',
    },
    {
      id: 'cricapex',
      type: 'project',
      title: 'CricApex',
      subtitle: 'Sports Platform',
      logo: 'assets/cricapex.webp',
      accent: 'glass',
    },
    {
      id: 'videos',
      type: 'category',
      title: 'Videos',
      subtitle: '03 · AI Production',
      accent: 'gold',
    },
    {
      id: 'kadapa-cars',
      type: 'project',
      title: 'Kadapa Cars',
      subtitle: 'Web Showcase',
      logo: 'assets/kadapa-cars.webp',
      accent: 'glass',
    },
    {
      id: 'marketing',
      type: 'category',
      title: 'Marketing',
      subtitle: '04 · Brand Content',
      accent: 'emerald',
    },
  ] as RingItem[],
  marqueeText: 'Built with AI — Apps · Websites · Videos · Marketing — 4 Years of Hands-On AI Experience —',
  stats: [
    {
      value: '8,000+',
      suffix: '(est.)',
      label: 'Hours of hands-on AI use (est.)',
      sublabel: 'About 6 hours a day building with AI',
      theme: 'emerald',
    },
    {
      value: '2022',
      suffix: '4 YRS',
      label: '4 years of hands-on AI experience',
      sublabel: 'Using AI daily since ChatGPT opened to the public',
      theme: 'navy',
    },
    {
      value: '4',
      label: 'Products shipped',
      sublabel: 'WaqtOS · HOOR-E-AIN · CricApex · Kadapa Cars',
      theme: 'gold',
    },
    {
      value: '4',
      label: 'AI platforms in daily use',
      sublabel: 'Claude Max · ChatGPT Pro · Antigravity Pro · Local Models',
      theme: 'glass',
    },
  ] as StatItem[],
  projects: [
    {
      id: 'waqtos',
      title: 'WaqtOS',
      category: 'Personal Operating System',
      description:
        'A Salah-centered personal operating system. It brings worship, time management, tasks, schedules and daily responsibilities into one place, so Muslims can live a more organized, balanced and purposeful life.',
      tags: ['Salah-centered', 'Time management', 'Tasks and schedules', 'Daily responsibilities'],
      logo: 'assets/waqtos.webp',
      logoAlt: 'WaqtOS logo',
      featuredWide: true,
      tilt: '-1.2deg',
      accentColor: '#10A37F',
      url: '',
    },
    {
      id: 'hoor-e-ain',
      title: 'HOOR-E-AIN',
      category: 'App with AI Companion',
      description:
        'A lifetime wellness, family and love companion. It organizes daily routines, tracks health and habits, supports spiritual and personal growth, keeps a private journal, and includes HOOR AI for everyday questions and support.',
      tags: ['Daily routines', 'Health & habits', 'Spiritual growth', 'Private journal', 'HOOR AI'],
      logo: 'assets/hoor-e-ain.webp',
      logoAlt: 'HOOR-E-AIN logo',
      featuredWide: false,
      tilt: '1.1deg',
      accentColor: '#C9A227',
      url: '',
    },
    {
      id: 'cricapex',
      title: 'CricApex',
      category: 'Sports App',
      description:
        'A full cricket scoring and tournament platform: ball-by-ball live scoring, digital scorecards and player statistics, plus league and knockout tournaments with automatic fixtures, a points table and Net Run Rate.',
      extraDetail: 'Includes live match following, live broadcasting support, and player and team records.',
      tags: [
        'Ball-by-ball live scoring',
        'Digital scorecards',
        'Tournament fixtures',
        'Points table & NRR',
        'Live broadcasting support',
      ],
      logo: 'assets/cricapex.webp',
      logoAlt: 'CricApex logo',
      featuredWide: false,
      tilt: '-1deg',
      accentColor: '#10A37F',
      url: '',
    },
    {
      id: 'kadapa-cars',
      title: 'Kadapa Cars',
      category: 'Website',
      description: 'A website I built with AI.',
      tags: ['Website', 'Built with AI'],
      logo: 'assets/kadapa-cars.webp',
      logoAlt: 'Kadapa Cars logo',
      featuredWide: false,
      tilt: '1.2deg',
      accentColor: '#C9A227',
      url: '',
    },
  ] as ProjectItem[],
  services: [
    {
      id: 'ai-apps',
      number: '01',
      title: 'AI App Development',
      description: 'Web and mobile apps built from idea to working product with AI.',
      accent: 'emerald',
      icon: 'app',
    },
    {
      id: 'ai-websites',
      number: '02',
      title: 'AI Websites & Landing Pages',
      description: 'Clean, fast, responsive websites designed and built end to end with AI.',
      accent: 'gold',
      icon: 'web',
    },
    {
      id: 'ai-videos',
      number: '03',
      title: 'AI Video Production',
      description: 'Short-form AI videos and visual reels produced with generative AI tools.',
      accent: 'emerald',
      icon: 'video',
    },
    {
      id: 'ai-marketing',
      number: '04',
      title: 'AI Marketing & Brand Content',
      description: 'Brand visuals, creative assets and product content built with AI.',
      accent: 'gold',
      icon: 'marketing',
    },
  ] as ServiceItem[],
  videoReel: {
    id: 'ai-short-01',
    title: 'AI Video Reel — YouTube Short',
    format: 'AI Video · YouTube Short',
    shortUrl: 'https://youtube.com/shorts/nXBdBgQvUWE',
    embedUrl: 'https://www.youtube.com/embed/nXBdBgQvUWE?rel=0&modestbranding=1&playsinline=1',
    videoId: 'nXBdBgQvUWE',
    description: 'Created with AI video and creative tools.',
  } as VideoReelItem,
  journey: {
    positioningLine: '4 years of hands-on AI experience.',
    milestones: [
      {
        period: '2022',
        badge: 'DAY ONE',
        title: 'Started using AI daily',
        description: 'Started using AI daily, from when ChatGPT opened to the public in 2022.',
      },
      {
        period: '2022 – 2026',
        badge: '8,000+ HRS (EST.)',
        title: '6 hours a day across frontier & local models',
        description:
          'About 6 hours a day across Claude, ChatGPT, Antigravity and open-source models run locally. About 8,000+ hours (est.).',
      },
      {
        period: 'Now',
        badge: '4 PRODUCTS SHIPPED',
        title: 'Shipping complete products with AI',
        description: 'Shipped Kadapa Cars, CricApex, HOOR-E-AIN and WaqtOS with AI.',
      },
    ] as JourneyMilestone[],
  },
  education: {
    degree: 'Bachelor of Arts (BA)',
    institution: 'Maulana Azad National Urdu University (MANUU)',
    location: 'Hyderabad',
    period: 'Mar 2021 – Jul 2024',
    score: 'CGPA 7.62',
    certificateSingleLine:
      'Certificate: Full Stack Digital Marketing Course, WsCube Tech, 25 Nov 2024 – 14 Apr 2025, Grade A+.',
  } as EducationData,
  process: [
    {
      number: '01',
      title: 'Brief it clearly',
      description:
        'Start with the real problem, the user flow, and the exact outcome needed before generating a single screen or line of code.',
      deliverable: 'Clear scope & architecture',
    },
    {
      number: '02',
      title: 'Build it with AI',
      description:
        'Combine Claude Max, ChatGPT Pro, Google Antigravity Pro, and local models with modern web tools to build the working product step by step.',
      deliverable: 'Functional apps, sites & media',
    },
    {
      number: '03',
      title: 'Ship and refine',
      description:
        'Test on real devices, tighten every interaction, polish the copy and visuals, and ship a reliable product that people can actually use.',
      deliverable: 'Production-ready release',
    },
  ] as ProcessStep[],
  toolkit: {
    aiPlatforms: [
      {
        name: 'Claude Max',
        role: 'Deep reasoning, product architecture & full-stack coding',
      },
      {
        name: 'ChatGPT Pro',
        role: 'Daily problem solving, ideation, workflows & multimodal tasks',
      },
      {
        name: 'Google Antigravity Pro',
        role: 'Agentic engineering, UI generation & rapid end-to-end builds',
      },
      {
        name: 'Open-source models (Local)',
        role: 'Private local inference, experimentation & custom workflows',
      },
    ],
    buildingWithAi: {
      whatIMake: ['Apps', 'Websites', 'Videos', 'Marketing content'],
      techUsed: ['HTML', 'CSS', 'JavaScript', 'React', 'Firebase'],
      creativeAndCms: ['Canva', 'WordPress'],
    },
  },
  contact: {
    email: 'syedabdulkareempersonal@gmail.com',
    phone: '+91 95156 24770',
    phoneHref: 'tel:+919515624770',
    linkedin: 'https://www.linkedin.com/in/syedabdulkareemofficial/',
    linkedinLabel: 'linkedin.com/in/syedabdulkareemofficial',
    location: 'Kadapa, Andhra Pradesh, India',
    copyright: '© 2026 Syed Abdul Kareem',
  },
};
