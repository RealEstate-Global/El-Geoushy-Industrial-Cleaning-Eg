import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Compass, Home, RotateCw } from "lucide-react";
import { buttonVariants } from "@/shared/ui/button";
import { useDict } from "@/shared/i18n/LocaleProvider";

/** Animated 404 shown for unmatched URLs and missing products. */
export function NotFoundPage() {
  const d = useDict();
  const links = [
    { to: "/products", label: d.common.nav.products },
    { to: "/categories", label: d.common.nav.categories },
    { to: "/about", label: d.common.nav.about },
    { to: "/contact", label: d.common.nav.contact },
  ] as const;

  return (
    <section className="bg-gradient-hero relative min-h-full -mb-24 overflow-hidden">
      {/* Ambient blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fresh/25 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-brand/25 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
        {/* Big animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="relative inline-block"
        >
          <motion.span
            aria-hidden
            className="absolute -inset-8 rounded-full bg-fresh/20 blur-2xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="relative block text-[22vmin] font-black leading-none text-gradient-brand select-none"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-2xl font-extrabold sm:text-3xl"
        >
          {d.errors.notFound.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mt-3 max-w-md text-muted-foreground"
        >
          {d.errors.notFound.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link to="/" className={buttonVariants({ variant: "brand", size: "pill" })}>
            <Home className="h-4 w-4" /> {d.errors.notFound.action}
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={buttonVariants({ variant: "soft", size: "pill" })}
          >
            <RotateCw className="h-4 w-4" /> {d.errors.boundary.retry}
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
          }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          <li className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Compass className="h-4 w-4" /> {d.errors.notFound.suggest}:
          </li>
          {links.map((l) => (
            <motion.li
              key={l.to}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            >
              <Link
                to={l.to}
                className="inline-flex rounded-full border bg-card px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
