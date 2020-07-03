import React, { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Formik, Form, Field } from "formik"
import { Button, TextField } from "@material-ui/core"
import "./Login.scss"

const Login = () => {
  const { login } = useContext(UserContext)
  return (
    <div className="login-page">
      <Formik initialValues={{ username: "", password: "" }}>
        {({ values: { username, password } }) => (
          <Form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              login({ username, password })
            }}
          >
            <Field name="username" as={TextField} />
            <Field name="password" type="password" as={TextField} />
            <Button type="submit" variant='contained'>Login</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
