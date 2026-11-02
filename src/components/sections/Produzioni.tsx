"use client";

import Image from "next/image";
import { PLANTS } from "@/lib/content";
import { usePlant } from "@/components/PlantContext";

export function Produzioni() {
  const { plantId, setPlantId, plant } = usePlant();

  return (
    <section className="showcase" id="produzioni">
      <div className="showcase-media">
        <Image
          src={plant.image}
          alt={plant.imageAlt}
          width={1200}
          height={1200}
          className="showcase-photo"
          sizes="(max-width: 900px) 100vw, 45vw"
        />
      </div>

      <div className="showcase-copy">
        <div className="showcase-tabs" role="tablist" aria-label="Produzioni">
          {PLANTS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={plantId === item.id}
              className={
                plantId === item.id ? "showcase-tab is-active" : "showcase-tab"
              }
              onClick={() => setPlantId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="showcase-mid">
          <h2>{plant.title}</h2>
          <p>{plant.text}</p>
        </div>

        <div className="showcase-actions">
          <a href="#contatti" className="btn-primary">
            Chiedi di questo
          </a>
          <a href="#approccio" className="btn-field">
            Come lavoriamo
          </a>
        </div>
      </div>
    </section>
  );
}
