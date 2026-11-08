# API reference

Base URL in development: `http://localhost:5080`

All responses are JSON. Domain validation failures return `application/problem+json`
with status `400`.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Service banner and links |
| GET | `/health` | Health check |
| GET | `/openapi/v1.json` | OpenAPI document (development only) |
| GET | `/api/categories` | List categories ordered by `sortOrder` |
| GET | `/api/products` | Paged product list with filtering |
| GET | `/api/products/{slug}` | One active product |
| POST | `/api/products` | Create a product (protect before exposing) |
| POST | `/api/contact` | Store a contact-form message |
| POST | `/api/client-errors` | Receive a frontend runtime error report |

## GET /api/products

Query parameters:

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `category` | string | – | Category slug, e.g. `industrial` |
| `search` | string | – | Matches Arabic name or short description |
| `sort` | string | featured | `featured`, `name-asc`, `name-desc` |
| `page` | int | 1 | 1-based |
| `pageSize` | int | 20 | 1–100 |

Response:

```json
{
  "items": [
    {
      "id": 1,
      "slug": "demo-floor-cleaner",
      "nameAr": "منظف أرضيات (تجريبي)",
      "nameEn": null,
      "shortDescription": "منتج تجريبي لتنظيف الأرضيات.",
      "description": null,
      "imageUrl": "/assets/products/product-placeholder.webp",
      "gallery": [],
      "availableSizes": [],
      "usageInstructions": [],
      "specifications": [],
      "isFeatured": true,
      "isDemo": true,
      "categorySlug": "household",
      "categoryName": "منظفات منزلية"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "totalCount": 8,
  "totalPages": 1,
  "hasNextPage": false,
  "hasPreviousPage": false
}
```

## POST /api/contact

```json
{
  "name": "اسم العميل",
  "phone": "201000000000",
  "email": "optional@example.com",
  "message": "نص الرسالة"
}
```

`201 Created` with `{ "id": 1 }`. Missing name, phone, or message returns `400`.

## POST /api/client-errors

```json
{
  "message": "Something failed",
  "stack": "Error: ...",
  "route": "/products",
  "mechanism": "react_error_boundary",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

`202 Accepted`. The payload is written to the API log at warning level.

## Errors

Domain failures:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "Domain rule violated",
  "status": 400,
  "detail": "A product with slug 'demo-floor-cleaner' already exists.",
  "instance": "/api/products"
}
```

Unhandled failures use the standard ASP.NET Core ProblemDetails shape with
status `500`.
