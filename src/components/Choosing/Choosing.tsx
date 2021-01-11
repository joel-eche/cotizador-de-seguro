import React from "react";
import InsuranceForm from "./InsuranceForm";

import "./../../styles/choosing.sass";

export default function Choosing() {
  return (
    <main className="main-choosing">
      <section className="separator-choosing-section"></section>
      <section className="form-choosing-section">
        <InsuranceForm />
      </section>
    </main>
  );
}
