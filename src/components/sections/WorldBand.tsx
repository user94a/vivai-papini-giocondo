import { sitePath } from "@/lib/site-path";
import Image from "next/image";

export function WorldBand() {
  return (
    <section className="world-band" id="mondo">
      <h2 className="world-heading">Il paesaggio intorno</h2>
      <div className="world-frame">
        <Image
          src={sitePath("/images/optimized/olivi-foto.webp")}
          alt="Filari di olivi coltivati in vaso nel vivaio"
          width={1920}
          height={1280}
          className="world-photo"
          sizes="100vw"
        />
      </div>
      <p className="world-caption">
        Olivi, filari e cura quotidiana: il nostro mestiere, pianta per pianta.
      </p>
    </section>
  );
}
