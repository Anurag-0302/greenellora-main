"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Mail, Menu, Phone, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavMenu } from "@/components/nav-menu";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="top-bar">
        <div className="page-shell top-bar-inner">
          <a href={`mailto:${siteConfig.email}`}>
            <Mail className="h-3.5 w-3.5 text-[#ca8a04]" />
            <span className="hidden xs:inline">{siteConfig.email}</span>
          </a>
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>
            <Phone className="h-3.5 w-3.5 text-[#ca8a04]" />
            <span>{siteConfig.phone}</span>
          </a>
        </div>
      </div>

      <header className="main-header">
        <div className="page-shell main-header-inner">
          <Link href="/" className="brand-mark">
            <span className="brand-logo">GE</span>
            <span className="font-serif tracking-wide text-lg text-heading font-semibold sm:inline">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavMenu />

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/#contact" className="button-enquire hidden md:inline-flex">
              Enquire Now
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-body hover:bg-surface-muted hover:text-primary md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 bottom-0 top-[calc(var(--nav-height)+2rem)] z-40 bg-background/95 backdrop-filter blur-xl md:hidden animate-[fadeInUp_0.3s_ease]">
            <nav className="flex h-full flex-col overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="flex items-center justify-between border-b border-border pb-4 text-lg font-medium text-heading"
                >
                  Home
                  <ChevronRight className="h-4 w-4 text-subtle" />
                </Link>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-subtle">Our Categories</p>
                  <Link
                    href="/services/ayurvedic-products"
                    className="flex items-center justify-between border-b border-border/50 pb-3 pl-2 text-base font-medium text-body hover:text-primary"
                  >
                    Ayurvedic Products
                    <ChevronRight className="h-4 w-4 text-subtle" />
                  </Link>
                  <Link
                    href="/services/handicraft-products"
                    className="flex items-center justify-between border-b border-border/50 pb-3 pl-2 text-base font-medium text-body hover:text-primary"
                  >
                    Handicraft Products
                    <ChevronRight className="h-4 w-4 text-subtle" />
                  </Link>
                  <Link
                    href="/services/export-services"
                    className="flex items-center justify-between border-b border-border/50 pb-3 pl-2 text-base font-medium text-body hover:text-primary"
                  >
                    Export Services
                    <ChevronRight className="h-4 w-4 text-subtle" />
                  </Link>
                </div>

                <Link
                  href="/videos"
                  className="flex items-center justify-between border-b border-border pb-4 text-lg font-medium text-heading"
                >
                  Watch Our Story
                  <ChevronRight className="h-4 w-4 text-subtle" />
                </Link>

                <Link
                  href="/#why-us"
                  className="flex items-center justify-between border-b border-border pb-4 text-lg font-medium text-heading"
                >
                  Why Us
                  <ChevronRight className="h-4 w-4 text-subtle" />
                </Link>

                <Link
                  href="/#markets"
                  className="flex items-center justify-between border-b border-border pb-4 text-lg font-medium text-heading"
                >
                  Markets
                  <ChevronRight className="h-4 w-4 text-subtle" />
                </Link>

                <Link
                  href="/#contact"
                  className="flex items-center justify-between border-b border-border pb-4 text-lg font-medium text-heading"
                >
                  Contact
                  <ChevronRight className="h-4 w-4 text-subtle" />
                </Link>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/#contact"
                  className="button-primary w-full text-center"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
