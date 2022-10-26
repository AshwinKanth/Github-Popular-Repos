import Loader from 'react-loader-spinner'

import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    currentLanguage: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    const {currentLanguage} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${currentLanguage}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        issuesCount: eachRepository.issues_count,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        avatarUrl: eachRepository.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveBtn = id => {
    this.setState({currentLanguage: id}, this.getRepositoryList)
  }

  languageList = () => {
    const {currentLanguage} = this.state

    return (
      <ul className="language-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageItemDetails={eachLanguage}
            key={eachLanguage.id}
            changeActiveBtn={this.changeActiveBtn}
            isActive={currentLanguage === eachLanguage.id}
          />
        ))}
      </ul>
    )
  }

  repositoryItemList = () => {
    const {repositoryList} = this.state

    return (
      <ul className="repositoryItem-container">
        {repositoryList.map(eachRepository => (
          <RepositoryItem
            repositoryItemDetails={eachRepository}
            key={eachRepository.id}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-txt">Something went wrong</h1>
    </div>
  )

  renderRepositoryItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.repositoryItemList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.languageList()}
        {this.renderRepositoryItems()}
      </div>
    )
  }
}

export default GithubPopularRepos
