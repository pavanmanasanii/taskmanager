import {Component} from "react"
import Cookie from "js-cookie"

import TaskCard from "../TaskCard"
import AddTask from "../AddTask"
import "./index.css"

class Dashboard extends Component {
  state = {
    priority: "all",
    showAddTask: false,
  }
  
  openAddTask = () => {
  this.setState({showAddTask: true})
}

closeAddTask = () => {
  this.setState({showAddTask: false})
} 

  logout = () => {
    Cookie.remove("jwt_token")

    const {history} = this.props
    history.replace("/login")
  }

  priorityChange = event => {
    this.setState({
      priority: event.target.value,
    })
  }

  onDeleteTask = id => {
    const {tasks, updateTasks} = this.props

    const updatedTasks = tasks.filter(
      task => task.id !== id,
    )

    updateTasks(updatedTasks)
  }
   
  addTask = taskData => {
  const {tasks, updateTasks} = this.props

  const newTask = {
    id: Date.now(),
    ...taskData,
  }

  updateTasks([...tasks, newTask])

  this.closeAddTask()
}

  onChangeStatus = (id, newStatus) => {
    const {tasks, updateTasks} = this.props

    const updatedTasks = tasks.map(task =>
      task.id === id
        ? {...task, status: newStatus}
        : task,
    )

    updateTasks(updatedTasks)
  }

  render() {
    const {priority,showAddTask} = this.state
    const {tasks} = this.props

    const filteredTasks =
      priority === "all"
        ? tasks
        : tasks.filter(
            task => task.priority === priority,
          )

    const todoTasks = filteredTasks.filter(
      task => task.status === "todo",
    )

    const inProgressTasks = filteredTasks.filter(
      task => task.status === "inprogress",
    )

    const completedTasks = filteredTasks.filter(
      task => task.status === "done",
    )

    return (
      <div>
        {showAddTask && (
  <AddTask
    closeAddTask={this.closeAddTask}
    addTask={this.addTask}
  />
)}
        <nav>
          <i className="fa-solid fa-note-sticky"></i>

          <button
         type="button"
           onClick={this.openAddTask}
          >
            + Add Task
             </button>

          <button
            type="button"
            onClick={this.logout}
          >
            Logout
          </button>
        </nav>

        <div>
          <label htmlFor="priority">
            Filter by priority
          </label>

          <select
            id="priority"
            value={priority}
            onChange={this.priorityChange}
          >
            <option value="all">
              All Priorities
            </option>
            <option value="high">
              High
            </option>
            <option value="medium">
              Medium
            </option>
            <option value="low">
              Low
            </option>
          </select>
        </div>

        <div className="taskcontainer">
          <div className="todocontainer">
            <h2>
              TO DO ({todoTasks.length})
            </h2>

            {todoTasks.length === 0 ? (
              <p>No tasks here</p>
            ) : (
              todoTasks.map(task => (
                <TaskCard
                  key={task.id}
                  taskDetails={task}
                  onDeleteTask={
                    this.onDeleteTask
                  }
                  onChangeStatus={
                    this.onChangeStatus
                  }
                />
              ))
            )}
          </div>

          <div className="inprogresscontainer">
            <h2>
              IN PROGRESS (
              {inProgressTasks.length})
            </h2>

            {inProgressTasks.length ===
            0 ? (
              <p>No tasks here</p>
            ) : (
              inProgressTasks.map(task => (
                <TaskCard
                  key={task.id}
                  taskDetails={task}
                  onDeleteTask={
                    this.onDeleteTask
                  }
                  onChangeStatus={
                    this.onChangeStatus
                  }
                />
              ))
            )}
          </div>

          <div className="completedcontainer">
            <h2>
              DONE (
              {completedTasks.length})
            </h2>

            {completedTasks.length ===
            0 ? (
              <p>No tasks here</p>
            ) : (
              completedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  taskDetails={task}
                  onDeleteTask={
                    this.onDeleteTask
                  }
                  onChangeStatus={
                    this.onChangeStatus
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard