import Link from "next/link";
import { LogoLockup } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { IconArrowUpRight, IconLinkedIn, IconMail, IconPin, IconPhone } from "@/components/icons";
import { addressLine, company, footerNav, legalNav } from "@/lib/site";

/**
 * Brand glyphs for the social row, keyed by `company.social` label. Entries
 * without one render as label + link-out arrow, which is the default; only
 * networks with a mark we actually ship get a leading glyph.
 */
const socialGlyphs: Record<string, typeof IconLinkedIn | undefined> = {
  LinkedIn: IconLinkedIn,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-white">
      {/* Circuit substrate — the same device as the dark marketing sections,
          faded so it reads as texture at the base of the page. */}
      <div aria-hidden className="circuit-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundImage: "linear-gradient(90deg, transparent, #38BDF8 35%, #1E4FD6 65%, transparent)" }}
      />

      <Container width="wide" className="relative">
        <div className="grid gap-12 pt-16 pb-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20 lg:pt-20 lg:pb-14">
          <div>
            {/* Full supplied lockup — the footer has the vertical room the
                header does not. */}
            <LogoLockup width={200} tone="light" />
            <p className="mt-7 max-w-xs text-[0.9375rem] leading-relaxed text-white/55">
              {company.tagline} We build and run the cloud, AI, and security systems that mid-market
              teams depend on.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="label-mono text-cyan-bright">{group.heading}</h2>
                <ul className="mt-5 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex text-[0.9375rem] text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-cyan-bright transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Contact takes the column Legal used to hold. It is the only
                column of real detail rather than links, so it keeps the icon
                treatment it had in the left block. */}
            <div>
              <h2 className="label-mono text-cyan-bright">Contact</h2>
              <ul className="mt-5 grid gap-3 text-[0.875rem] text-white/60">
                <li className="flex items-start gap-2.5">
                  <IconPin width={16} height={16} className="mt-0.5 shrink-0 text-cyan-bright" />
                  <address className="not-italic">{addressLine}</address>
                </li>
                <li className="flex items-center gap-2.5">
                  <IconPhone width={16} height={16} className="shrink-0 text-cyan-bright" />
                  <a
                    href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {company.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <IconMail width={16} height={16} className="shrink-0 text-cyan-bright" />
                  <a
                    href={`mailto:${company.email}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {company.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal sits above the divider rule, not in the bottom bar with the
            copyright. */}
        <nav aria-label="Legal" className="pb-8">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:justify-end">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.8125rem] text-white/55 transition-colors duration-200 hover:text-cyan-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-wide text-white/40">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-5">
            {company.social.map((s) => {
              const Glyph = socialGlyphs[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[0.8125rem] text-white/55 transition-colors duration-200 hover:text-cyan-bright"
                  >
                    {Glyph ? <Glyph width={15} height={15} className="mr-0.5" /> : null}
                    {s.label}
                    <IconArrowUpRight
                      width={13}
                      height={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
