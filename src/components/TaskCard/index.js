import {Link} from "react-router-dom"
import "./index.css"

const TaskCard = props => {
  const {
    taskDetails,
    onDeleteTask,
    onChangeStatus,
  } = props

  const {
    id,
    title,
    description,
    priority,
    status,
    deadline,
  } = taskDetails

  const handleStatusChange = event => {
    onChangeStatus(id, event.target.value)
  }

  const handleDelete = () => {
    onDeleteTask(id)
  }

  return (
   
    <li>
         <Link to={`/task/${id}`}>
      <span className={`priority ${priority}`}>
  {priority.toUpperCase()}
</span>

      <h3>{title}</h3>

      <p>{description}</p>

      <p>{deadline}</p>
      </Link>
      <select
        value={status}
        onChange={handleStatusChange}
      >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Done</option>
      </select>

      <button
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
    
  )
}

export default TaskCard