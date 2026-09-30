const defaultApiUrl = "https://reactapp.kgkrealty.com/ashportfolio/wp-json";
const apiUrl = (process.env.WORDPRESS_API_URL?.trim() || defaultApiUrl).replace(/\/+$/, "");
const customApiUrl = apiUrl.endsWith("/custom/v1")
  ? apiUrl
  : `${apiUrl}/custom/v1`;
const wordpressRootUrl = apiUrl.endsWith("/custom/v1")
  ? apiUrl.slice(0, -"/custom/v1".length)
  : apiUrl;

export type SiteSettings = Record<string, string>;

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image: string;
  date: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail_image: string;
  poster_image: string;
  url: string;
  category: string;
  tech: string;
  date: string;
}

export interface Service {
  id: number;
  title: string;
  content: string;
  icon: string;
}

export interface ResumeEntry {
  id: number;
  title: string;
  experience: string;
  content: string;
}

export interface Testimonial {
  id: number;
  title: string;
  designation: string;
  review_title: string;
  review_detail: string;
  review: string;
  photo: string;
}

interface PortfolioPage {
  success: boolean;
  current_page: number;
  total_pages: number;
  data: PortfolioProject[];
}

interface WordPressPost {
  id: number;
  slug: string;
  status: string;
  date: string;
  title?: { rendered?: unknown };
  content?: { rendered?: unknown };
  excerpt?: { rendered?: unknown };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: unknown }>;
    "wp:term"?: Array<Array<{ taxonomy?: unknown; name?: unknown }>>;
  };
}

