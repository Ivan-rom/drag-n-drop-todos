import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeTitleAction } from '../../redux/actions'

function Header({ filter, setFilter, projectId }) {
  const dispatch = useDispatch()
  const title = useSelector((state) => state.title)
  const [isEditing, setIsEditing] = useState(false)
  const [vaule, setVaule] = useState(title)

  function changeTitle(e) {
    e.preventDefault()
    dispatch(changeTitleAction(vaule))
    setIsEditing((prev) => !prev)
  }

  return (
    <div className="project__header header">
      {isEditing ? (
        <form onSubmit={changeTitle}>
          <input
            type="text"
            value={vaule}
            className="header__title-change"
            onChange={({ target }) => setVaule(target.value)}
          />
          <button>Подтвердить</button>
        </form>
      ) : (
        <div className="header__wrapper">
          <h1 className="header__title">{title}</h1>
          <button onClick={() => setIsEditing((prev) => !prev)}>
            Изменить
          </button>
        </div>
      )}
      <div className="header__buttons">
        <input
          type="text"
          className="header__input"
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
          placeholder="Поиск"
        />
        <Link
          to={'/'}
          onClick={() => localStorage.removeItem(projectId)}
          className="header__delete"
        >
          delete
        </Link>
        <Link to={'/'} className="header__quit">
          qiut
        </Link>
      </div>
    </div>
  )
}

export default Header
