import React from "react";
import PrimaryDataForm from "./PrimaryDataForm";

import urlIcoShield from "./../../images/ico-shield.png";
import urlIcoMobile from "./../../images/ico-mobile.png";
import "./../../styles/home.sass";

export default function Home() {
  return (
    <main className="main">
      <section className="hero-section">
        <div className="hero-section__info">
          <h1>
            <span className="light">Seguro de</span>
            <br></br>Salud
          </h1>
          <ul>
            <li className="flex align-center">
              <img className="hero-icon" src={urlIcoShield} alt="ico" />
              Cómpralo de manera fácil y rápida
            </li>
            <li className="flex align-center">
              <img className="hero-icon" src={urlIcoMobile} alt="ico" />
              Cotiza y compra tu seguro 100% digital
            </li>
            <li className="flex align-center">
              <img className="hero-icon" src={urlIcoShield} alt="ico" />
              Hasta S/.12 millones de cobertura anual
            </li>
            <li className="flex align-center">
              <img className="hero-icon" src={urlIcoMobile} alt="ico" />
              Más de 300 clínicas en todo el Perú
            </li>
          </ul>
        </div>
        <div className="hero-section__copyright">
          <span>&copy; 2020 RIMAC Seguros y Reaseguros</span>
        </div>
      </section>
      <section className="separator-section">
      </section>
      <section className="form-section">
        <h2>
          <span className="light">Obtén tu </span>
          <span className="light color-primary">seguro ahora</span>
        </h2>
        <p>Ingresa los datos para comenzar</p>
        <PrimaryDataForm />
      </section>
    </main>
  );
}
