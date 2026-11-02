"use client";

import { PLANTS } from "@/lib/content";
import { usePlant } from "@/components/PlantContext";

export function Hero() {
  const { plantId, setPlantId, plant } = usePlant();

  return (
    <section className="hero" id="top">
      <div className="hero-field">
        <div className="invite-card" aria-labelledby="hero-title">
          <h1 id="hero-title" className="invite-names">
            <span className="invite-line-a">Papini</span>
            <span className="invite-line-b">Giocondo</span>
          </h1>
          <p className="invite-detail">
            Dal 1920
            <span className="invite-diamond" aria-hidden="true" />
            Olivi, mimose, rose
            <span className="invite-diamond" aria-hidden="true" />
            Pianta per pianta
          </p>
          <p className="hero-lead">
            Vivaio B2B dal 1920: olivi, mimose e rose per chi fa del verde un
            mestiere. Ogni lotto passa sotto i nostri occhi prima di partire.
          </p>

          <fieldset className="plant-picker">
            <legend className="sr-only">Scegli la produzione da chiedere</legend>
            <div
              className="plant-picker-row"
              role="radiogroup"
              aria-label="Produzione"
            >
              {PLANTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={plantId === item.id}
                  className={
                    plantId === item.id ? "plant-chip is-active" : "plant-chip"
                  }
                  onClick={() => setPlantId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="plant-picker-note">
              Stai chiedendo di: <strong>{plant.title}</strong> ({plant.ages})
            </p>
          </fieldset>
        </div>
      </div>
    </section>
  );
}
