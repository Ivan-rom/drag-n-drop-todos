import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../../shared/LocalStorageClient'

function Projects() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [ismodal, setIsmodal] = useState(false)

  function createProject() {
    const id = +projects[projects.length - 1]?.id + 1 || 1
    const data = { title, todos: [], comments: [] }

    storage(id, data)
    setProjects((prev) => [...prev, { title, id }])
    setTitle('')
    modalChange()
  }

  useEffect(() => {
    const projects = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const data = storage(key)
      projects.push({ title: data.title, id: key })
    }
    setProjects([...projects])
  }, [])

  function modalChange() {
    setIsmodal(!ismodal)
  }

  return (
    <div className="projects">
      <div className="container">
        <div className="projects__header">
          <h1>Список проектов</h1>
        </div>
        <div className="projects__wrapper">
          <button
            className="projects__new_button"
            onClick={modalChange}
          ></button>
          <ul className="projects__list">
            {projects.map((project) => (
              <li className="projects__item" key={project.id}>
                <Link to={`project/${project.id}`} className="link">
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {ismodal && (
        <div className="projects__modal modal">
          <div className="modal__background" onClick={modalChange}></div>
          <div className="modal__wrapper">
            <p className="modal__header">Создание нового проекта</p>
            <label htmlFor="title" className="modal__label">
              Название{' '}
            </label>
            <input
              type="text"
              className="modal__input"
              name="title"
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <button className="modal__submit" onClick={createProject}>
              Подтвердить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
