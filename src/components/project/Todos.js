import { useEffect, useState } from 'react'
import { dropTodoAction, setCurrentAction } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Todo from './Todo'

function Todos({ todos, createModalChange, infoModalChange }) {
  const dispatch = useDispatch()
  const currentTodo = useSelector((state) => state.currentTodo)
  const [boards, setBoards] = useState([
    {
      id: 0,
      title: 'Очередь',
      value: 'queue',
      todos: [],
    },
    {
      id: 1,
      title: 'Разработка',
      value: 'development',
      todos: [],
    },
    {
      id: 2,
      title: 'Сделано',
      value: 'done',
      todos: [],
    },
  ])

  function dropHandler(e, status) {
    e.preventDefault()
    if (status !== currentTodo.status) {
      dispatch(dropTodoAction(status, currentTodo))
    }
  }

  function openModal() {
    dispatch(setCurrentAction(null))
    createModalChange()
  }

  useEffect(() => {
    const queues = []
    const developments = []
    const dones = []

    todos.forEach((todo) => {
      switch (todo.status) {
        case 'queue':
          queues.push(todo)
          break
        case 'development':
          developments.push(todo)
          break
        case 'done':
          dones.push(todo)
          break
        default:
          break
      }
    })

    setBoards([
      {
        id: 0,
        title: 'Очередь',
        status: 'queue',
        todos: queues,
      },
      {
        id: 1,
        title: 'Разработка',
        status: 'development',
        todos: developments,
      },
      {
        id: 2,
        title: 'Сделано',
        status: 'done',
        todos: dones,
      },
    ])
  }, [todos])

  return (
    <div className="project__todos todos">
      {boards.map((board) => (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropHandler(e, board.status)}
          className={`todos__wrapper todos__${board.status} ${board.status}`}
          key={board.id}
        >
          <h3 className="todos__title">{board.title}</h3>
          {board.status === 'queue' && (
            <button className="todos__new_button" onClick={openModal}></button>
          )}
          <ul className="todos__list">
            {board.todos.map((todo) => (
              <Todo
                todo={todo}
                key={todo.id}
                dropHandler={dropHandler}
                status={board.status}
                infoModalToggle={infoModalChange}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Todos
