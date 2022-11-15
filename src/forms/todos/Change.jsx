import React from 'react'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  title: '',
  TodoItems: []
}

function FormsTodosChange(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          title: Yup.string().required().label('Title'),
          TodoItems: Yup.array().of(Yup.object({
            name: Yup.string().required().label('Name'),
            checked: Yup.boolean()
          }))
        })
      }
    >
      {
        ({ values: v, errors: e, touched: t, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Title</label>
              <Field
                className={`form-control ${e?.title && t?.title && 'is-invalid'}`}
                name="title"
                placeholder="Pokemons To Catch"
              />
              <ErrorMessage
                className="invalid-feedback"
                name="title"
                component="div"
              />
            </div>

            <FieldArray name="TodoItems">
              {
                ({ remove, push }) => (
                  <div className="px-5">
                    {
                      v.TodoItems.map((item, i) => (
                        <div key={i} className={`py-3 ${v?.TodoItems?.length > 1 && v?.TodoItems?.length !== i + 1 && 'border-bottom border-secondary'}`}>
                          <div className="mb-3 position-relative">
                            <button className="btn btn-danger btn-sm position-absolute top-0 end-0 py-0" type="button" onClick={() => remove(i)}>x</button>
                            <label>Item {i + 1} Name</label>
                            <Field
                              className={`form-control ${e?.TodoItems?.[i]?.name && t?.TodoItems?.[i]?.name && 'is-invalid'}`}
                              name={`TodoItems[${i}].name`}
                              placeholder="Pikachu"
                            />
                            <ErrorMessage
                              className="invalid-feedback"
                              name={`TodoItems[${i}].name`}
                              component="div"
                            />
                          </div>

                          <div className="form-check">
                            <label className="form-check-label">Completed</label>
                            <Field
                              className="form-check-input"
                              name={`TodoItems[${i}].checked`}
                              type="checkbox"
                            />
                            <ErrorMessage
                              className="invalid-feedback"
                              name={`TodoItems[${i}].checked`}
                              component="div"
                            />
                          </div>
                        </div>
                      ))
                    }

                    <div className="text-center">
                      <button className="btn btn-info" type="button" onClick={() => push({ name: '', checked: false })}>Add Item</button>
                    </div>
                  </div>
                )
              }
            </FieldArray>

            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsTodosChange
