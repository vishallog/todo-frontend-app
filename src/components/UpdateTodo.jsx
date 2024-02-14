/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { context, server } from "../main"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
const UpdateTodo = () => {
    const { isAuthenticated, updateInfo, setUpdateInfo, setLoading, loading} = useContext(context)
    if(Object.keys(updateInfo).length === 0){
       
        return <Navigate to={'/'}/>
    }
    const [title, setTitle] = useState(updateInfo.u_title)
    const [refresh,setRefresh] = useState(false)
    const [description, setDescription] = useState(updateInfo.u_description)
    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
             await axios.put(`${server}/updateTodo/${updateInfo.u_id}`, {
                title,
                description
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            toast.success("toast is updated")
            setUpdateInfo({})
            setDescription("")
            setTitle("")
            setLoading(false)
            return <Navigate to={'/'}/>

        } catch (error) {
            setUpdateInfo({})
            setDescription("")
            setTitle("")
            setLoading(false)

           
            toast.error("Some error ocured")
            console.log(error)
            return <Navigate to={'/'}/>



        }

    }


    
//    console.log(updateInfo)

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="text"
                        placeholder="Title"
                        autoComplete="true"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                    />
                    <textarea
                        rows={4}
                        type="text"
                        placeholder="Description"
                        autoComplete="true"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        required
                    />
                    <button type="submit" disabled={loading}>Update TODO</button>
                    <Link to={'/'}><button>Home</button></Link>


                </form>

            </section>
        </div>
    )
}

export default UpdateTodo