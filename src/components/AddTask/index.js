import {Component} from "react"
import './index.css'

class AddTask extends Component {
  state = {
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    deadline: "",
  }

  submitForm = event => {
    event.preventDefault()

    const {
      title,
      description,
      priority,
      status,
      deadline,
    } = this.state

    const {addTask} = this.props

    addTask({
      title,
      description,
      priority,
      status,
      deadline,
    })
  }

  render() {
    const {
      title,
      description,
      priority,
      status,
      deadline,
    } = this.state

    const {closeAddTask} = this.props

    return (
      <div className="modal-overlay">
        <form
          className="modal-card"
          onSubmit={this.submitForm}
        >
          <h1>Add New Task</h1>

          <input
            value={title}
            placeholder="Task Title"
            onChange={e =>
              this.setState({
                title: e.target.value,
              })
            }
          />

          <textarea
            value={description}
            placeholder="Description"
            onChange={e =>
              this.setState({
                description:
                  e.target.value,
              })
            }
          />

          <select
            value={priority}
            onChange={e =>
              this.setState({
                priority:
                  e.target.value,
              })
            }
          >
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

          <select
            value={status}
            onChange={e =>
              this.setState({
                status:
                  e.target.value,
              })
            }
          >
            <option value="todo">
              To Do
            </option>
            <option value="inprogress">
              In Progress
            </option>
            <option value="done">
              Done
            </option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={e =>
              this.setState({
                deadline:
                  e.target.value,
              })
            }
          />

          <button
            type="button"
            onClick={closeAddTask}
          >
            Cancel
          </button>

          <button type="submit">
            Create Task
          </button>
        </form>
      </div>
    )
  }
}

export default AddTask