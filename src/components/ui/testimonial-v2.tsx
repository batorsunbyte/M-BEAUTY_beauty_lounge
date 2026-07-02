import React from 'react';
import { motion } from "framer-motion";
import { SparkleBackground } from '@/components/ui/SparkleBackground';
import { useLanguage } from '../../i18n/LanguageContext';
import { testimonialAvatars, handleImageError } from '@/lib/images';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  fallback: string;
  name: string;
  role: string;
  alt: string;
}

// --- Image config: local first, Unsplash fallback ---
const av = testimonialAvatars
const avatarEntries = [av.avatar1, av.avatar2, av.avatar3, av.avatar4, av.avatar5, av.avatar6, av.avatar7, av.avatar8, av.avatar9];

// --- Sub-Components ---
function useLocalizedTestimonials(): Testimonial[] {
  const { t } = useLanguage();
  return t.testimonials.items.map((item, i) => {
    const entry = avatarEntries[i] || avatarEntries[0];
    return {
      ...item,
      image: entry.local,
      fallback: entry.fallback,
      alt: t.testimonials.avatarAlt.replace('{name}', item.name),
    };
  });
}

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, fallback, name, role, alt }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-10 rounded-[18px] border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white dark:bg-neutral-900 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal m-0 transition-colors duration-300">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={alt}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                        onError={handleImageError(fallback)}
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-neutral-500 dark:text-neutral-500 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const testimonials = useLocalizedTestimonials();
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <SparkleBackground particleColor="#A0788A" speed={1} particleDensity={50} />
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-14 text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            {t.testimonials.eyebrow}
          </span>
          <h2 id="testimonials-heading" className="font-heading font-medium leading-[1.06] tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--color-text-heading)' }}>
            {t.testimonials.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
            {t.testimonials.subtitle}
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label={t.testimonials.regionAria}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main Component — uses global theme from ThemeProvider ---
export default function TestimonialV2() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-primary selection:text-white">
      <TestimonialsSection />
    </div>
  );
}
