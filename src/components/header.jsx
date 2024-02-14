import { useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import { context, server } from "../main"
import axios from "axios"
import toast from "react-hot-toast"

const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(context)
    const onLogout = async (e) => {
        e.preventDefault;

        try {
            const { data } = await axios.get(`${server}/logout`, {
                withCredentials: true,
            })
            setIsAuthenticated(false)
            toast.success(data.message)
            return <Navigate to={'/login'} />




        } catch (error) {
            toast.error("Some error ocured")
            console.log(error)
            setIsAuthenticated(true)


        }

    }


    return (
        <nav className="header">
            <div>
                <h2>TODO APP.</h2>
            </div>
            <article>

                {
                    !isAuthenticated ?<> <Link to={'/login'}>Login</Link> <Link to={'/register'}>Register</Link></> : <><Link to={'/'}>Home</Link><Link to={'/profile'}>Profile</Link> <Link onClick={onLogout}>Logout</Link></>
                }


            </article>
        </nav>
    )
}

export default Header