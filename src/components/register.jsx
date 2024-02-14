import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { context, server } from "../main"
import toast from "react-hot-toast"

const Register = () => {
    const {isAuthenticated,setIsAuthenticated, loading , setLoading} = useContext(context)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async(e) => {
        e.preventDefault()

       try {
        setLoading(true)
        const { data } = await axios.post(`${server}/register`,{
            name,
            email,
            password
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        toast.success(`${data.user.name} you registered successfully`)
        setLoading(false)
        setIsAuthenticated(true)
       } catch (error) {
        toast.error("Some error ocured")
        console.log(error)
        setLoading(false)

       }

    }
    if(isAuthenticated) return <Navigate to={'/'}/>
    
    
    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    />
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                    <button disabled={loading} type="submit">Sign Up</button>
                    <h4>Or</h4>
                    <Link to='/login'>Login </Link>
                </form>
            </section>
        </div>
    )
}

export default Register