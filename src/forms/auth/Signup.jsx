import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
}

function FormsAuthSignup(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          email: Yup.string().required().label('Title'),
          password: Yup.string().min(6).required().label('Password'),
          passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords need to match').required().label('Password Confirmation')
        })
      }
    >
      {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Email</label>
              <Field
                className={`form-control ${e?.email && t?.email && 'is-invalid'}`}
                name="email"
                type="email"
                placeholder="adam.chan@gmail.com"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="email"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <Field
                className={`form-control ${e?.password && t?.password && 'is-invalid'}`}
                name="password"
                type="password"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="password"
                component="div"
              />
            </div>

            <div className="mb-3">
              <label>Password Confirmation</label>
              <Field
                className={`form-control ${e?.passwordConfirmation && t?.passwordConfirmation && 'is-invalid'}`}
                name="passwordConfirmation"
                type="password"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="passwordConfirmation"
                component="div"
              />
            </div>

            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsAuthSignup
