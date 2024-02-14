/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


const TodoItem = (props) => {
  const {title, description, id, handleUpdateInfo,handleDelete, loading } = props
  

    return (
    <div className='todo' key={id}>
      <div>
        <h4>{title}</h4><br />
        <p>{description}</p>
      </div>
      <div>
        
        <Link to={'/updateTodo'}>
          <button  
          onClick={()=>{
            handleUpdateInfo(title,description,id)
          }}
          className='btn'  disabled={loading}>Update</button></Link>
        <button onClick={()=>{handleDelete(id)}} disabled={loading} className='btn'>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem