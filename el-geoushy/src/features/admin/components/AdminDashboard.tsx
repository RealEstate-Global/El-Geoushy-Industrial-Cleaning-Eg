"use client";
import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  Package,
  Palette,
  Tag,
  FileText,
  Settings,
  MapPin,
  Search,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { useDemo } from "@/features/site/components/DemoProvider";
import { StorePage } from "@/features/site/components/StorePage";
import type { DemoData, Localized } from "@/types/site";
type Tab =
  | "overview"
  | "product"
  | "variants"
  | "media"
  | "offers"
  | "content"
  | "faq"
  | "settings"
  | "maps"
  | "seo"
  | "preview";
const tabs: { id: Tab; title: string; icon: React.ReactNode }[] = [
  { id: "overview", title: "Overview", icon: <LayoutDashboard /> },
  { id: "product", title: "Product", icon: <Package /> },
  { id: "variants", title: "Variants", icon: <Palette /> },
  { id: "media", title: "Media", icon: <ImageIcon /> },
  { id: "offers", title: "Offers", icon: <Tag /> },
  { id: "content", title: "Content", icon: <FileText /> },
  { id: "faq", title: "FAQs", icon: <FileText /> },
  { id: "settings", title: "Contact & social", icon: <Settings /> },
  { id: "maps", title: "Maps & reviews", icon: <MapPin /> },
  { id: "seo", title: "SEO", icon: <Search /> },
  { id: "preview", title: "Preview", icon: <Eye /> },
];
function Field({
  label,
  value,
  onChange,
  type = "text",
  hint,
  required = false,
  min,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}
function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: Localized;
  onChange: (v: Localized) => void;
  multiline?: boolean;
}) {
  return (
    <div className="admin-localized">
      <strong>{label}</strong>
      <div className="localized-inputs">
        {(["ar", "en"] as const).map((lang) => (
          <label className="admin-field" key={lang}>
            <span>{lang.toUpperCase()}</span>
            {multiline ? (
              <textarea
                value={value[lang]}
                onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
              />
            ) : (
              <input
                value={value[lang]}
                onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
export function AdminDashboard() {
  const { data, setData, reset } = useDemo();
  const [tab, setTab] = useState<Tab>("overview");
  const [notice, setNotice] = useState("");
  const update = (fn: (d: DemoData) => DemoData) => setData(fn(structuredClone(data)));
  const notify = (s: string) => {
    setNotice(s);
    window.setTimeout(() => setNotice(""), 2500);
  };
  const setting = (key: keyof DemoData["settings"], value: string | boolean | Localized) =>
    update((d) => {
      (d.settings as unknown as Record<string, string | boolean | Localized>)[key] = value;
      return d;
    });
  const product = (key: keyof DemoData["product"], value: unknown) =>
    update((d) => {
      (d.product as unknown as Record<string, unknown>)[key] = value;
      return d;
    });
  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify("Saved in this browser’s demo storage.");
  };
  const heading = (title: string, description: string) => (
    <div className="admin-section-heading">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
  const saveButton = (
    <button type="submit" className="button button-primary save-inline">
      <Save size={16} /> Save changes
    </button>
  );
  let body: React.ReactNode;
  if (tab === "overview")
    body = (
      <>
        <div className="admin-title-row">
          <div>
            <p className="eyebrow">SAMPLE DATA · NOT ANALYTICS</p>
            <h1>Welcome to your demo</h1>
            <p>Explore and edit the NEW CETRiS frontend preview.</p>
          </div>
          <Link className="button button-primary" href="/" target="_blank">
            <Eye size={16} /> Open website
          </Link>
        </div>
        <div className="admin-stats">
          <article>
            <span>Demo product</span>
            <b>{data.product.name}</b>
            <small>Local preview content</small>
          </article>
          <article>
            <span>Visible variants</span>
            <b>{data.variants.filter((v) => v.visible).length}</b>
            <small>Colors are provisional</small>
          </article>
          <article>
            <span>Current offer</span>
            <b>
              {data.offer.quantity} for EGP {data.offer.price}
            </b>
            <small>Editable demo offer</small>
          </article>
          <article>
            <span>Storage</span>
            <b>This browser</b>
            <small>Not shared or secure</small>
          </article>
        </div>
        <div className="admin-callout">
          <b>Demo Mode</b>
          <p>
            Edits are stored locally in this browser only. This is not a secure admin system and
            does not publish changes for other visitors.
          </p>
        </div>
        <button className="button button-outline" onClick={() => setTab("product")}>
          Edit product details <ArrowLeft size={16} />
        </button>
      </>
    );
  else if (tab === "product")
    body = (
      <form className="admin-form" onSubmit={save}>
        {heading("Product editor", "Product facts and bilingual public descriptions.")}
        <Field
          label="Brand name"
          value={data.product.name}
          onChange={(v) => product("name", v)}
          required
        />
        <Field
          label="Arabic name"
          value={data.product.arabicName}
          onChange={(v) => product("arabicName", v)}
          required
        />
        <LocalizedField
          label="Description"
          value={data.product.description}
          onChange={(v) => product("description", v)}
          multiline
        />
        <Field
          label="Capacity"
          value={data.product.capacity}
          onChange={(v) => product("capacity", v)}
          required
        />
        <LocalizedField
          label="Package type"
          value={data.product.packageType}
          onChange={(v) => product("packageType", v)}
        />
        <LocalizedArray
          label="Uses / applications"
          items={data.product.uses}
          onChange={(v) => product("uses", v)}
        />
        {saveButton}
      </form>
    );
  else if (tab === "variants")
    body = (
      <>
        {heading(
          "Variant manager",
          "Colors are provisional and do not represent confirmed formula differences.",
        )}
        <div className="admin-variant-list">
          {data.variants
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((v, i) => (
              <article className="admin-variant" key={v.id}>
                <span className="color-dot" style={{ background: v.color }} />
                <div className="variant-fields">
                  <Field
                    label="Variant name"
                    value={v.name}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.name = x;
                        return d;
                      })
                    }
                  />
                  <LocalizedField
                    label="Provisional color label"
                    value={v.colorLabel}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.colorLabel = x;
                        return d;
                      })
                    }
                  />
                  <Field
                    label="Color"
                    value={v.color}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.color = x;
                        return d;
                      })
                    }
                  />
                  <Field
                    label="Image path"
                    value={v.imagePath}
                    hint="Local reference only; upload is not implemented."
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.imagePath = x;
                        return d;
                      })
                    }
                  />
                  <Field
                    label="Display order"
                    type="number"
                    value={v.order}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.order = Number(x);
                        return d;
                      })
                    }
                  />
                </div>
                <label className="admin-toggle">
                  <input
                    type="checkbox"
                    checked={v.visible}
                    onChange={(e) =>
                      update((d) => {
                        d.variants[i]!.visible = e.target.checked;
                        return d;
                      })
                    }
                  />{" "}
                  Visible
                </label>
                <button
                  className="icon-button danger-icon"
                  aria-label="Delete variant"
                  onClick={() => {
                    update((d) => {
                      d.variants = d.variants.filter((x) => x.id !== v.id);
                      return d;
                    });
                    notify("Variant removed from the local demo.");
                  }}
                >
                  <Trash2 />
                </button>
              </article>
            ))}
        </div>
        <button
          className="button button-outline"
          onClick={() => {
            update((d) => {
              d.variants.push({
                id: `variant-${Date.now()}`,
                name: `Variant ${String(d.variants.length + 1).padStart(2, "0")}`,
                color: "#e9e5f0",
                colorLabel: { ar: "لون مبدئي", en: "Provisional color" },
                imagePath: "",
                altText: { ar: "", en: "" },
                visible: true,
                order: d.variants.length + 1,
              });
              return d;
            });
            notify("Variant added to the local demo.");
          }}
        >
          <Plus size={16} /> Add variant
        </button>
        <button
          className="button button-primary save-inline"
          onClick={() => notify("Variants saved in this browser’s demo storage.")}
        >
          <Save size={16} /> Save variants
        </button>
        <p className="admin-hint">
          Images are local references. Upload persistence is not implemented.
        </p>
      </>
    );
  else if (tab === "media")
    body = (
      <>
        {heading(
          "Media manager",
          "Local product image references only. Upload storage is not implemented.",
        )}
        <div className="media-grid">
          {data.variants
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((v, i) => (
              <article className="media-card" key={v.id}>
                <div className="media-preview">
                  {v.imagePath ? (
                    <NextImage
                      src={v.imagePath}
                      alt={v.altText.en || v.name}
                      width={200}
                      height={200}
                      unoptimized
                    />
                  ) : (
                    <>
                      <ImageIcon />
                      <span>Photo needed</span>
                    </>
                  )}
                </div>
                <div className="media-fields">
                  <Field
                    label="Local image path"
                    value={v.imagePath}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.imagePath = x;
                        return d;
                      })
                    }
                    hint="Path under public/, e.g. /assets/product/front.webp"
                  />
                  <LocalizedField
                    label="Image alt text"
                    value={v.altText}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.altText = x;
                        return d;
                      })
                    }
                  />
                  <Field
                    label="Display order"
                    type="number"
                    value={v.order}
                    onChange={(x) =>
                      update((d) => {
                        d.variants[i]!.order = Number(x);
                        return d;
                      })
                    }
                  />
                </div>
              </article>
            ))}
        </div>
        <button
          className="button button-primary save-inline"
          onClick={() => notify("Media references saved in this browser’s demo storage.")}
        >
          <Save size={16} /> Save media
        </button>
      </>
    );
  else if (tab === "offers")
    body = (
      <form className="admin-form" onSubmit={save}>
        {heading(
          "Offer manager",
          "Demo offer values only. No shipping or promotion terms have been specified.",
        )}
        <Field
          label="Quantity"
          type="number"
          value={data.offer.quantity}
          min={1}
          required
          onChange={(v) =>
            update((d) => {
              d.offer.quantity = Number(v);
              return d;
            })
          }
        />
        <Field
          label="Price"
          type="number"
          value={data.offer.price}
          min={0}
          required
          onChange={(v) =>
            update((d) => {
              d.offer.price = Number(v);
              return d;
            })
          }
        />
        <Field
          label="Currency"
          value={data.offer.currency}
          onChange={(v) =>
            update((d) => {
              d.offer.currency = v;
              return d;
            })
          }
        />
        <Field
          label="Start date (optional)"
          type="date"
          value={data.offer.startDate}
          onChange={(v) =>
            update((d) => {
              d.offer.startDate = v;
              return d;
            })
          }
        />
        <Field
          label="End date (optional)"
          type="date"
          value={data.offer.endDate}
          onChange={(v) =>
            update((d) => {
              d.offer.endDate = v;
              return d;
            })
          }
        />
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={data.offer.active}
            onChange={(e) =>
              update((d) => {
                d.offer.active = e.target.checked;
                return d;
              })
            }
          />{" "}
          Offer active
        </label>
        {saveButton}
      </form>
    );
  else if (tab === "content")
    body = (
      <form className="admin-form" onSubmit={save}>
        {heading("Content editor", "Edit home page copy in Arabic and English.")}
        <LocalizedField
          label="Hero title"
          value={data.content.heroTitle}
          onChange={(v) =>
            update((d) => {
              d.content.heroTitle = v;
              return d;
            })
          }
        />
        <LocalizedField
          label="Hero subtitle"
          value={data.content.heroSubtitle}
          onChange={(v) =>
            update((d) => {
              d.content.heroSubtitle = v;
              return d;
            })
          }
          multiline
        />
        <LocalizedArray
          label="Benefits"
          items={data.content.benefits}
          onChange={(v) =>
            update((d) => {
              d.content.benefits = v;
              return d;
            })
          }
        />
        <LocalizedArray
          label="How-to steps"
          items={data.content.howTo}
          onChange={(v) =>
            update((d) => {
              d.content.howTo = v;
              return d;
            })
          }
        />
        <LocalizedField
          label="CTA copy"
          value={data.content.cta}
          onChange={(v) =>
            update((d) => {
              d.content.cta = v;
              return d;
            })
          }
        />
        {saveButton}
      </form>
    );
  else if (tab === "faq")
    body = (
      <>
        {heading("FAQ editor", "Maintain product FAQs in both languages.")}
        <div className="faq-edit-list">
          {data.faqs.map((f, i) => (
            <article className="faq-edit" key={i}>
              <LocalizedField
                label="Question"
                value={f.question}
                onChange={(v) =>
                  update((d) => {
                    d.faqs[i]!.question = v;
                    return d;
                  })
                }
              />
              <LocalizedField
                label="Answer"
                value={f.answer}
                onChange={(v) =>
                  update((d) => {
                    d.faqs[i]!.answer = v;
                    return d;
                  })
                }
                multiline
              />
              <button
                className="button button-outline danger-button"
                onClick={() => {
                  update((d) => {
                    d.faqs = d.faqs.filter((_, n) => n !== i);
                    return d;
                  });
                  notify("FAQ removed from the local demo.");
                }}
              >
                <Trash2 size={15} /> Remove
              </button>
            </article>
          ))}
        </div>
        <button
          className="button button-outline"
          onClick={() => {
            update((d) => {
              d.faqs.push({
                question: { ar: "سؤال جديد", en: "New question" },
                answer: { ar: "أضف الإجابة", en: "Add an answer" },
              });
              return d;
            });
            notify("FAQ added to the local demo.");
          }}
        >
          <Plus size={16} /> Add FAQ
        </button>
        <button
          className="button button-primary save-inline"
          onClick={() => notify("FAQs saved in this browser’s demo storage.")}
        >
          <Save size={16} /> Save FAQs
        </button>
      </>
    );
  else if (tab === "settings")
    body = (
      <form className="admin-form" onSubmit={save}>
        {heading(
          "Contact & social settings",
          "Only supplied links are included. Instagram stays hidden while blank.",
        )}
        <Field
          label="WhatsApp raw number"
          value={data.settings.whatsappNumber}
          onChange={(v) => setting("whatsappNumber", v)}
          hint="Preserved exactly as provided."
        />
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={data.settings.whatsappNumberNeedsVerification}
            onChange={(e) => setting("whatsappNumberNeedsVerification", e.target.checked)}
          />{" "}
          WHATSAPP_NUMBER_NEEDS_VERIFICATION
        </label>
        <Field
          label="Primary NEW CETRiS Facebook"
          type="url"
          value={data.settings.facebook}
          onChange={(v) => setting("facebook", v)}
          required
        />
        <Field
          label="TikTok"
          type="url"
          value={data.settings.tiktok}
          onChange={(v) => setting("tiktok", v)}
        />
        <Field
          label="Pinterest"
          type="url"
          value={data.settings.pinterest}
          onChange={(v) => setting("pinterest", v)}
        />
        <Field label="X" type="url" value={data.settings.x} onChange={(v) => setting("x", v)} />
        <Field
          label="Instagram (optional)"
          type="url"
          value={data.settings.instagram}
          onChange={(v) => setting("instagram", v)}
        />
        <Field
          label="Business website"
          type="url"
          value={data.settings.website}
          onChange={(v) => setting("website", v)}
        />
        {saveButton}
      </form>
    );
  else if (tab === "maps")
    body = (
      <form className="admin-form" onSubmit={save}>
        {heading(
          "Google Maps & reviews",
          "No Place ID is configured; the review CTA uses the provided business search destination.",
        )}
        <Field
          label="Maps listing URL"
          type="url"
          value={data.settings.googleMapsListingUrl}
          onChange={(v) => setting("googleMapsListingUrl", v)}
          required
        />
        <Field
          label="Google review URL"
          type="url"
          value={data.settings.googleReviewUrl}
          onChange={(v) => setting("googleReviewUrl", v)}
          required
          hint="TODO: replace with direct write-review link after verifying the Place ID."
        />
        <Field
          label="Embed URL"
          type="url"
          value={data.settings.googleMapsEmbedUrl}
          onChange={(v) => setting("googleMapsEmbedUrl", v)}
          required
        />
        <LocalizedField
          label="Business address"
          value={data.settings.address}
          onChange={(v) => setting("address", v)}
        />
        <Field
          label="Latitude"
          value={data.settings.latitude}
          onChange={(v) => setting("latitude", v)}
        />
        <Field
          label="Longitude"
          value={data.settings.longitude}
          onChange={(v) => setting("longitude", v)}
        />
        {saveButton}
      </form>
    );
  else if (tab === "seo")
    body = (
      <form className="admin-form" onSubmit={save}>
        {heading("SEO settings", "Metadata for the public NEW CETRiS product site.")}
        <LocalizedField
          label="Page title"
          value={data.settings.pageTitle}
          onChange={(v) => setting("pageTitle", v)}
        />
        <LocalizedField
          label="Description"
          value={data.settings.pageDescription}
          onChange={(v) => setting("pageDescription", v)}
          multiline
        />
        <Field
          label="Social preview image path"
          value={data.settings.socialImagePath}
          onChange={(v) => setting("socialImagePath", v)}
        />
        {saveButton}
      </form>
    );
  else
    body = (
      <>
        <div className="admin-title-row">
          {heading("Preview mode", "Public demo site preview using the current browser data.")}
          <Link className="button button-outline" href="/" target="_blank">
            Open in new tab <Eye size={16} />
          </Link>
        </div>
        <div className="admin-preview">
          <StorePage kind="home" />
        </div>
      </>
    );
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">
          <span className="wordmark-mark">C</span>
          <span>
            NEW <b>CETRiS</b>
            <small>DEMO CONSOLE</small>
          </span>
        </Link>
        <div className="demo-badge">● DEMO MODE</div>
        <nav>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "admin-nav active" : "admin-nav"}
              onClick={() => setTab(t.id)}
            >
              {t.icon}
              {t.title}
            </button>
          ))}
        </nav>
        <Link href="/" className="back-to-site">
          <ArrowLeft size={16} /> View website
        </Link>
      </aside>
      <main className="admin-main">
        <div className="admin-banner">
          <b>Demo Mode</b>
          <span>
            Changes are stored locally in this browser only. This is not secure and does not publish
            changes for other visitors.
          </span>
        </div>
        <div className="admin-topbar">
          <span className="admin-breadcrumb">
            NEW CETRiS / {tabs.find((t) => t.id === tab)?.title}
          </span>
          <button
            className="button button-reset"
            onClick={() => {
              if (window.confirm("Reset all local demo data to the original seed?")) {
                reset();
                notify("Demo data reset to original values.");
              }
            }}
          >
            <RotateCcw size={15} /> Reset demo data
          </button>
        </div>
        <section className="admin-panel" key={tab}>
          {body}
        </section>
        {notice && (
          <div role="status" className="toast">
            {notice}
          </div>
        )}
        <div className="admin-footnote">
          Sample demo content · Not connected to a backend · No real analytics
        </div>
      </main>
    </div>
  );
}
function LocalizedArray({
  label,
  items,
  onChange,
}: {
  label: string;
  items: Localized[];
  onChange: (v: Localized[]) => void;
}) {
  return (
    <div className="admin-array">
      <strong>{label}</strong>
      {items.map((item, i) => (
        <div className="array-item" key={i}>
          <input
            aria-label={`${label} Arabic ${i + 1}`}
            value={item.ar}
            onChange={(e) =>
              onChange(items.map((v, n) => (n === i ? { ...v, ar: e.target.value } : v)))
            }
          />
          <input
            aria-label={`${label} English ${i + 1}`}
            value={item.en}
            onChange={(e) =>
              onChange(items.map((v, n) => (n === i ? { ...v, en: e.target.value } : v)))
            }
          />
          <button
            className="icon-button danger-icon"
            aria-label={`Remove ${label}`}
            onClick={() => onChange(items.filter((_, n) => n !== i))}
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="button button-outline"
        onClick={() => onChange([...items, { ar: "", en: "" }])}
      >
        <Plus size={15} /> Add item
      </button>
    </div>
  );
}
