export class Person {
  identifier: string;
  kindIdentifier: string;
  name: string;
  faherLastname: string;
  motherLastname: string;
  birthDate: string;
  gender: string;
  insured: string;
  plan: string;

  constructor() {
    this.identifier = "";
    this.kindIdentifier = "";
    this.name = "";
    this.faherLastname = "";
    this.motherLastname = "";
    this.birthDate = "";
    this.gender = "";
    this.insured = "";
    this.plan = "basic";
  }

  getData() {
    return {
      identifier: this.identifier,
      kindIdentifier: this.kindIdentifier,
      name: this.name,
      faherLastname: this.faherLastname,
      motherLastname: this.motherLastname,
      birthDate: this.birthDate,
      gender: this.gender,
      insured: this.insured,
      plan: this.plan,
    };
  }
}
