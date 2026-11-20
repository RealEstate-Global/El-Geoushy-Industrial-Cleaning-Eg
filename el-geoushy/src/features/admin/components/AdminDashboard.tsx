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

/* ── Shared Tailwind class constants (DRY form styling) ────────── */
const INPUT_CX =
  "w-full border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--ink)] bg-[var(--surface)] transition-colors duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--border-accent)] focus:outline-none";
const TEXTAREA_CX = `${INPUT_CX} min-h-[84px] resize-y`;
const LABEL_CX = "text-[11px] font-bold text-[var(--ink-secondary)]";

/* ── Tab definitions ───────────────────────────────────────────── */
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

/* ── Reusable form primitives ──────────────────────────────────── */

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
    <label className="flex flex-col gap-1.5 min-w-0">
      <span className={LABEL_CX}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        className={INPUT_CX}
      />
      {hint && (
        <small className="text-[10px] text-[var(--ink-hint)]">{hint}</small>
      )}
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
    <div className="border border-[var(--border)] rounded-2xl p-4 mt-2">
      <strong className="text-xs text-[var(--ink)]">{label}</strong>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        {(["ar", "en"] as const).map((lang) => (
          <label className="flex flex-col gap-1.5 min-w-0" key={lang}>
            <span className={LABEL_CX}>{lang.toUpperCase()}</span>
            {multiline ? (
              <textarea
                value={value[lang]}
                onChange={(e) =>
                  onChange({ ...value, [lang]: e.target.value })
                }
                className={TEXTAREA_CX}
              />
            ) : (
              <input
                value={value[lang]}
                onChange={(e) =>
                  onChange({ ...value, [lang]: e.target.value })
                }
                className={INPUT_CX}
              />
            )}
          </label>
        ))}
      </div>
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
    <div className="border border-[var(--border)] rounded-2xl p-4 mt-2">
      <strong className="text-xs text-[var(--ink)]">{label}</strong>
      {items.map((item, i) => (
        <div className="flex items-center gap-2 mt-2" key={i}>
          <input
            aria-label={`${label} Arabic ${i + 1}`}
            value={item.ar}
            onChange={(e) =>
              onChange(
                items.map((v, n) =>
                  n === i ? { ...v, ar: e.target.value } : v,
                ),
              )
            }
            className={INPUT_CX}
          />
          <input
            aria-label={`${label} English ${i + 1}`}
            value={item.en}
            onChange={(e) =>
              onChange(
                items.map((v, n) =>
                  n === i ? { ...v, en: e.target.value } : v,
                ),
              )
            }
            className={INPUT_CX}
          />
          <button
            className="shrink-0 p-2 rounded-lg border-0 bg-transparent cursor-pointer text-[var(--danger)] transition-colors hover:bg-[var(--danger-border)]"
            aria-label={`Remove ${label}`}
            onClick={() => onChange(items.filter((_, n) => n !== i))}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="button button-outline mt-3 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs"
        onClick={() => onChange([...items, { ar: "", en: "" }])}
      >
        <Plus size={15} /> Add item
      </button>
    </div>
  );
}

/* ── Main dashboard component ──────────────────────────────────── */

export function AdminDashboard() {
  const { data, setData, reset } = useDemo();
  const [tab, setTab] = useState<Tab>("overview");
  const [notice, setNotice] = useState("");

  const update = (fn: (d: DemoData) => DemoData) =>
    setData(fn(structuredClone(data)));

  const notify = (s: string) => {
    setNotice(s);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const setting = (
    key: keyof DemoData["settings"],
    value: string | boolean | Localized,
  ) =>
    update((d) => {
      (d.settings as unknown as Record<string, string | boolean | Localized>)[
        key
      ] = value;
      return d;
    });

  const product = (key: keyof DemoData["product"], value: unknown) =>
    update((d) => {
      (d.product as unknown as Record<string, unknown>)[key] = value;
      return d;
    });

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify("Saved in this browser's demo storage.");
  };

  /* ── Section heading helper ─────────────────────────────────── */
  const heading = (title: string, description: string) => (
    <div className="mb-4">
      <h1 className="text-lg font-bold text-[var(--ink)]">{title}</h1>
      <p className="text-sm text-[var(--ink-secondary)] mt-1">{description}</p>
    </div>
  );

  /* ── Save button helper ─────────────────────────────────────── */
  const saveButton = (
    <button
      type="submit"
      className="button button-primary mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:shadow-[var(--shadow-primary)]"
    >
      <Save size={16} /> Save changes
    </button>
  );

  /* ── Tab bodies ─────────────────────────────────────────────── */
  let body: React.ReactNode;

  if (tab === "overview")
    body = (
      <>
        {/* Title row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[var(--ink-hint)] font-semibold">
              SAMPLE DATA · NOT ANALYTICS
            </p>
            <h1 className="text-lg font-bold mt-1">Welcome to your demo</h1>
            <p className="text-sm text-[var(--ink-secondary)]">
              Explore and edit the NEW CETRiS frontend preview.
            </p>
          </div>
          <Link
            className="button button-primary inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium"
            href="/"
            target="_blank"
          >
            <Eye size={16} /> Open website
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 my-6">
          <article className="border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-1.5 bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-sm)]">
            <span className="text-[11px] text-[var(--ink-hint)]">Demo product</span>
            <b className="text-lg text-[var(--ink)]">{data.product.name}</b>
            <small className="text-[10px] text-[var(--ink-tertiary)]">Local preview content</small>
          </article>
          <article className="border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-1.5 bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-sm)]">
            <span className="text-[11px] text-[var(--ink-hint)]">Visible variants</span>
            <b className="text-lg text-[var(--ink)]">
              {data.variants.filter((v) => v.visible).length}
            </b>
            <small className="text-[10px] text-[var(--ink-tertiary)]">Colors are provisional</small>
          </article>
          <article className="border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-1.5 bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-sm)]">
            <span className="text-[11px] text-[var(--ink-hint)]">Current offer</span>
            <b className="text-lg text-[var(--ink)]">
              {data.offer.quantity} for EGP {data.offer.price}
            </b>
            <small className="text-[10px] text-[var(--ink-tertiary)]">Editable demo offer</small>
          </article>
          <article className="border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-1.5 bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-sm)]">
            <span className="text-[11px] text-[var(--ink-hint)]">Storage</span>
            <b className="text-lg text-[var(--ink)]">This browser</b>
            <small className="text-[10px] text-[var(--ink-tertiary)]">Not shared or secure</small>
          </article>
        </div>

        {/* Demo callout */}
        <div className="bg-[var(--surface-muted)] border-l-[3px] border-l-[var(--primary)] p-4 my-5 rounded-r-lg">
          <b className="text-sm">Demo Mode</b>
          <p className="text-xs text-[var(--ink-secondary)] mt-1">
            Edits are stored locally in this browser only. This is not a secure
            admin system and does not publish changes for other visitors.
          </p>
        </div>

        <button
          className="button button-outline inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm"
          onClick={() => setTab("product")}
        >
          Edit product details <ArrowLeft size={16} />
        </button>
      </>
    );
  else if (tab === "product")
    body = (
      <form className="flex flex-col gap-4" onSubmit={save}>
        {heading(
          "Product editor",
          "Product facts and bilingual public descriptions.",
        )}
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

        <div className="flex flex-col gap-3.5 my-5">
          {data.variants
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((v, i) => (
              <article
                className="grid grid-cols-[24px_1fr_auto_36px] items-start gap-3.5 border border-[var(--border)] rounded-2xl p-4 bg-[var(--surface)] transition-shadow duration-200 hover:shadow-[var(--shadow-xs)]"
                key={v.id}
              >
                <span
                  className="w-6 h-6 rounded-full border border-white/20 mt-2 shrink-0 shadow-[var(--shadow-xs)]"
                  style={{ background: v.color }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <label className="flex items-center gap-2 text-xs cursor-pointer select-none whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={v.visible}
                    onChange={(e) =>
                      update((d) => {
                        d.variants[i]!.visible = e.target.checked;
                        return d;
                      })
                    }
                    className="accent-[var(--primary)]"
                  />{" "}
                  Visible
                </label>
                <button
                  className="shrink-0 p-2 rounded-lg border-0 bg-transparent cursor-pointer text-[var(--danger)] transition-colors hover:bg-[var(--danger-border)]"
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

        <div className="flex flex-wrap gap-3">
          <button
            className="button button-outline inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs"
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
            className="button button-primary inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium"
            onClick={() =>
              notify("Variants saved in this browser's demo storage.")
            }
          >
            <Save size={16} /> Save variants
          </button>
        </div>

        <p className="text-[11px] text-[var(--ink-hint)] mt-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {data.variants
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((v, i) => (
              <article
                className="border border-[var(--border)] rounded-2xl p-4 grid grid-cols-[140px_1fr] gap-4 bg-[var(--surface)]"
                key={v.id}
              >
                <div className="min-h-[150px] bg-[var(--surface-soft)] border border-dashed border-[var(--border-muted)] rounded-lg flex items-center justify-center flex-col gap-2 p-2 overflow-hidden">
                  {v.imagePath ? (
                    <NextImage
                      src={v.imagePath}
                      alt={v.altText.en || v.name}
                      width={200}
                      height={200}
                      unoptimized
                      className="w-full h-[140px] object-contain"
                    />
                  ) : (
                    <>
                      <ImageIcon className="text-[var(--ink-hint)]" />
                      <span className="text-[10px] text-[var(--ink-hint)]">
                        Photo needed
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-3">
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
          className="button button-primary inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium"
          onClick={() =>
            notify("Media references saved in this browser's demo storage.")
          }
        >
          <Save size={16} /> Save media
        </button>
      </>
    );
  else if (tab === "offers")
    body = (
      <form className="flex flex-col gap-4" onSubmit={save}>
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
        <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.offer.active}
            onChange={(e) =>
              update((d) => {
                d.offer.active = e.target.checked;
                return d;
              })
            }
            className="accent-[var(--primary)]"
          />{" "}
          Offer active
        </label>
        {saveButton}
      </form>
    );
  else if (tab === "content")
    body = (
      <form className="flex flex-col gap-4" onSubmit={save}>
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

        <div className="flex flex-col gap-4 my-5">
          {data.faqs.map((f, i) => (
            <article
              className="border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-3 bg-[var(--surface)]"
              key={i}
            >
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
                className="button button-outline inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs border-[var(--danger-border)] text-[var(--danger)] self-start"
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

        <div className="flex flex-wrap gap-3">
          <button
            className="button button-outline inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs"
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
            className="button button-primary inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium"
            onClick={() =>
              notify("FAQs saved in this browser's demo storage.")
            }
          >
            <Save size={16} /> Save FAQs
          </button>
        </div>
      </>
    );
  else if (tab === "settings")
    body = (
      <form className="flex flex-col gap-4" onSubmit={save}>
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
        <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.settings.whatsappNumberNeedsVerification}
            onChange={(e) =>
              setting("whatsappNumberNeedsVerification", e.target.checked)
            }
            className="accent-[var(--primary)]"
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
        <Field
          label="X"
          type="url"
          value={data.settings.x}
          onChange={(v) => setting("x", v)}
        />
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
      <form className="flex flex-col gap-4" onSubmit={save}>
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
      <form className="flex flex-col gap-4" onSubmit={save}>
        {heading(
          "SEO settings",
          "Metadata for the public NEW CETRiS product site.",
        )}
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
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {heading(
            "Preview mode",
            "Public demo site preview using the current browser data.",
          )}
          <Link
            className="button button-outline inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs"
            href="/"
            target="_blank"
          >
            Open in new tab <Eye size={16} />
          </Link>
        </div>
        <div className="border border-[var(--border)] rounded-2xl overflow-hidden mt-4">
          <StorePage kind="home" />
        </div>
      </>
    );

  /* ── Shell layout ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] ltr bg-[var(--surface-soft)] text-[var(--ink)] font-[family-name:var(--font-latin)]">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="sticky top-0 h-screen max-md:static max-md:h-auto bg-[var(--primary-dark)] text-white py-6 px-4 flex flex-col">
        <Link
          className="flex items-center gap-2.5 text-[11px] tracking-wider"
          href="/"
        >
          <span className="wordmark-mark inline-flex items-center justify-center rounded-lg text-sm font-bold">
            C
          </span>
          <span>
            NEW <b className="text-[var(--accent)]">CETRiS</b>
            <small className="block text-[9px] tracking-widest opacity-60">
              DEMO CONSOLE
            </small>
          </span>
        </Link>

        <div className="text-[9px] tracking-widest text-[var(--warning-fg)] bg-[var(--warning-bg)] py-1.5 px-2.5 rounded-lg mt-6 mb-4 inline-block self-start">
          ● DEMO MODE
        </div>

        <nav className="flex flex-col gap-1 mt-2 max-md:flex-row max-md:overflow-x-auto max-md:gap-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`flex items-center gap-3 border-0 rounded-lg text-left py-2.5 px-3 text-xs cursor-pointer transition-all duration-200 w-full max-md:shrink-0 max-md:w-auto ${
                tab === t.id
                  ? "bg-white/10 text-white shadow-[inset_3px_0_var(--accent)]"
                  : "bg-transparent text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setTab(t.id)}
            >
              {t.icon}
              {t.title}
            </button>
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center gap-2 mt-auto p-3 text-white/50 text-xs hover:text-white transition-colors max-md:hidden"
        >
          <ArrowLeft size={16} /> View website
        </Link>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="px-4 md:px-8 pb-8 min-w-0">
        {/* Demo banner */}
        <div className="mt-5 mb-6 bg-[var(--warning-bg)] border border-[var(--warning-border)] rounded-lg text-[var(--warning-fg)] py-3 px-4 flex gap-3 text-[11px]">
          <b>Demo Mode</b>
          <span>
            Changes are stored locally in this browser only. This is not secure
            and does not publish changes for other visitors.
          </span>
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--border)]">
          <span className="text-[11px] text-[var(--ink-hint)] uppercase tracking-wider">
            NEW CETRiS / {tabs.find((t) => t.id === tab)?.title}
          </span>
          <button
            className="button button-outline inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs text-[var(--danger)]"
            onClick={() => {
              if (
                window.confirm(
                  "Reset all local demo data to the original seed?",
                )
              ) {
                reset();
                notify("Demo data reset to original values.");
              }
            }}
          >
            <RotateCcw size={15} /> Reset demo data
          </button>
        </div>

        {/* Panel */}
        <section
          className="max-w-[1040px] mx-auto mt-7 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 min-h-[350px] shadow-[var(--shadow-xs)]"
          key={tab}
        >
          {body}
        </section>

        {/* Toast notification */}
        {notice && (
          <div
            role="status"
            className="fixed z-50 bottom-6 right-6 bg-[var(--accent-dark)] text-white px-5 py-3 rounded-2xl text-[13px] shadow-[var(--shadow-md)] animate-[toast-in_0.3s_var(--ease-spring)_both]"
          >
            {notice}
          </div>
        )}

        {/* Footnote */}
        <div className="text-center text-[11px] text-[var(--ink-hint)] mt-6 pb-4">
          Sample demo content · Not connected to a backend · No real analytics
        </div>
      </main>
    </div>
  );
}
