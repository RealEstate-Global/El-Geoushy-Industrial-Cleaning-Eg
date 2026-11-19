"use client";

import { MapPin, Navigation, Star } from "lucide-react";
import { useDemo } from "./DemoProvider";
import { translate } from "@/features/i18n";

export function MapSection({ compact = false }: { compact?: boolean }) {
  const { data, locale } = useDemo();
  const c = translate(locale);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${data.settings.latitude},${data.settings.longitude}`)}`;
  return (
    <section className={compact ? "location location-compact" : "location"}>
      <div className="location-copy">
        <span className="eyebrow">
          <MapPin size={15} />
          {c.findUs}
        </span>
        <h2>
          {locale === "ar" ? "الجيوشي للمنظفات الصناعية" : "El-Gioushy Industrial Detergents"}
        </h2>
        <p>{data.settings.address[locale] || c.address}</p>
        <div className="location-actions">
          <a
            className="button button-primary"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={17} />
            {c.directions}
          </a>
          <a
            className="button button-outline"
            href={data.settings.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star size={17} />
            {c.review}
          </a>
        </div>
        <p className="review-note">{c.reviewNote}</p>
      </div>
      {!compact && (
        <div className="map-frame">
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
          />
          <a href={data.settings.googleMapsListingUrl} target="_blank" rel="noopener noreferrer">
            {c.directions}
          </a>
        </div>
      )}
    </section>
  );
}
