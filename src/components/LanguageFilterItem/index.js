import './index.css'

const LanguageFilterItem = props => {
  const {languageItemDetails, changeActiveBtn, isActive} = props
  const {language, id} = languageItemDetails

  const activeTabBtn = isActive ? 'onActive' : ''

  const onClickLanguageBtn = () => {
    changeActiveBtn(id)
  }

  return (
    <li className="language-list-item-container">
      <button
        className={`tab-item ${activeTabBtn}`}
        type="button"
        onClick={onClickLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
