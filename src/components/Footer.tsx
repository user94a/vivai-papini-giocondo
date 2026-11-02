import Link from "next/link";
import { ArrowOut } from "@/components/ArrowOut";
import { Envelope, Phone } from "@phosphor-icons/react/ssr";
import { BrandLogo } from "@/components/BrandLogo";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  COMPANY_NAME,
  COMPANY_PARTNERS,
  COMPANY_VAT,
} from "@/lib/content";

export function Footer() {
  return (
    <>
      <footer className="site-footer sober-footer" id="footer">
        <div className="footer-identity">
          <BrandLogo size="lg" negative className="footer-logo" />
          <div className="footer-notes">
            <p>{COMPANY_NAME}</p>
            <p>{COMPANY_PARTNERS}</p>
            <p>{CONTACT_ADDRESS}</p>
            <p>P.IVA {COMPANY_VAT}</p>
          </div>
        </div>
        <div className="footer-actions">
          <nav className="footer-navigation" aria-label="Esplora il sito">
            <Link href="/catalogo">Catalogo <ArrowOut /></Link>
            <Link href="/contatti">Contatti <ArrowOut /></Link>
            <Link href="/about">About <ArrowOut /></Link>
          </nav>
          <div className="footer-direct-contacts">
          <a className="footer-email-link" href={`mailto:${CONTACT_EMAIL}`}>
            <Envelope size={26} weight="duotone" aria-hidden="true" />
            <span>{CONTACT_EMAIL}</span>
          </a>
          <div className="footer-phone-links">
            {CONTACT_PHONES.map(phone => (
              <a key={phone} href={`tel:+39${phone.replace(/\s/g, "")}`}>
                <Phone size={24} weight="duotone" aria-hidden="true" />
                <span>+39 {phone}</span>
              </a>
            ))}
          </div>
          </div>
          <p className="footer-membership">Soci ANVE<span>Associazione Nazionale Vivaisti Esportatori</span></p>
        </div>
      </footer>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Vivai Papini Giocondo. Tutti i diritti riservati.</p>
        <div className="footer-policy-links" aria-label="Informazioni legali">
          <span>Privacy policy</span>
          <span>Cookie policy</span>
        </div>
      </div>
    </>
  );
}
