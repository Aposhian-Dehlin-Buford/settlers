import { useEffect, useContext } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const useAuth = (adminRequired = false) => {
  const {user} = useContext(UserContext)
  // const { user_id, is_admin } = useSelector(
  //   ({ authReducer }) => authReducer.user
  // )
  const { push } = useHistory()
  useEffect(() => {
    if (!user) {
      push("/")
    } 
    // else if (user && adminRequired && !user.is_admin) {
    //   push("/dashboard")
    // }
  }, [user])
}

export default useAuth