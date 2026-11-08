import type { ContactFormValues } from "@/features/contact/lib/schema";

const apiBaseUrl = import.meta.env["VITE_API_BASE_URL"] ?? "http://localhost:5080";

export async function submitContactMessage(values: ContactFormValues): Promise<void> {
  const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (response.ok) return;

  let detail: string | undefined;
  try {
    const problem = (await response.json()) as { detail?: string; title?: string };
    detail = problem.detail ?? problem.title;
  } catch {
    // Keep the localized fallback when the API response is not ProblemDetails JSON.
  }

  throw new Error(detail ?? `Contact request failed (${response.status}).`);
}
