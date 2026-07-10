"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Earth,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CertificationsStrip } from "@/components/certifications-strip";
import { QuoteForm } from "@/components/quote-form";
import { ProductSlider } from "@/components/product-slider";
import { VideoSlider } from "@/components/video-slider";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { serviceOfferings } from "@/lib/services";
import { normalizeVideos, type VideoItem } from "@/lib/video-utils";
import {
  highlights,
  markets,
  metrics,
  siteConfig,
  trustPillars,
  whyChooseUs,
} from "@/lib/site";
import chana from "@/assets/chana.jpeg";
import haladi from "@/assets/haladi.jpeg";
import honey from "@/assets/honey.jpeg";
import jaggury from "@/assets/jaggury.jpeg";
import tea from "@/assets/tea.jpeg";

const bannerSlides = [
  {
    src: honey,
    alt: "Organic honey",
    title: "Organic Products Manufacturer & Exporter",
    tagline: "A brand you can trust!",
    copy: "Choose from an array of 100% organic seeds, grains, spices, herbs, and export-ready agro products.",
  },
  {
    src: haladi,
    alt: "Haladi turmeric",
    title: "Premium Spices from Indian Farms",
    tagline: "Export-grade quality",
    copy: "Certified organic turmeric, chilli, coriander, and spices processed to international food safety standards.",
  },
  {
    src: tea,
    alt: "Organic tea leaves",
    title: "Global Organic Trade Partner",
    tagline: "Serving buyers worldwide",
    copy: "Reliable supply, full documentation, and dedicated export support for importers across 20+ countries.",
  },
  {
    src: jaggury,
    alt: "Organic jaggery",
    title: "Best-in-Class Processing",
    tagline: "Quality you can verify",
    copy: "Every shipment is lab-tested, traceable, and backed by FSSAI, APEDA, and phytosanitary compliance.",
  },
];

