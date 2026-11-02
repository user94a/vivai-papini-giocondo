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
    <footer className="site-footer" id="footer">
      <div className="footer-top">
        <div className="footer-notes">
          <p>{COMPANY_NAME}</p>
          <p>{COMPANY_PARTNERS}</p>
          <p>{CONTACT_ADDRESS}</p>
          <p>P.IVA {COMPANY_VAT}</p>
        </div>
        <a href="#top" className="footer-top-link">
          Torna su
        </a>
      </div>

      <a className="footer-contact-line" href={`mailto:${CONTACT_EMAIL}`}>
        {CONTACT_EMAIL}
      </a>

      <p className="footer-phone">
        {CONTACT_PHONES.map(phone => <a key={phone} href={`tel:+39${phone.replace(/\s/g, "")}`}>{phone}</a>)}
      </p>

      <div className="footer-meta">
        <p>
          <a href="#produzioni">Produzioni</a>
          {" · "}
          <a href="#storia">Storia</a>
          {" · "}
          <a href="#approccio">Approccio</a>
        </p>
        <p>Italia · 1920–oggi</p>
      </div>
    </footer>
  );
}
