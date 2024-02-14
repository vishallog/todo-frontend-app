import { useContext, useEffect, useState } from "react"
import { context, server } from "../main"
import { Navigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import TodoItem from "../components/TodoItem"

const Home = () => {
  const {isAuthenticated, setUpdateInfo} = useContext(context)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [refresh,setRefresh] = useState(false)
  const [todos,setTodos] = useState([])

  useEffect(() => {
    setUpdateInfo({})
    axios.get(`${server}/myTodos`, {
      withCredentials: true,
  }).then((res)=>{
    setTodos(res.data.myTodos)
    // console.log(res.data.myTodos)
    
  }).catch((error)=>{
     

      console.log(error)
  })
  }, [refresh])
  

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
        const { data } = await axios.post(`${server}/newTodo`, {
            title,
            description
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })
        
        toast.success(data.message)
        setRefresh(!refresh)
        setDescription("")
        setTitle("")

    } catch (error) {
        toast.error("Some error ocured")
        console.log(error)
        setRefresh(!refresh)


    }

}

// if(Object.keys(updateInfo).length !==0) console.log(updateInfo)

if(!isAuthenticated) return <Navigate to={'/login'}/>
  const handleUpdateInfo = (u_title,u_description,u_id)=>{
    setUpdateInfo({u_title,u_description,u_id})
  }

  const handleDelete = async(d_id)=>{
    try {
      const { data } = await axios.delete(`${server}/deleteTodo/${d_id}`, {
          withCredentials: true,
      })
      
      toast.success(data.message)
      setRefresh(!refresh)
      

  } catch (error) {
      toast.error("Some error ocured")
      console.log(error)
      setRefresh(!refresh)


  }
  }

  return (
    <div className="container">
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
                value={description}
                autoComplete="true"
                onChange={(e) => { setDescription(e.target.value) }}
                required
            />
            <button type="submit">Add TODO</button>
            
        </form>
       
    </section>
    </div>

    <section className="todosContainer">
     {
      todos.map((item)=>{
        return <TodoItem
        title={item.title}
        description={item.description}
        id={item._id}
        key={item._id}
        handleUpdateInfo={handleUpdateInfo}
        handleDelete={handleDelete}
        />
      })
     }
    </section>
</div>
  )
}

export default Home