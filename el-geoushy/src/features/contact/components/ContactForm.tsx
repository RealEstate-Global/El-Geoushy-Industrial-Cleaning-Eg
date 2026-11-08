import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { buttonVariants } from "@/shared/ui/button";
import { Send } from "lucide-react";
import { useDict } from "@/shared/i18n/LocaleProvider";
import {
  contactSchema,
  type ContactErrorCode,
  type ContactFormValues,
} from "@/features/contact/lib/schema";

const inputCls =
  "h-12 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  error,
  optionalLabel,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}{" "}
        {optionalLabel && (
          <span className="font-normal text-muted-foreground">{optionalLabel}</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const d = useDict();
  const f = d.contact.form;
  const errorCode = (code: unknown): string | undefined =>
    typeof code === "string" && code in f.errors ? f.errors[code as ContactErrorCode] : undefined;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", subject: "", message: "" },
  });
  const onSubmit = async (_v: ContactFormValues) => {
    // TODO: connect to the backend contact endpoint in `backend/`. No data is sent yet.
    await new Promise((r) => setTimeout(r, 600));
    toast.success(f.toast.successTitle, { description: f.toast.successText });
    reset();
  };
  const a = (k: keyof ContactFormValues) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, () => toast.error(f.toast.invalid))}
      className="grid gap-5 rounded-3xl border bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8"
    >
      <Field id="name" label={f.name} error={errorCode(errors.name?.message)}>
        <input id="name" className={inputCls} {...register("name")} {...a("name")} />
      </Field>
      <Field id="phone" label={f.phone} error={errorCode(errors.phone?.message)}>
        <input
          id="phone"
          dir="ltr"
          inputMode="tel"
          className={`${inputCls} text-right`}
          placeholder={f.phonePlaceholder}
          {...register("phone")}
          {...a("phone")}
        />
      </Field>
      <Field
        id="email"
        label={f.email}
        optionalLabel={f.optional}
        error={errorCode(errors.email?.message)}
      >
        <input
          id="email"
          type="email"
          dir="ltr"
          className={`${inputCls} text-right`}
          {...register("email")}
          {...a("email")}
        />
      </Field>
      <Field id="subject" label={f.subject} error={errorCode(errors.subject?.message)}>
        <input id="subject" className={inputCls} {...register("subject")} {...a("subject")} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="message" label={f.message} error={errorCode(errors.message?.message)}>
          <textarea
            id="message"
            rows={5}
            className={`${inputCls} h-auto py-3`}
            {...register("message")}
            {...a("message")}
          />
        </Field>
      </div>
      <button
        disabled={isSubmitting}
        className={`sm:col-span-2 sm:justify-self-start ${buttonVariants({ variant: "brand", size: "pillLg" })}`}
      >
        <Send className="h-4 w-4" /> {isSubmitting ? f.sending : f.submit}
      </button>
    </form>
  );
}
