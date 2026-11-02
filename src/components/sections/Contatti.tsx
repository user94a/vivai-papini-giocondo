"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/content";
import { usePlant } from "@/components/PlantContext";

export function Contatti() {
  const { plant } = usePlant();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Richiesta ${plant.title} · Vivai Papini Giocondo`,
    );
    const body = encodeURIComponent(
      [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Azienda: ${company}`,
        `Produzione: ${plant.title}`,
        "",
        message || "Vorrei parlare di una fornitura.",
      ].join("\n"),
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contatti">
      <form className="coupon" onSubmit={onSubmit}>
        <div className="coupon-left">
          <h2>Parliamone</h2>
          <p>
            Vivai, garden center, paesaggisti: scrivici. Stai chiedendo di{" "}
            <strong>{plant.title}</strong>.
          </p>
        </div>
        <div className="coupon-right">
          <label className="sr-only" htmlFor="contact-name">
            Nome
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="sr-only" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="sr-only" htmlFor="contact-company">
            Azienda
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="Azienda"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <label className="sr-only" htmlFor="contact-message">
            Messaggio
          </label>
          <input
            id="contact-message"
            name="message"
            type="text"
            placeholder="Cosa ti serve"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn-primary coupon-submit">
            Apri email
          </button>
        </div>
      </form>
    </section>
  );
}
