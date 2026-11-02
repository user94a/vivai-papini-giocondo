import { sitePath } from "@/lib/site-path";
import Image from "next/image";

export function WorldBand() {
  return (
    <section className="world-band" id="mondo">
      <h2 className="world-heading">Il paesaggio intorno</h2>
      <div className="world-frame">
        <video
          className="world-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={sitePath("/assets/maestral-i-masline-130321-poster.jpg")}
          width={848}
          height={480}
          aria-hidden="true"
        >
          <source
            src={sitePath("/assets/maestral-i-masline-130321.webm")}
            type="video/webm"
          />
        </video>
        <Image
          src={sitePath("/assets/lun-olive-gardens-2.jpg")}
          alt="Oliveto mediterraneo storico, giardini di Lun"
          width={1920}
          height={1280}
          className="world-photo"
          sizes="100vw"
        />
      </div>
      <p className="world-caption">
        Vento sugli olivi e paesaggio mediterraneo: il mondo intorno al nostro
        mestiere, non le nostre piante in campo.
      </p>
    </section>
  );
}
