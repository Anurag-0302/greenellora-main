import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { getFlatNavLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const navLinks = getFlatNavLinks();

  return (
    <footer className="site-footer">
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="brand-logo">{siteConfig.name.slice(0, 2).toUpperCase()}</span>
              <p className="text-xl font-serif tracking-wide text-white">{siteConfig.name}</p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-8 text-white/70">
              Premium organic spices, wellness superfoods, artisan handicrafts, and Ayurvedic formulations — exported globally from India with certified traceability.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/90">Quick Links</p>
            <ul className="mt-6 space-y-3">
              {navLinks.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-[#fef08a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/90">Contact & Support</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#ca8a04]" />
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-white/60 hover:text-[#fef08a] transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#ca8a04]" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="text-sm text-white/60 hover:text-[#fef08a] transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ca8a04]" />
                <span className="text-sm text-white/60">{siteConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/10">
        <div className="page-shell flex flex-col gap-4 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} Pvt. Ltd. All rights reserved.
          </p>
          <p className="tracking-wide">ORGANIC PRODUCTS MANUFACTURER & EXPORTER</p>
        </div>
      </div>
    </footer>
  );
}
