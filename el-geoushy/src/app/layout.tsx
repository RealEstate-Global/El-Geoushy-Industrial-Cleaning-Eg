import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/features/site/components/DemoProvider";
import { StoreShell } from "@/features/site/components/StoreShell";

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
    <html lang="ar" dir="rtl">
      <body>
        <DemoProvider>
          <StoreShell>{children}</StoreShell>
        </DemoProvider>
      </body>
    </html>
  );
}