const icons = [ShieldCheck, BadgeCheck, Boxes, Truck];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [handicraftProducts, setHandicraftProducts] = useState<any[]>([]);
  const [ayurvedicProducts, setAyurvedicProducts] = useState<any[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);



  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  useEffect(() => {
    const autoAdvance = setInterval(handleNext, 7000);
    return () => clearInterval(autoAdvance);
  }, [activeSlide]);



  useEffect(() => {
    async function fetchData() {
      try {
        const [handicraftRes, ayurvedicRes, videosRes] = await Promise.all([
          fetch("/api/handicraft-products"),
          fetch("/api/ayurvedic-products"),
          fetch("/api/videos"),
        ]);

        const handicraftData = await handicraftRes.json();
        const ayurvedicData = await ayurvedicRes.json();
        const videosData = await videosRes.json();

        if (handicraftData.success) setHandicraftProducts(handicraftData.data);
        if (ayurvedicData.success) setAyurvedicProducts(ayurvedicData.data);
        if (videosData.success) setVideos(normalizeVideos(videosData.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart === 0 || touchEnd === 0) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) {
      setActiveSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="hero-slider relative overflow-hidden">
          <div
            ref={bannerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="h-full w-full relative"
          >
            {bannerSlides.map((slide, index) => (
              <div
                key={slide.alt}
                className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
                  activeSlide === index ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="hero-slide-overlay" />
              </div>
            ))}

            <div className="page-shell hero-content flex flex-col justify-center h-full relative z-10 px-6">
              <span className="hero-eyebrow text-xs uppercase tracking-widest text-[#ca8a04]">
                {bannerSlides[activeSlide].tagline}
              </span>
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight mt-4 max-w-4xl animate-[fadeInUp_0.8s_ease]">
                {bannerSlides[activeSlide].title}
              </h1>
              <p className="hero-copy text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mt-6 max-w-2xl animate-[fadeInUp_1s_ease]">
                {bannerSlides[activeSlide].copy}
              </p>
              <div className="hero-actions flex flex-wrap gap-4 mt-8 animate-[fadeInUp_1.2s_ease]">
                <a href="#contact" className="button-primary text-sm font-semibold">
                  Enquire Now
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#products" className="button-hero-outline text-sm font-semibold">
                  View Products
                </a>
              </div>
            </div>

            <div className="hero-dots absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {bannerSlides.map((slide, index) => (
                <button
                  key={slide.alt}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 border-none cursor-pointer ${
                    activeSlide === index ? "bg-[#ca8a04] w-8" : "bg-white/40 w-2.5"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <CertificationsStrip />

        {/* About Section */}
        <section id="home" className="section-space">
          <div className="page-shell">
            <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="About Green Ellora"
                  title="Premium Organic & Agro Exports Directly from India"
                  description={`${siteConfig.name} is a global export platform that sources certified organic spices, wellness superfoods, pulses, herbal products, traditional handicrafts, and Ayurvedic ingredients — delivering Indian authenticity to distributors in 20+ countries.`}
                />
                
                <div className="grid gap-4 sm:grid-cols-2 mt-8">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-surface-muted/30 px-5 py-4 transition-all duration-300 hover:bg-surface-muted/65"
                    >
                      <Leaf className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <p className="text-sm font-semibold leading-relaxed text-body">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a href="#why-us" className="button-primary text-sm">
                    Discover why buyers choose us
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div key={metric.label} className="stat-box">
                    <p className="stat-value">{metric.value}</p>
                    <p className="stat-label uppercase tracking-widest text-[10px] text-muted mt-2">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Pillars */}
        <section className="bg-white border-t border-b border-border section-space">
          <div className="page-shell">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {trustPillars.map((pillar, index) => {
                const Icon = icons[index];
                return (
                  <article
                    key={pillar.title}
                    className="surface-card flex flex-col items-start p-8 bg-surface border border-border rounded-2xl"
                  >
                    <div className="feature-icon rounded-xl mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-serif font-medium text-heading mb-3">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dynamic Theme Product Sliders */}
        <div id="products" className="scroll-mt-24">
          {!loading && (
            <>
              {/* Handicraft Products Slider in earthy theme */}
              <div className="theme-handicraft">
                <ProductSlider
                  products={handicraftProducts}
                  title="Artisanal Handicraft Collections"
                  description="Handcrafted decor and lifestyle accessories made by Indian makers for global retail programs."
                  viewAllHref="/services/handicraft-products"
                />
              </div>

              {/* Ayurvedic Products Slider in wellness green theme */}
              <div className="theme-ayurvedic">
                <ProductSlider
                  products={ayurvedicProducts}
                  title="Organic Ayurvedic Powders & Herbs"
                  description="Certified traditional Ayurvedic ingredients, wellness formulations, and botanicals."
                  viewAllHref="/services/ayurvedic-products"
                />
              </div>
            </>
          )}
        </div>

        {/* Video Slider */}
        {!loading && videos.length > 0 && (
          <VideoSlider
            videos={videos}
            title="Sourcing Stories & Craft Processes"
            description="Take an inside look at our farming practices, artisan workshops, and standard export coordination."
            viewAllHref="/videos"
          />
        )}

        {/* Service Offerings */}
        <section className="section-dark section-space">
          <div className="page-shell">
            <SectionHeading
              center
              eyebrow="What We Offer"
              title="Full-Spectrum Export, Craft, and Ayurvedic Sourcing"
              description="Beyond our core organic catalogs, Green Ellora serves global importers with customizable handicrafts, Ayurvedic botanicals, and turn-key export documentation support."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {serviceOfferings.map((offering) => (
                <article
                  key={offering.id}
                  className="surface-card flex h-full flex-col justify-between p-8 bg-surface border border-border rounded-2xl group"
                >
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-heading mb-4">{offering.title}</h3>
                    <p className="text-sm leading-relaxed text-muted mb-6">{offering.description}</p>
                  </div>
                  <Link
                    href={offering.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:text-primary-strong mt-auto"
                  >
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Details & Why Us Split */}
        <section className="section-space bg-surface-muted/30">
          <div className="page-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div className="surface-card p-8 md:p-12 bg-surface rounded-3xl border border-border flex flex-col justify-between">
                <div>
                  <SectionHeading
                    eyebrow="Our Story"
                    title="Rooted in Tradition. Trusted by Global Buyers."
                    description="Green Ellora was established to build an export infrastructure that presents India's rich organic heritage under absolute quality transparency and trade security."
                  />
                  <div className="mt-8 space-y-4">
                    {[
                      "Direct farm partnerships supporting ethical trade traceability",
                      "State-of-the-art grading and temperature-controlled storage",
                      "Full export compliance: APEDA, FSSAI & phytosanitary standards",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3.5 rounded-xl border border-primary/10 bg-surface-muted/40 px-5 py-4"
                      >
                        <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm font-semibold text-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="why-us" className="scroll-mt-24">
                <SectionHeading
                  eyebrow="Why Choose Green Ellora"
                  title="An Export Partner that Delivers on Every Specification"
                  description="From pre-shipment laboratory inspections at origin to delivery at destination docks — we bridge expectations for distributors and brands worldwide."
                />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {whyChooseUs.map((item) => (
                    <div
                      key={item.title}
                      className="surface-card p-6 bg-surface border border-border rounded-xl"
                    >
                      <h4 className="text-lg font-serif font-medium text-heading mb-2">{item.title}</h4>
                      <p className="text-xs leading-relaxed text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Markets */}
        <section id="markets" className="section-dark section-space scroll-mt-24">
          <div className="page-shell">
            <SectionHeading
              center
              eyebrow="Worldwide Reach"
              title="Serving Organic Importers & Distributors Across 6 Continents"
              description="We arrange ocean freight and air freight shipments compliant with the specific organic, pesticide, and labeling regulations of each destination continent."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {markets.map((market) => (
                <div
                  key={market}
                  className="surface-card p-6 bg-surface border border-border rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Earth className="h-5 w-5" />
                      </div>
                      <p className="font-serif text-lg text-heading font-medium">{market}</p>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-muted">
                      Full destination custom clearance documents, competitive price terms, and shipping lines coordination.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="section-space scroll-mt-24">
          <div className="page-shell">
            <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow="Get a Quote"
                  title="Share Your Requirements. We Will Coordinate the Logistics."
                  description="Enquire about pricing, custom blends, or requesting farm samples. Our trade experts will response with full export quotes within one business day."
                />

                <div className="grid gap-4 mt-8">
                  {[
                    { icon: "📦", heading: "Pre-Shipment Samples", body: "Request laboratory trial samples before final shipment sign-off." },
                    { icon: "🏷️", heading: "Private Label / Packaging", body: "Coordinate barcode stickers, custom retail pouches, and pack sizes." },
                    { icon: "📄", heading: "Compliance Support", body: "COA, MSDS, phytosanitary clearance, and organic trace documents." },
                    { icon: "⏱️", heading: "Dedicated Trade Desk", body: "Direct email and WhatsApp trade coordination for orders." },
                  ].map((item) => (
                    <div
                      key={item.heading}
                      className="surface-card flex items-start gap-4 p-5 bg-surface border border-border rounded-xl"
                    >
                      <span className="text-2xl mt-0.5">{item.icon}</span>
                      <div>
                        <p className="font-serif text-base text-heading font-semibold">{item.heading}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card p-6 md:p-10 bg-surface border border-border rounded-3xl shadow-xl">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA Banner */}
        <section className="section-band pb-16 pt-0 border-none bg-transparent">
          <div className="page-shell">
            <div className="cta-band">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center relative z-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#fef9c3]">Ready to Sourced?</p>
                  <h2 className="mt-3 text-3xl font-serif font-light text-white md:text-5xl leading-tight">
                    Let&apos;s Build a Reliable Organic Sourcing Partnership
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80">
                    Whether you require contract pricing for spices, a dedicated craft compilation, or launch samples — our export coordinators are ready to outline your workflow.
                  </p>
                </div>
                <a href="#contact" className="button-primary shrink-0 text-sm bg-white text-primary-dark hover:bg-[#fef9c3] hover:text-primary-dark shadow-xl">
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Office & Location Map */}
        <section id="location" className="section-space pt-0 scroll-mt-24">
          <div className="page-shell">
            <div className="surface-card overflow-hidden bg-surface border border-border rounded-3xl shadow-md">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <SectionHeading
                      eyebrow="Our Office"
                      title="Visit Green Ellora Pvt. Ltd."
                      description="Green Ellora Pvt. Ltd. near Ram Mandir, Chandol, taluka Dist. Buldhana — PIN 411057."
                    />
                  </div>
                  <div className="pt-8">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Green+Ellora+Pvt.+Ltd+near+Ram+Mandir+Chandol+Dist+Buldhana+411057"
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary text-sm inline-flex"
                    >
                      Open in Google Maps
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="min-h-[20rem] bg-surface-muted lg:min-h-[26rem] relative">
                  <iframe
                    title="Green Ellora location"
                    src="https://maps.google.com/maps?q=Green+Ellora+Pvt.+Ltd+near+Ram+Mandir+Chandol+Dist+Buldhana+411057&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
