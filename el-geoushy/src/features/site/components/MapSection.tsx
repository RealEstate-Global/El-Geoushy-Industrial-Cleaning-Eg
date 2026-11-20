"use client";

import { MapPin, Navigation, Star } from "lucide-react";
import { useDemo } from "./DemoProvider";
import { translate } from "@/features/i18n";

export function MapSection({ compact = false }: { compact?: boolean }) {
  const { data, locale } = useDemo();
  const c = translate(locale);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${data.settings.latitude},${data.settings.longitude}`)}`;

  return (
    <section
      className={`location rounded-2xl border transition-all duration-300 ${
        compact
          ? "location-compact p-6 sm:p-8 lg:p-10 bg-surface-soft border-border"
          : "p-6 sm:p-8 lg:p-12 bg-surface border-border shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      }`}
    >
      <div className={`location-copy ${compact ? "space-y-4" : "lg:col-span-5 space-y-4"}`}>
        <span className="eyebrow inline-flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase">
          <MapPin size={16} />
          {c.findUs}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          {locale === "ar" ? "الجيوشي للمنظفات الصناعية" : "El-Gioushy Industrial Detergents"}
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          {data.settings.address[locale] || c.address}
        </p>

        <div className="location-actions flex items-center gap-3 flex-wrap pt-2">
          <a
            className="button button-primary inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={17} />
            {c.directions}
          </a>
          <a
            className="button button-outline inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
            href={data.settings.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star size={17} className="text-amber-400" />
            {c.review}
          </a>
        </div>
        <p className="review-note text-xs text-muted/80 pt-1">{c.reviewNote}</p>
      </div>

      {!compact && (
        <div className="map-frame lg:col-span-7 h-[340px] sm:h-[400px] relative rounded-2xl overflow-hidden border border-border shadow-inner bg-surface-soft">
          <iframe
            title={
              locale === "ar"
                ? "موقع الجيوشي للمنظفات الصناعية على الخريطة"
                : "El-Gioushy Industrial Detergents map location"
            }
            src={data.settings.googleMapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          />
          <a
            href={data.settings.googleMapsListingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-primary border border-border shadow-md hover:bg-surface hover:scale-105 transition-all duration-200"
          >
            {c.directions}
          </a>
        </div>
      )}
    </section>
  );
}
