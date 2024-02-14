import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { context, server } from "../main"
import toast from "react-hot-toast"

const Login = () => {
    const {isAuthenticated,setIsAuthenticated, setLoading, loading } = useContext(context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/login`, {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            setIsAuthenticated(true)
            toast.success(data.message)

            setLoading(false)

        } catch (error) {
            toast.error("Some error ocured")
            console.log(error)
            setIsAuthenticated(false)
            setLoading(false)


        }

    }
    if(isAuthenticated) return <Navigate to={'/'}/>

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="email"
                        placeholder="Email"
                       
                        autoComplete="true"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                    <input type="password"
                        placeholder="Password"
                        autoComplete="true"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                    <button  disabled={loading} type="submit">Login</button>
                    <h4>Or</h4>
                    <Link to='/register'>Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login