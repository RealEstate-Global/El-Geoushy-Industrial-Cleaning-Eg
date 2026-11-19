import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 · NEW CETRiS</span>
      <h1>الصفحة غير موجودة</h1>
      <p>قد يكون الرابط قد تغير أو لم يعد متاحًا.</p>
      <Link className="button button-primary" href="/">
        العودة للرئيسية
      </Link>
    </main>
  );
}
