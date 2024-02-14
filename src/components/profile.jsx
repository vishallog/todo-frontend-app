import { useContext } from "react"
import { context } from "../main"
import { Link, Navigate } from "react-router-dom"

const Profile = () => {
  const {user, isAuthenticated} = useContext(context)
  if(!isAuthenticated) return <Navigate to={'/login'}/>
  console.log(user)
  return (
    <div className="login">
            <section>
            <form >
                    <input type="name"
                        placeholder="Name"
                        value={user.name}
                        readOnly
                        required
                        autoComplete="true"
                    />    
                    <input type="email"
                        placeholder="Email"
                        value={user.email}
                        readOnly
                        required
                        autoComplete="true"
                    />
                    
                    
                    <Link to={'/'}><button>Home</button></Link>
               </form>
            </section>
        </div>
  )
}

export default Profile