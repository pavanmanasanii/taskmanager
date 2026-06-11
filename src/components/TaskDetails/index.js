import {Component} from "react"


import "./index.css"

class TaskDetails extends Component {
  render() {
    const {tasks, history, match} = this.props

    const {id} = match.params

    const task = tasks.find(
      eachTask => eachTask.id === Number(id)
    )

    if (!task) {
      return (
        <div>
          <h1>Task Not Found</h1>

          <button
            type="button"
            onClick={() => history.push("/")}
          >
            Back to Dashboard
          </button>
        </div>
      )
    }

    const {
      title,
      description,
      priority,
      status,
      deadline,
    } = task

    return (
      <div className="task-details-container">
        <button
          type="button"
          onClick={() => history.goBack()}
        >
          ← Back
        </button>

        <div className="task-details-card">
          <h1>{title}</h1>

          <div>
            <p>
              <strong>Priority:</strong>{" "}
              {priority}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {status}
            </p>

            <p>
              <strong>Deadline:</strong>{" "}
              {deadline}
            </p>
          </div>

          <h3>Description</h3>

          <p>{description}</p>
        </div>
      </div>
    )
  }
}

export default TaskDetails