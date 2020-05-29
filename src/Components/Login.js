import React from "react"
import { useDispatch } from "react-redux"
import useInput from "../hooks/useInput"
import axios from "axios"
import { setUser } from "../redux/authReducer"
import { useHistory } from "react-router-dom"

const Login = () => {
    const dispatch = useDispatch()
    const {push} = useHistory()
  const [{ username, password }, {setInput}] = useInput({
    username: "",
    password: "",
  })
  return (
    <div>
      <form
        onSubmit={(e) => {
            e.preventDefault()
          axios.post("/auth/login", { username, password }).then((results) => {
            dispatch(setUser(results.data))
            push('/dashboard')
          })
        }}
      >
        <input name="username" value={username} onChange={setInput} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={setInput}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login