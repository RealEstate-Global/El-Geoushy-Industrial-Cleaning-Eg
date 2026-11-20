import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/features/site/components/DemoProvider";
import { StoreShell } from "@/features/site/components/StoreShell";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NEW CETRiS | منظف متعدد الاستخدامات",
  description: "تعرّف على NEW CETRiS من الجيوشي للمنظفات الصناعية.",
  applicationName: "NEW CETRiS",
  metadataBase: new URL("https://new-cetris.example"),
  openGraph: {
    title: "NEW CETRiS",
    description: "منظف متعدد الاستخدامات من الجيوشي للمنظفات الصناعية.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${cairo.variable} ${jakarta.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("new-cetris-theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){document.documentElement.dataset.theme="light"}',
          }}
        />
      </head>
      <body>
        <DemoProvider>
          <StoreShell>{children}</StoreShell>
        </DemoProvider>
      </body>
    </html>
  );
}
