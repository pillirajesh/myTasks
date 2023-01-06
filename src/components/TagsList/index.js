import './index.css'

const TagsList = props => {
  const {eachTagDetails, active, activeTag} = props
  const {optionId, displayText} = eachTagDetails

  const activeButton = () => {
    activeTag(optionId)
  }

  const d = active ? 'color' : ''

  return (
    <li className="tag-list-items">
      <button
        type="button"
        className={`${d} tag-button`}
        onClick={activeButton}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagsList
