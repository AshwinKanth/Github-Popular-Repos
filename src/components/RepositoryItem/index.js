import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemDetails

  return (
    <li className="repositoryList-Item-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="name">{name}</h1>
      <div className="item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="image"
        />
        <p className="count">{`${starsCount} stars`}</p>
      </div>
      <div className="item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="image"
        />
        <p className="count">{`${forksCount} stars`}</p>
      </div>
      <div className="item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="image"
        />
        <p className="count">{`${issuesCount} stars`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
