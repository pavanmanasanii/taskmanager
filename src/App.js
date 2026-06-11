import {Component} from "react"
import {Switch, Route} from "react-router-dom"

import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import TaskDetails from "./components/TaskDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"
let tasksData = [
  {
    id: 2,
    title: 'Brainstorming',
    description:
      "Brainstorming brings team members' diverse experience into play. Run timed ideation rounds, capture every idea without judgement, then cluster themes and vote on directions. Document assumptions, risks, and dependencies so the team can align on scope before detailed planning begins.",
    priority: 'low',
    status: 'todo',
    deadline: '2024-12-05',
  },
  {
    id: 1,
    title: 'Research',
    description:
      'User research helps you to create an optimal product for users. Plan interviews and contextual inquiry, synthesise findings into personas and journey maps, and translate insights into measurable problems. Share a concise readout with design and engineering so decisions stay grounded in evidence.',
    priority: 'high',
    status: 'todo',
    deadline: '2024-12-06',
  },
  {
    id: 3,
    title: 'Wireframes',
    description:
      'Low fidelity wireframes include the most basic content and visuals. Map primary flows, empty states, and error paths at grayscale fidelity before polishing UI. Annotate interactions and data requirements so developers can estimate effort and spot edge cases early in the lifecycle.',
    priority: 'high',
    status: 'todo',
    deadline: '2024-12-05',
  },
  {
    id: 4,
    title: 'Onboarding Illustrations',
    description:
      'Create engaging illustrations for the onboarding flow. Establish a consistent character style, export assets for light and dark themes, and coordinate with copy for pacing across screens. Deliver SVG or PNG sets with a simple usage guide for engineers implementing animations.',
    priority: 'low',
    status: 'inprogress',
    deadline: '2024-12-05',
  },
  {
    id: 5,
    title: 'Moodboard',
    description:
      'Build a visual moodboard for the new design direction. Collect typography, colour, photography, and spatial references that express the brand tone. Present rationale for each cluster and capture stakeholder feedback in a single source of truth the team can revisit during visual design.',
    priority: 'low',
    status: 'inprogress',
    deadline: '2024-12-06',
  },
  {
    id: 6,
    title: 'Mobile App Design',
    description:
      'Design the complete mobile app screens. Cover navigation patterns, accessibility targets, and responsive breakpoints. Hand off redlines, component specs, and prototype links so QA can validate flows against acceptance criteria before release candidates go to the store.',
    priority: 'medium',
    status: 'done',
    deadline: '2024-12-06',
  },
  {
    id: 7,
    title: 'Design System',
    description:
      'It just needs to adapt the UI from what you did before. Audit existing components, define tokens for spacing and colour, and publish documentation with live examples. Set governance for contributions and versioning so product teams can ship consistently without reinventing patterns each sprint.',
    priority: 'medium',
    status: 'done',
    deadline: '2024-12-06',
  },
]



class App extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || tasksData,
  }

  updateTasks = updatedTasks => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    )

    this.setState({
      tasks: updatedTasks,
    })
  }
  
  render() {
    const {tasks} = this.state

    return (
      <Switch>
        <Route
          exact
          path="/login"
          component={Login}
        />

        <ProtectedRoute
          exact
          path="/"
          render={props => (
            <Dashboard
              {...props}
              tasks={tasks}
              updateTasks={this.updateTasks}
            />
          )}
        />

        <ProtectedRoute
          path="/task/:id"
          render={props => (
            <TaskDetails
              {...props}
              tasks={tasks}
            />
          )}
        />
      </Switch>
    )
  }
}

export default App