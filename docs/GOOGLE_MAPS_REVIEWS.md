# Google Maps and reviews

The configured location is the parent business **الجيوشي للمنظفات الصناعية**, Zefta, Gharbia, Egypt. Coordinates supplied by the owner are `30.6227343, 31.2289189`; the map embed currently uses those coordinates and does not assert a verified listing pin.

The public Contact page includes a responsive map, directions link, and a separate Google Maps review action. The home page includes a compact location/review teaser. The review CTA opens the Maps search destination; visitors can select Reviews and write/submit a review themselves. No rating, review count, or Place ID is fabricated.

`GOOGLE_MAPS_LISTING_URL` and `GOOGLE_REVIEW_URL` are centralized in the demo settings seed and editable in `/admin`. Current URLs are Google Maps searches using the supplied business/location. Replace them with the exact verified listing URL when confirmed. TODO: use Google's direct `search.google.com/local/writereview?placeid=...` format only after a real Place ID has been verified.
