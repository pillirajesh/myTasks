import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagsList from '../TagsList'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    input: '',
    changeTag: tagsList[0].optionId,
    tasksList: [],
    isTrue: false,
    activeTagg: 'Empty',
  }

  showTextInput = event => {
    this.setState({input: event.target.value})
  }

  changeOption = event => {
    this.setState({changeTag: event.target.value})
  }

  submitTask = event => {
    event.preventDefault()
    const {input, changeTag} = this.state
    const listItem = {
      text: input,
      tab: changeTag,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, listItem],
      input: '',
      changeTag: '',
      isTrue: true,
    }))
  }

  activeTag = optionId => {
    const {tasksList} = this.state
    const isActive = tasksList.filter(each => each.optionId === optionId)
    this.setState(prevState => ({
      activeTagg: prevState.activeTagg === optionId ? 'Empty' : optionId,
      tasksList: isActive,
    }))
  }

  render() {
    const {input, tasksList, isTrue, activeTagg} = this.state

    const filteredList =
      activeTagg === 'Empty'
        ? tasksList
        : tasksList.filter(each => each.tab === activeTagg)

    return (
      <div className="app-container">
        <form className="side-container" onSubmit={this.submitTask}>
          <h1 className="side-heading">Create a task!</h1>
          <div>
            <label htmlFor="input" className="label">
              Task
            </label>
            <br />
            <input
              id="input"
              className="input"
              placeholder="Enter the task here"
              onChange={this.showTextInput}
              value={input}
            />
            <br />
            <label htmlFor="select" className="label">
              Tags
            </label>
            <br />
            <select id="select" className="select" onChange={this.changeOption}>
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div className="middle-container">
          <h1 className="tag-heading">Tags</h1>
          <ul className="tag-unordered-container">
            {tagsList.map(eachTag => {
              const active = eachTag.optionId === activeTagg
              console.log(active)

              return (
                <TagsList
                  eachTagDetails={eachTag}
                  key={eachTag.optionId}
                  activeTag={this.activeTag}
                  active={active}
                />
              )
            })}
          </ul>
          <h1 className="tag-heading">Tasks</h1>
          {isTrue ? (
            <ul className="added-list-container">
              {filteredList.map(each => (
                <li className="added-list" key={each.id}>
                  <p className="text">{each.text}</p>
                  <p className="change-tab-text" type="button">
                    {each.tab}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-task-paragraph">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
