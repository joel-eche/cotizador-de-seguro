import React from "react";

import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

interface Values {
  identifier: string;
  kindIdentifier: string;
  birthDate: string;
  cellphone: string;
  agreeWithDataPolicy: boolean;
  agreeWithCommunicationPolicy: boolean;
}

const validationSchema = Yup.object({
  identifier: Yup.string()
    .length(8, "Introduzca una identificación válida")
    .matches(/[0-9]{8}/, { message: "Introduzca una identificación válida" })
    .required("Campo requerido"),
  birthDate: Yup.date().max(new Date()).required("Required"),
  cellphone: Yup.string()
    .length(9, "Introduzca un número válido")
    .matches(/[0-9]{9}/, { message: "Introduzca un número válido" })
    .required("Campo requerido"),
  agreeWithDataPolicy: Yup.boolean()
    .required("Campo requerido")
    .oneOf([true], "Debe aceptar estos términos"),
  agreeWithCommunicationPolicy: Yup.boolean()
    .required("Campo requerido")
    .oneOf([true], "Debe aceptar estos términos"),
});

export default function PrimaryDataForm() {
  let history = useHistory();

  return (
    <Formik
      initialValues={{
        identifier: "",
        kindIdentifier: "dni",
        birthDate: "",
        cellphone: "",
        agreeWithDataPolicy: false,
        agreeWithCommunicationPolicy: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        console.log(JSON.stringify(values, null, 2));
        history.push("/choosing");
      }}
    >
      {(formik) => (
        <Form className="primary-data-form">
          <div className="form-container-group">
            <Field
              className="form-container-group__select"
              name="kindIdentifier"
              component="select"
            >
              <option value="dni">DNI</option>
              <option value="libreta">Libreta militar</option>
            </Field>
            <div className="form-container-group__input--right">
              <label className="label" htmlFor="identifier">
                Nro. de documento
              </label>
              <Field id="identifier" name="identifier" placeholder="87654321" />
            </div>
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

          <div className="form-container">
            <label className="label" htmlFor="cellphone">
              Celular
            </label>
            <Field
              id="cellphone"
              name="cellphone"
              type="tel"
              placeholder="123456789"
            />
          </div>

          <div>
            <label className="checkbox-label">
              Acepto la{" "}
              <span className="underlined">
                {" "}
                Política de Protección de Datos Personales y los Términos y
                Condiciones.
              </span>
              <Field type="checkbox" name="agreeWithDataPolicy" />
              <span className="checkbox-custom"></span>
            </label>
          </div>

          <div className="mb-35">
            <label className="checkbox-label">
              Acepto la{" "}
              <span className="underlined">
                {" "}
                Política de Envío de Comunicaciones Comerciales.
              </span>
              <Field type="checkbox" name="agreeWithCommunicationPolicy" />
              <span className="checkbox-custom"></span>
            </label>
          </div>

          <button className="btn" type="submit">
            COMENCEMOS
          </button>
        </Form>
      )}
    </Formik>
  );
}