const fallbackProjects: PortfolioProject[] = [
  { id: 28, title: "Softart", slug: "softart", content: "A globally trusted ERP partner for NetSuite, Oracle, and Microsoft.", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/A-Globally-Trusted-ERP-Partner-for-NetSuite-Oracle-Microsoft-05-13-2026_02_37_PM-scaled-e1780562354304.png", poster_image: "", url: "https://softartsolutionsinc.com/", category: "IT", tech: "HTML, CSS, JS, Wordpress, PHP, REST API", date: "2026-06-04" },
  { id: 27, title: "Radiant-Dental-Care", slug: "radiant-dental-care", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Best-Affordable-Dental-Clinic-in-Chennai-Radiant-Dental-Care-05-13-2026_03_07_PM-scaled-e1780802816897.png", poster_image: "", url: "", category: "Health Care", tech: "", date: "2026-06-04" },
  { id: 26, title: "Firevolt Solar", slug: "firevolt-solar", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Firevolt-Solar-Premium-Solar-Panels-Renewable-Energy-Solutions-–-Transform-Your-Energy-with-Firevolt-Solar-05-13-2026_06_01_PM-scaled.png", poster_image: "", url: "", category: "Portfolio", tech: "", date: "2026-06-04" },
  { id: 25, title: "Game Acadmey", slug: "game-acadmey", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Game-05-13-2026_03_28_PM-scaled.png", poster_image: "", url: "", category: "Education", tech: "", date: "2026-06-04" },
  { id: 24, title: "Shyam Advisory", slug: "shyam-advisory", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Get-Expert-Share-Market-Tips-only-with-Shyam-Advisory-®-05-13-2026_05_56_PM-scaled.png", poster_image: "", url: "", category: "Investment", tech: "", date: "2026-06-04" },
  { id: 23, title: "Insight Opnion", slug: "insight-opnion", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Insights-Opinion-–-Market-Research-05-13-2026_03_49_PM-scaled.png", poster_image: "", url: "", category: "Education", tech: "", date: "2026-06-04" },
  { id: 22, title: "Jaypee University", slug: "jaypee-university", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Jaypee-University-of-Engineering-and-Technology-Best-University-Guna-05-13-2026_03_25_PM-scaled.png", poster_image: "", url: "", category: "Education", tech: "", date: "2026-06-04" },
  { id: 21, title: "Manya Dental", slug: "manya-dental", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Manya-Dental-—-Best-Dental-Clinic-in-Bangalore-8-Clinics-05-13-2026_03_22_PM-scaled.png", poster_image: "", url: "", category: "Health Care", tech: "", date: "2026-06-04" },
  { id: 20, title: "Oracare Prime", slug: "oracare-prime", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Oracare-Prime-Dental-05-13-2026_03_53_PM-scaled.png", poster_image: "", url: "", category: "Health Care", tech: "", date: "2026-06-04" },
  { id: 19, title: "PSRI Best Hospital in Delhi", slug: "psri-best-hospital-in-delhi", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/PSRI-Best-Hospital-in-Delhi-Ncr-India-24-Hours-Emergency-Hospital-Near-Me-05-13-2026_02_36_PM-scaled.png", poster_image: "", url: "", category: "Health Care", tech: "", date: "2026-06-04" },
  { id: 6, title: "Zyva", slug: "zyva", content: "", thumbnail_image: "https://reactapp.kgkrealty.com/ashportfolio/wp-content/uploads/2026/06/Zyva-05-13-2026_03_18_PM-scaled.png", poster_image: "", url: "", category: "Health Care", tech: "", date: "2026-06-04" },
];

const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "plan-your-website",
    title: "A clearer brief makes a better website.",
    content: "Start with the visitor\n\nDecide who the website is for, what question brings them to it, and what action they should take.\n\nGive every page a purpose\n\nList the pages you need and describe the job of each one. Keep pages focused on a clear visitor need.\n\nCollect the content early\n\nGather approved copy, photographs, logos and contact information before polishing the layout.\n\nDefine what ready means\n\nAgree on a launch checklist for essential pages, working links, forms and mobile navigation.",
    excerpt: "Turn a rough idea into a practical starting point for your next website.",
    category: "Planning",
    featured_image: "/assets/images/blog-01.jpg",
    date: "",
  },
  {
    id: 2,
    slug: "design-for-mobile",
    title: "Think beyond shrinking the desktop layout.",
    content: "Choose the reading order\n\nDecide what should appear first on a narrow screen instead of letting the desktop layout choose for you.\n\nMake the next action obvious\n\nUse clear button labels, comfortable touch targets and distinct actions for previews and detail pages.\n\nUse sliders deliberately\n\nKeep controls visible, show a position indicator and allow visitors to navigate without dragging.\n\nReview the complete journey\n\nTry the menu, project links, forms and return paths on phones and tablets.",
    excerpt: "A practical way to think about content, navigation and forms on smaller screens.",
    category: "Design",
    featured_image: "/assets/images/blog-02.jpg",
    date: "",
  },
  {
    id: 3,
    slug: "website-launch-checklist",
    title: "The small details to check before launch.",
    content: "Read the site as a visitor\n\nCheck headings, spelling, contact details, image descriptions and any remaining placeholder content.\n\nFollow every important link\n\nTest navigation, project details, articles and footer links from the homepage and inner pages.\n\nTest forms end to end\n\nCheck validation, confirmation messages and that submissions reach the intended recipient.\n\nPlan for the next update\n\nKeep an editable content list, record what changed and decide who will maintain the site.",
    excerpt: "A focused review of content, links and everyday interactions before sharing a site.",
    category: "Workflow",
    featured_image: "/assets/images/blog-03.jpg",
    date: "",
  },
];

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${customApiUrl}${path}`, {
    ...init,
    signal: AbortSignal.timeout(10000),
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    next: init?.next ?? { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API request failed (${response.status}): ${path}`);
  }

  return (await response.json()) as T;
}

function assertArray<T>(data: unknown, endpoint: string): T[] {
  if (!Array.isArray(data)) {
    throw new Error(`WordPress API returned an invalid collection: ${endpoint}`);
  }

  return data as T[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    async function requestPage(page: number) {
      const response = await fetch(
        `${wordpressRootUrl}/wp/v2/posts?per_page=100&_embed=1&page=${page}`,
        {
          signal: AbortSignal.timeout(10000),
          headers: { Accept: "application/json" },
          next: { revalidate: 60 },
        },
      );

      if (!response.ok) {
        throw new Error(`WordPress API request failed (${response.status}): posts?page=${page}`);
      }
      return {
        posts: assertArray<WordPressPost>(await response.json(), "posts"),
        totalPages: Number(response.headers.get("X-WP-TotalPages") || "1"),
      };
    }

    const firstPage = await requestPage(1);
    if (!Number.isInteger(firstPage.totalPages) || firstPage.totalPages < 0) {
      throw new Error("WordPress API returned an invalid posts page count.");
    }
    const laterPages = await Promise.all(
      Array.from({ length: Math.max(0, firstPage.totalPages - 1) }, (_, index) =>
        requestPage(index + 2),
      ),
    );
    const posts = [firstPage.posts, ...laterPages.map((page) => page.posts)].flat();

    return posts
      .filter(
        (post) =>
          post.status === "publish" &&
          post.slug !== "hello-world" &&
          typeof post.slug === "string",
      )
      .map((post) => {
        const terms = post._embedded?.["wp:term"]?.flat() ?? [];
        const category = terms.find((term) => term.taxonomy === "category");
        const media = post._embedded?.["wp:featuredmedia"]?.[0];

        return {
          id: post.id,
          slug: post.slug,
          title: typeof post.title?.rendered === "string" ? post.title.rendered : "",
          content:
            typeof post.content?.rendered === "string" ? post.content.rendered : "",
          excerpt:
            typeof post.excerpt?.rendered === "string" ? post.excerpt.rendered : "",
          category: typeof category?.name === "string" ? category.name : "Articles",
          featured_image:
            typeof media?.source_url === "string" ? media.source_url : "",
          date: typeof post.date === "string" ? post.date : "",
        };
      });
  } catch (error) {
    console.error("WordPress blog unavailable; using saved articles.", error);
    return fallbackBlogPosts;
  }
}

export async function getServices(): Promise<Service[]> {
  const data: unknown = await requestJson("/services");
  return assertArray<Service>(data, "services");
}

export async function getWorkExperience(): Promise<ResumeEntry[]> {
  const data: unknown = await requestJson("/workexperience", {
    next: { revalidate: 0 },
  });
  return assertArray<ResumeEntry>(data, "workexperience");
}

export async function getEducation(): Promise<ResumeEntry[]> {
  const data: unknown = await requestJson("/education", {
    next: { revalidate: 0 },
  });
  return assertArray<ResumeEntry>(data, "education");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data: unknown = await requestJson("/testimonials");
  return assertArray<Testimonial>(data, "testimonials");
}

export async function getProjects(): Promise<PortfolioProject[]> {
  try {
    const firstPage = await requestJson<PortfolioPage>("/portfolio-page");

    if (
      !firstPage.success ||
      !Array.isArray(firstPage.data) ||
      !Number.isInteger(firstPage.total_pages) ||
      firstPage.total_pages < 0
    ) {
      throw new Error("WordPress API returned an invalid portfolio page.");
    }

    const otherPages = await Promise.all(
      Array.from({ length: Math.max(0, firstPage.total_pages - 1) }, (_, index) =>
        requestJson<PortfolioPage>(`/portfolio-page?page=${index + 2}`),
      ),
    );

    for (const page of otherPages) {
      if (!page.success || !Array.isArray(page.data)) {
        throw new Error("WordPress API returned an invalid portfolio page.");
      }
    }

    return [...firstPage.data, ...otherPages.flatMap((page) => page.data)];
  } catch (error) {
    console.error("WordPress projects unavailable; using saved portfolio data.", error);
    return fallbackProjects;
  }
}

export async function getProject(slug: string): Promise<PortfolioProject | null> {
  const response = await fetch(`${customApiUrl}/portfolio/${encodeURIComponent(slug)}`, {
    signal: AbortSignal.timeout(10000),
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`WordPress API request failed (${response.status}): project/${slug}`);
  }

  const project: unknown = await response.json();
  if (
    !project ||
    typeof project !== "object" ||
    !("id" in project) ||
    !("slug" in project) ||
    project.slug !== slug
  ) {
    throw new Error(`WordPress API returned an invalid project: ${slug}`);
  }

  return project as PortfolioProject;
}

export function plainText(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/p>|<br\s*\/?>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number(value)))
    .replace(/&#x([0-9a-f]+);/gi, (_, value: string) =>
      String.fromCodePoint(parseInt(value, 16)),
    )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function submitContactMessage(
  payload: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    type: "contact" | "quote";
  },
): Promise<Response> {
  return fetch(`${customApiUrl}/messages`, {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  return {};
}
