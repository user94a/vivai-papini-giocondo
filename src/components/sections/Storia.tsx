import { sitePath } from "@/lib/site-path";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/content";

export function Storia() {
  return (
    <section className="about-section" id="storia">
      <h2 className="about-heading">Dal 1920</h2>
      <article className="letter-sheet">
        <Image
          src={sitePath("/logo-vivai-papini-giocondo.svg")}
          alt=""
          width={44}
          height={44}
          className="letter-mark"
        />
        <div className="letter-body">
          <p>
            Siamo un vivaio da oltre un secolo. Tre generazioni sullo stesso
            mestiere: coltivare piante buone e farle arrivare a chi le mette a
            dimora.
          </p>
          <p>
            Il nome Giocondo resta sul cartellino di ogni lotto che lascia il
            campo. Non è un ornamento: è la firma di chi ha guardato quella
            pianta prima di te.
          </p>
          <p>
            Lavoriamo con vivai, garden center e paesaggisti. Niente vendita a
            pezzo singolo online. Se sei un privato curioso, il vivaio ti
            aspetta lo stesso.
          </p>
          <p>
            <mark>Ogni buona fornitura comincia da una conversazione.</mark>{" "}
            Preferiamo parlare prima di caricare il camion.
          </p>
        </div>
        <footer className="letter-sign">
          <p className="letter-name">La famiglia Papini</p>
          <p className="letter-role">Vivai Papini Giocondo · dal 1920</p>
        </footer>
        <div className="letter-tear">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </article>
    </section>
  );
}
