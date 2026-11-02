import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top">
        <div className="footer-notes">
          <p>Vivai Papini Giocondo</p>
          <p>{CONTACT_ADDRESS}</p>
          <p>Visite in azienda su appuntamento</p>
        </div>
        <a href="#top" className="footer-top-link">
          Torna su
        </a>
      </div>

      <a className="footer-contact-line" href={`mailto:${CONTACT_EMAIL}`}>
        {CONTACT_EMAIL.replace("@", "\n@")}
      </a>

      <p className="footer-phone">
        <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}>{CONTACT_PHONE}</a>
      </p>

      <div className="footer-meta">
        <p>
          <a href="#produzioni">Produzioni</a>
          {" · "}
          <a href="#storia">Storia</a>
          {" · "}
          <a href="#approccio">Approccio</a>
        </p>
        <p className="footer-credits">
          Pictures and footage:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:(MHNT)_Olea_europaea_-_Inflorescence_and_leaves.jpg">
            “(MHNT) Olea europaea”
          </a>{" "}
          by Didier Descouens, CC BY-SA 4.0;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Lun_Olive-Gardens_(2).jpg">
            “Lun Olive-Gardens”
          </a>{" "}
          by Palauenc05, CC BY-SA 4.0;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Byam_Acacia_mimosa.jpg">
            “Byam Acacia mimosa”
          </a>{" "}
          by Lydia Byam, CC BY-SA 4.0;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Parc_Gonzalez_-_Acacia_verticillata.jpg">
            “Parc Gonzalez - Acacia”
          </a>{" "}
          by Tangopaso, public domain;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Edwards%27s_botanical_register_(Plate_1438)_(7794919072).jpg">
            “Edwards&apos;s Botanical Register”
          </a>
          , public domain;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Annual_illustrated,_descriptive_catalogue_of_seeds,_plants,_vines,_small_fruits_(18uu)_(18427303971).jpg">
            nursery catalogue
          </a>{" "}
          by Internet Archive Book Images;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Maestral_i_masline_130321.webm">
            “Maestral i masline”
          </a>{" "}
          by Quahadi Añtó, CC BY-SA 3.0 · via Wikimedia Commons. Not our plants.
        </p>
        <p>Italia · 1920–oggi</p>
      </div>
    </footer>
  );
}
