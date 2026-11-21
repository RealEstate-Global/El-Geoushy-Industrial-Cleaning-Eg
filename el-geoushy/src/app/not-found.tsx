import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <section className="not-found__content" aria-labelledby="not-found-title">
        <span className="not-found__eyebrow">NEW CETRiS <span aria-hidden="true">/</span> 404</span>
        <div className="not-found__code" aria-hidden="true">404</div>
        <div className="not-found__copy">
          <h1 id="not-found-title">الصفحة غير موجودة</h1>
          <p>عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد يكون الرابط قد تغير أو لم يعد متاحًا.</p>
          <Link className="not-found__action" href="/">
            <span>العودة للرئيسية</span>
            <span className="not-found__action-icon" aria-hidden="true">←</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
