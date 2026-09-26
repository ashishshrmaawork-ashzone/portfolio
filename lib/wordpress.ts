const defaultApiUrl = "https://reactapp.kgkrealty.com/ashportfolio/wp-json";
const apiUrl = (process.env.WORDPRESS_API_URL || defaultApiUrl).replace(/\/+$/, "");
const customApiUrl = apiUrl.endsWith("/custom/v1")
  ? apiUrl
  : `${apiUrl}/custom/v1`;

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

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${customApiUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate: 300 },
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

export async function getServices(): Promise<Service[]> {
  const data: unknown = await requestJson("/services");
  return assertArray<Service>(data, "services");
}

export async function getWorkExperience(): Promise<ResumeEntry[]> {
  const data: unknown = await requestJson("/workexperience");
  return assertArray<ResumeEntry>(data, "workexperience");
}

export async function getEducation(): Promise<ResumeEntry[]> {
  const data: unknown = await requestJson("/education");
  return assertArray<ResumeEntry>(data, "education");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data: unknown = await requestJson("/testimonials");
  return assertArray<Testimonial>(data, "testimonials");
}

export async function getProjects(): Promise<PortfolioProject[]> {
  const firstPage = await requestJson<PortfolioPage>("/portfolio-page");

  if (
    !firstPage.success ||
    !Array.isArray(firstPage.data) ||
    !Number.isInteger(firstPage.total_pages) ||
    firstPage.total_pages < 1
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
}

export async function getProject(slug: string): Promise<PortfolioProject | null> {
  const response = await fetch(`${customApiUrl}/portfolio/${encodeURIComponent(slug)}`, {
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
  },
): Promise<Response> {
  return fetch(`${customApiUrl}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}
