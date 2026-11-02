import { Envelope, Phone, MapPin, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Contatti } from "@/components/sections/Contatti";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONES } from "@/lib/content";
import "./contatti.css";

export const metadata = { title: "Contatti | Vivai Papini Giocondo" };

const mapQuery = "43.876347,10.690695";
const mapUrl = "https://maps.app.goo.gl/4RZ1zLJwknnCZW7KA";

export default function ContattiPage() {
  return (
    <main className="contacts-page">
      <div className="dedicated-intro contacts-intro">
        <h1>Contatti</h1>
      </div>

      <section className="contact-channels" aria-label="Contatti diretti">
        <article className="contact-card contact-card-email">
          <Envelope size={48} weight="duotone" aria-hidden="true" />
          <h2>Scrivici</h2>
          <p>Per informazioni, disponibilità e richieste di fornitura.</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<ArrowUpRight size={22} aria-hidden="true" /></a>
        </article>
        <article className="contact-card">
          <Phone size={48} weight="duotone" aria-hidden="true" />
          <h2>Parliamone a voce</h2>
          <p>Chiamaci per confrontarci sulle tue esigenze.</p>
          <div className="contact-phone-links">{CONTACT_PHONES.map(phone => <a key={phone} href={`tel:+39${phone.replace(/\s/g, "")}`}>+39 {phone}<ArrowUpRight size={22} aria-hidden="true" /></a>)}</div>
        </article>
      </section>

      <section className="nursery-location" aria-labelledby="location-title">
        <div className="location-copy">
          <MapPin size={52} weight="duotone" aria-hidden="true" />
          <h2 id="location-title">Vieni in vivaio.</h2>
          <p>Ci trovi a Castellare di Pescia, nel cuore del vivaismo toscano.</p>
          <address>{CONTACT_ADDRESS}</address>
          <a className="round-link" href={mapUrl} target="_blank" rel="noopener noreferrer">Come raggiungerci</a>
        </div>
        <div className="location-map"><iframe title="Mappa di Società Agricola Papini Giocondo" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a href={mapUrl} target="_blank" rel="noopener noreferrer">Apri in Google Maps <ArrowUpRight size={20} aria-hidden="true" /></a></div>
      </section>

      <div id="scrivici"><Contatti expanded /></div>
    </main>
  );
}
