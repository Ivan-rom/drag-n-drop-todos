import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodoAction, updateTodoAction } from '../../redux/actions'

function CreateModal({ createModalChange, todo, newId }) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState(todo?.title || '')
  const [description, setDescription] = useState(todo?.description || '')
  const [subtask, setSubtask] = useState('')
  const [subtasks, setSubtasks] = useState(todo?.subtasks || [])
  const [priority, setPriority] = useState(todo?.priority || 'normal')

  function submit(e) {
    e.preventDefault()
    if (title === '') {
      alert('Введите название!')
      return
    } else if (description === '') {
      alert('Введите описание!')
      return
    }
    const createdTime = Date.now()
    const newTodo = {
      id: todo?.id.toString() || newId.toString(),
      createdTime,
      startedTime: null,
      doneTime: null,
      title,
      description,
      subtasks,
      priority,
      status: todo?.status || 'queue',
    }
    if (todo) {
      dispatch(updateTodoAction(newTodo))
    } else {
      dispatch(createTodoAction(newTodo))
    }
    createModalChange()
  }

  function checkSubtask(newTask) {
    for (let i = 0; i < subtask.length; i++) {
      const task = subtasks[i]
      if (newTask.value === task?.value) return true
    }
    return false
  }

  function addSubtask() {
    if (subtask === '') {
      return
    }
    const newTask = { done: false, value: subtask }
    if (checkSubtask(newTask)) {
      alert('Такая подзадача уже присудствует')
      return
    }
    setSubtasks([...subtasks, newTask])
  }

  return (
    <div className="project__create_modal create_modal">
      <div
        className="create_modal__background"
        onClick={createModalChange}
      ></div>
      <div className="create_modal__wrapper">
        <p className="create_modal__header">Создание новой задачи</p>
        <form className="create_modal__form">
          <label htmlFor="title" className="create_modal__label">
            Заголовок
          </label>
          <input
            type="text"
            className="create_modal__input"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor="description" className="create_modal__label">
            Описание
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            className="create_modal__input"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
          <label htmlFor="subtask" className="create_modal__label">
            Подзадачи
          </label>
          <input
            type="text"
            className="create_modal__input"
            name="subtask"
            id="subtask"
            value={subtask}
            onChange={({ target }) => setSubtask(target.value)}
          />
          <button
            className="create_modal__sub_button"
            type="button"
            onClick={() => {
              addSubtask()
              setSubtask('')
            }}
          >
            добавить
          </button>
          <ul className="create_modal__subtasks">
            {subtasks.map((subtask) => (
              <li key={subtask.value}>{subtask.value}</li>
            ))}
          </ul>
          <label htmlFor="priority">Приритет</label>
          <select
            name="priority"
            id="priority"
            className="create_modal__input"
            onChange={({ target }) => setPriority(target.value)}
          >
            <option selected={priority === 'normal'} value="normal">
              Обычный
            </option>
            <option selected={priority === 'high'} value="high">
              Высокий
            </option>
            <option selected={priority === 'low'} value="low">
              Низкий
            </option>
          </select>
          <button
            type="submit"
            className="create_modal__submit"
            onClick={submit}
          >
            Добавить
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateModal
