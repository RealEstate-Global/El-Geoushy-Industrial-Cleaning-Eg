"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="not-found">
      <span className="eyebrow">NEW CETRiS</span>
      <h1>حدث خطأ غير متوقع</h1>
      <p>يرجى إعادة المحاولة.</p>
      <button className="button button-primary" onClick={reset}>
        إعادة المحاولة
      </button>
    </main>
  );
}
