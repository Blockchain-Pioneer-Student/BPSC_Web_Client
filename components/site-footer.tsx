"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  MessageCircle,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { usePreviewVisible } from "@/components/preview-bridge";
import { useSiteContent } from "@/hooks/useSiteContent";

export function SiteFooter() {
  const branding = useSiteContent("branding");
  const footer = useSiteContent("footer");
  const socials = useSiteContent("socials");
  const contact = useSiteContent("contact_info");
  const showFooter = usePreviewVisible("footer");
  const showBranding = usePreviewVisible("branding");
  const showSocials = usePreviewVisible("socials");
  const showContact = usePreviewVisible("contact_info");
  const read = (
    section: Record<string, unknown>,
    key: string,
    fallback: string,
  ) =>
    typeof section[key] === "string" && section[key]
      ? String(section[key])
      : fallback;
  const logoUrl = read(branding, "footer_logo_url", "/logo2.png");
  const logoAlt = read(branding, "logo_alt", "Blockchain Pioneer Student Logo");
  const description = read(
    footer,
    "description",
    "A pioneering student club advancing Blockchain in Vietnam.",
  );
  const email = read(contact, "email", "blockchainutc@gmail.com");
  const phone = read(contact, "phone", "+84325045633");
  const address = read(
    contact,
    "address",
    "Blockchain Labs, University of Transport and Communications, 03 Cau Giay, Lang Ward, Hanoi, Vietnam",
  );
  const quickLinksTitle = read(footer, "quick_links_title", "Quick links");
  const joinTitle = read(footer, "join_title", "Join");
  const contactTitle = read(footer, "contact_title", "Contact");
  const quickAboutLabel = read(footer, "quick_about_label", "About");
  const quickAboutUrl = read(footer, "quick_about_url", "/about");
  const quickEventsLabel = read(footer, "quick_events_label", "Events");
  const quickEventsUrl = read(footer, "quick_events_url", "/events");
  const quickNewsLabel = read(footer, "quick_news_label", "News (Coming Soon)");
  const quickNewsUrl = read(footer, "quick_news_url", "#");
  const quickMediaLabel = read(footer, "quick_media_label", "Media (Coming Soon)");
  const quickMediaUrl = read(footer, "quick_media_url", "#");
  const quickPartnersLabel = read(footer, "quick_partners_label", "Partners (Coming Soon)");
  const quickPartnersUrl = read(footer, "quick_partners_url", "#");
  const quickTeamLabel = read(footer, "quick_team_label", "Team");
  const quickTeamUrl = read(footer, "quick_team_url", "/team");
  const memberLabel = read(footer, "member_label", "Member");
  const memberUrl = read(footer, "member_url", "/join");
  const faqLabel = read(footer, "faq_label", "FAQ (Coming Soon)");
  const faqUrl = read(footer, "faq_url", "#");
  const contactLinkLabel = read(footer, "contact_link_label", "Contact");
  const contactLinkUrl = read(footer, "contact_link_url", "/contact");
  const copyright = read(
    footer,
    "copyright_text",
    "Blockchain Pioneer Student. All rights reserved.",
  );
  if (!showFooter) return null;

  return (
    <footer className="bg-[#004987] text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            {showBranding && <div className="flex items-center gap-2 w-full bg-[#004987] pt-4 pb-0">
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={180}
                height={0}
                style={{ height: "auto" }}
              />
            </div>}
            <p className="text-white/80 text-sm">
              {description}
            </p>
            {showSocials && <div className="flex gap-4">
              <Link
                href={read(socials, "facebook", "https://www.facebook.com/bpsclub.utc")}
                target="_blank"
                className="hover:text-white/80"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={read(socials, "linkedin", "https://www.linkedin.com/company/106421064/")}
                target="_blank"
                className="hover:text-white/80"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href={read(socials, "telegram", "#")} target="_blank" className="hover:text-white/80">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </Link>

              <Link
                href={read(socials, "x", "https://x.com/bps_club")}
                target="_blank"
                className="hover:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 1227"
                  className="h-4 w-4 mt-0.5 fill-current"
                >
                  <path d="M1101 0H891L600 428 309 0H0l480 678L0 1227h309l291-428 291 428h309L720 678z" />
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </Link>

              <Link
                href={read(socials, "youtube", "https://www.youtube.com/@BlockchainPioneerStudent")}
                target="_blank"
                className="hover:text-white/80"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{quickLinksTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={quickAboutUrl} className="text-white/80 hover:text-white">
                  {quickAboutLabel}
                </Link>
              </li>
              <li>
                <Link href={quickEventsUrl} className="text-white/80 hover:text-white">
                  {quickEventsLabel}
                </Link>
              </li>
              <li>
                <Link href={quickNewsUrl} className="text-white/80 hover:text-white">
                  {quickNewsLabel}
                </Link>
              </li>
              <li>
                <Link href={quickMediaUrl} className="text-white/80 hover:text-white">
                  {quickMediaLabel}
                </Link>
              </li>
              <li>
                <Link href={quickPartnersUrl} className="text-white/80 hover:text-white">
                  {quickPartnersLabel}
                </Link>
              </li>
              <li>
                <Link href={quickTeamUrl} className="text-white/80 hover:text-white">
                  {quickTeamLabel}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{joinTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={memberUrl} className="text-white/80 hover:text-white">
                  {memberLabel}
                </Link>
              </li>
              <li>
                <Link href={faqUrl} className="text-white/80 hover:text-white">
                  {faqLabel}
                </Link>
              </li>
              <li>
                <Link
                  href={contactLinkUrl}
                  className="text-white/80 hover:text-white"
                >
                  {contactLinkLabel}
                </Link>
              </li>
            </ul>
          </div>

          {showContact && <div>
            <h3 className="font-semibold text-lg mb-4">{contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-white/80">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <Link
                  href={`mailto:${email}`}
                  className="text-white/80 hover:text-white"
                >
                  {email}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <Link
                  href={`tel:${phone}`}
                  className="text-white/80 hover:text-white"
                >
                  {phone}
                </Link>
              </li>
            </ul>
          </div>}
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>
            © {new Date().getFullYear()} {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
