import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";

import appCss from "@/styles.css?url";
import { reportError } from "@/shared/lib/error-reporting";
import { ThemeProvider, themeInitScript } from "@/shared/providers/theme";
import { LocaleProvider, localeInitScript, useDict } from "@/shared/i18n/LocaleProvider";
import { AnnouncementBar, Header } from "@/features/app-shell/components/Header";
import { Footer, ScrollToTopButton } from "@/features/app-shell/components/Footer";
import { FloatingWhatsApp } from "@/features/app-shell/components/WhatsAppButton";
import { NotFoundPage } from "@/features/app-shell/components/NotFoundPage";
import { Toaster } from "@/shared/ui/sonner";
import { buttonVariants } from "@/shared/ui/button";
import { siteConfig } from "@/shared/config/site";

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const d = useDict();
  const router = useRouter();
  useEffect(() => {
    reportError(error, {
      boundary: "tanstack_root_error_component",
      mechanism: "react_error_boundary",
    });
  }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold">{d.errors.boundary.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{d.errors.boundary.text}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
          >
            {d.errors.boundary.retry}
          </button>
          <Link to="/" className="rounded-full border px-5 py-2 text-sm font-bold">
            {d.errors.boundary.home}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteConfig.nameAr },
      { name: "description", content: siteConfig.descriptionAr },
      { property: "og:title", content: siteConfig.nameAr },
      { property: "og:description", content: siteConfig.descriptionAr },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#123B5D" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [{ children: themeInitScript }, { children: localeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // SSR default is Arabic/RTL; the locale init script aligns it with the stored locale.
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const d = useDict();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <MotionConfig reducedMotion="user">
            <div className="flex min-h-svh flex-col">
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
              >
                {d.common.skipToContent}
              </a>
              <AnnouncementBar />
              <Header />
              <motion.main
                id="main"
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="flex-1"
              >
                <Outlet />
              </motion.main>
              <Footer />
              <ScrollToTopButton />
              <FloatingWhatsApp />
              <Toaster position="top-center" richColors />
            </div>
          </MotionConfig>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
