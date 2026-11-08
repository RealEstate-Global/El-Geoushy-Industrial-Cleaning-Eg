import { motion } from "motion/react";
import { Eye, Handshake, HeartHandshake, Lightbulb, Target, ShieldCheck } from "lucide-react";
import { imageReveal, inView, stagger } from "@/shared/lib/motion";
import {
  CtaBanner,
  FeatureCard,
  PageHero,
  SectionHeading,
} from "@/shared/components/page-sections";
import { useDict } from "@/shared/i18n/LocaleProvider";

export function AboutPage() {
  const d = useDict();
  return (
    <>
      <PageHero
        title={d.about.heroTitle}
        subtitle={d.about.heroSubtitle}
        crumbs={[{ label: d.about.heroTitle }]}
      />
      <section className="container-page mt-16 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={d.about.story.eyebrow} title={d.about.story.title} />
          <div className="mt-6 space-y-4 leading-8 text-muted-foreground">
            <p>{d.about.story.p1}</p>
            <p className="rounded-xl border border-dashed p-4 text-sm">{d.about.story.ownerNote}</p>
          </div>
        </div>
        <motion.img
          variants={imageReveal}
          {...inView}
          src="/assets/about/company-image.webp"
          alt="Production line of detergent bottles"
          width={1408}
          height={1008}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
        />
      </section>
      <section className="container-page mt-20 grid gap-5 md:grid-cols-2">
        <motion.div variants={stagger} {...inView} className="contents">
          <FeatureCard
            icon={<Target className="h-6 w-6" />}
            title={d.about.mission.title}
            text={d.about.mission.text}
          />
          <FeatureCard
            icon={<Eye className="h-6 w-6" />}
            title={d.about.vision.title}
            text={d.about.vision.text}
          />
        </motion.div>
      </section>
      <section className="mt-20 bg-mint py-20">
        <div className="container-page">
          <SectionHeading center eyebrow={d.about.values.eyebrow} title={d.about.values.title} />
          <motion.div
            variants={stagger}
            {...inView}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {(d.about.values.items as readonly { title: string; text: string }[]).map((v, i) => (
              <FeatureCard
                key={v.title}
                icon={(valueIcons as Record<number, React.ReactNode>)[i]}
                title={v.title}
                text={v.text}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

const valueIcons = [
  <ShieldCheck className="h-6 w-6" />,
  <Handshake className="h-6 w-6" />,
  <HeartHandshake className="h-6 w-6" />,
  <Lightbulb className="h-6 w-6" />,
];
