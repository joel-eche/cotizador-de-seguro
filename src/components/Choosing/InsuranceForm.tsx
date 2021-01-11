import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { getPerson } from "../../services/api.services";
import { Person } from "../../classes/Person";
import { PLANS } from "../../constants/insurance.constants";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeftOutline,
  Heart,
} from "heroicons-react";
import urlIcoCheck from "./../../images/ico-check.png";
import urlBenefit from "./../../images/benefit.png";

const validationSchema = Yup.object({
  identifier: Yup.string()
    .length(8, "Introduzca una identificación válida")
    .matches(/[0-9]{8}/, { message: "Introduzca una identificación válida" })
    .required("Campo requerido"),
  name: Yup.string().required("Campo requerido"),
  faherLastname: Yup.string().required("Campo requerido"),
  motherLastname: Yup.string().required("Campo requerido"),
  birthDate: Yup.date().max(new Date()).required("Campo requerido"),
  gender: Yup.string().required("Campo requerido"),
  insured: Yup.string().required("Campo requerido"),
  plan: Yup.string().required("Campo requerido"),
});

export default function InsuranceForm() {
  const [person, setPerson] = useState<Person>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [step, setStep] = useState(1);
  const history = useHistory();

  useEffect(() => {
    const getInitialPersonData = async () => {
      const newPerson = new Person();
      const data = await getPerson();
      newPerson.identifier = data.numDocumento;
      newPerson.kindIdentifier = data.tipoDocumento;
      newPerson.name = data.nombres;
      newPerson.faherLastname = data.apellidoPaterno;
      newPerson.motherLastname = data.apellidoMaterno;
      newPerson.birthDate = formatDashDate(data.fecNacimiento);
      newPerson.gender = data.sexo;
      newPerson.insured = "";
      newPerson.plan = "basic";
      setPerson(newPerson);
    };

    getInitialPersonData();
  }, []);

  useEffect(() => {
    if (person) {
      setIsloading(false);
    }
  }, [person]);

  const formatDashDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const goNextStep = () => {
    setStep(2);
  };

  const goPreviousStep = () => {
    setStep(1);
  };

  const goThanksPage = () => {
    history.push("/thanks");
  };

  const goHomePage = () => {
    history.push("/");
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          initialValues={person || new Person()}
          validationSchema={validationSchema}
          handleChange={() => {
            console.log("hi");
          }}
          onSubmit={(
            values: Person,
            { setSubmitting }: FormikHelpers<Person>
          ) => {
            console.log(JSON.stringify(values, null, 2));
            history.push("/choosing");
          }}
        >
          {(formik) => (
            <Form className="insurance-form">
              {step === 1 ? (
                <>
                  <div className="flex align-center mb-20 font-12">
                    <ChevronLeftOutline
                      className="color-primary cursor-pointer"
                      onClick={goHomePage}
                    />
                    <span
                      className="color-primary cursor-pointer"
                      onClick={goHomePage}
                    >
                      PASO 1 &nbsp;{" "}
                    </span>
                    <span className="color-gray"> DE 2</span>
                  </div>
                  <h2 className="light mb-10">
                    <span>Hola, </span>
                    <span className="light color-primary">
                      {formik.values?.name}
                    </span>
                  </h2>
                  <p className="light mb-35">
                    Valida que los datos sean correctos
                  </p>
                  <h3 className="light mb-20">Datos personales del titular</h3>
                  <div className="form-container-group">
                    <Field
                      className="form-container-group__select"
                      name="kindIdentifier"
                      component="select"
                    >
                      <option value="dni">DNI</option>
                      <option value="libreta">Carnét de extrangería</option>
                    </Field>
                    <div className="form-container-group__input--right">
                      <label className="label" htmlFor="identifier">
                        Nro. de documento
                      </label>
                      <Field
                        id="identifier"
                        name="identifier"
                        placeholder="87654321"
                      />
                    </div>
                  </div>

                  <div className="form-container">
                    <label className="label" htmlFor="name">
                      Nombres
                    </label>
                    <Field id="name" name="name" placeholder="Nombres" />
                  </div>

                  <div className="form-container">
                    <label className="label" htmlFor="faherLastname">
                      Apellido paterno
                    </label>
                    <Field
                      id="faherLastname"
                      name="faherLastname"
                      placeholder="Apellido paterno"
                    />
                  </div>

                  <div className="form-container">
                    <label className="label" htmlFor="motherLastname">
                      Apellido Materno
                    </label>
                    <Field
                      id="motherLastname"
                      name="motherLastname"
                      placeholder="Apellido Materno"
                    />
                  </div>

                  <div className="form-container">
                    <label className="label" htmlFor="birthDate">
                      Fecha de nacimiento
                    </label>
                    <Field
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      placeholder="Fecha de nacimiento"
                    />
                  </div>

                  <div></div>
                  <div role="group" aria-labelledby="gender" className="mb-20">
                    <p className="mb-20">Género</p>
                    <label className="radiobutton mb-15">
                      Masculino
                      <Field type="radio" name="gender" value="M" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radiobutton mb-15">
                      Femenino
                      <Field type="radio" name="gender" value="F" />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div role="group" aria-labelledby="insured" className="mb-20">
                    <p className="mb-20">¿A quién vamos a asegurar?</p>
                    <label className="radiobutton mb-10">
                      Solo a mí
                      <Field type="radio" name="insured" value="me" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radiobutton mb-10">
                      A mí y a mi familia
                      <Field type="radio" name="insured" value="family" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={goNextStep}
                      className={
                        formik.isValid && !!formik.values.insured
                          ? "btn"
                          : "btn-disabled"
                      }
                      disabled={!(formik.isValid && !!formik.values.insured)}
                    >
                      CONTINUAR
                      <ChevronRight />
                    </button>
                  </div>
                </>
              ) : null}
              {step === 2 ? (
                <>
                  <div className="flex align-center mb-20 font-12">
                    <ChevronLeftOutline
                      className="color-primary cursor-pointer"
                      onClick={goPreviousStep}
                    />
                    <span
                      className="color-primary cursor-pointer"
                      onClick={goPreviousStep}
                    >
                      PASO 2 &nbsp;{" "}
                    </span>
                    <span className="color-gray"> DE 2</span>
                  </div>
                  <h2 className="light mb-10">
                    <span>Elige </span>
                    <span className="light color-primary">tu protección</span>
                  </h2>
                  <p className="light mb-35">
                    Selecciona tu plan de salud ideal
                  </p>
                  <div>
                    <div role="group" aria-labelledby="plan" className="plans">
                      {PLANS.map((plan) => {
                        return (
                          <label
                            key={plan.name}
                            className={
                              plan.name === formik.values.plan
                                ? "checkbox-plan--active"
                                : "checkbox-plan"
                            }
                          >
                            <Field type="radio" name="plan" value={plan.name} />
                            <div className="checkbox-plan__description">
                              <div>
                                <span className="font-11">{plan.text}</span>
                              </div>
                              <div>
                                <span className="font-10">s/ </span>
                                <span>{plan.price}</span>
                              </div>
                              <div>
                                <span className="font-11">mensual</span>
                              </div>
                            </div>
                            {plan.name === formik.values.plan ? (
                              <img
                                className="check-icon"
                                src={urlIcoCheck}
                                alt="check"
                              />
                            ) : null}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    {PLANS.map((plan) => {
                      return plan.name === formik.values.plan ? (
                        <div className="card-plan" key={plan.name}>
                          <div className="card-plan__header">
                            Cuentas con estos beneficios
                          </div>
                          <div className="card-plan__body">
                            <div className="card-plan__max">
                              <div className="card-plan__max__detail">
                                <span className="font-12 mb-15">
                                  Cobertura máxima
                                </span>
                                <strong className="mb-15">
                                  {plan.maxCovered}
                                </strong>
                                <div>
                                  <span className="tag">PLAN {plan.text}</span>
                                </div>
                              </div>
                              <img src={urlBenefit} alt="benefit" />
                            </div>
                            <div className="card-plan__offer">
                              <ul>
                                <li>
                                  <Heart size={12} className="color-primary" />
                                  <span>
                                    <span>Lima</span>
                                    <span>(zona de cobertura)</span>
                                  </span>
                                </li>
                                <li>
                                  <Heart size={12} className="color-primary" />
                                  <span>
                                    <span>+30 clínicas</span>
                                    <span>(en red afiliada)</span>
                                  </span>
                                </li>
                                <li>
                                  <Heart
                                    size={12}
                                    className={
                                      plan.hasPreventiveCheck
                                        ? "color-primary"
                                        : "color-gray"
                                    }
                                  />
                                  <span
                                    className={
                                      plan.hasPreventiveCheck
                                        ? ""
                                        : "unavailable"
                                    }
                                  >
                                    Médico a domicilio
                                  </span>
                                </li>
                                <li>
                                  <Heart
                                    size={12}
                                    className={
                                      plan.hasPreventiveCheck
                                        ? "color-primary"
                                        : "color-gray"
                                    }
                                  />
                                  <span
                                    className={
                                      plan.hasPreventiveCheck
                                        ? ""
                                        : "unavailable"
                                    }
                                  >
                                    Chequeos preventivos
                                  </span>
                                </li>
                                <li>
                                  <Heart
                                    size={12}
                                    className={
                                      plan.hasNationalRefund
                                        ? "color-primary"
                                        : "color-gray"
                                    }
                                  />
                                  <span
                                    className={
                                      plan.hasNationalRefund
                                        ? ""
                                        : "unavailable"
                                    }
                                  >
                                    Reembolso nacional
                                  </span>
                                </li>
                                <li>
                                  <Heart
                                    size={12}
                                    className={
                                      plan.hasInternationalRefund
                                        ? "color-primary"
                                        : "color-gray"
                                    }
                                  />
                                  <span
                                    className={
                                      plan.hasInternationalRefund
                                        ? ""
                                        : "unavailable"
                                    }
                                  >
                                    Reembolso internacional
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="border-bottom-gray-light py-20">
                    <p>Revisa nuestros</p>
                    <strong className="color-primary">
                      servicios y exclusiones
                    </strong>
                  </div>
                  <div className="flex justify-between py-20 border-bottom-gray-light">
                    <span>Servicios brindados</span>
                    <ChevronDown className="color-primary" />
                  </div>
                  <div className="flex justify-between mb-20 py-20 border-bottom-gray-light">
                    <span>Servicios brindados</span>
                    <ChevronDown className="color-primary" />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn-white font-11 border-bottom-gray-light"
                    >
                      ENVIAR COTIZACIÓN POR CORREO
                    </button>
                    <button
                      type="submit"
                      className="btn font-11"
                      onClick={goThanksPage}
                    >
                      COMPRAR PLAN
                    </button>
                  </div>
                </>
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
