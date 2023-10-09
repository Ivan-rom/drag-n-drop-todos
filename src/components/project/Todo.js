import { useDispatch } from 'react-redux'
import { setCurrentAction } from '../../redux/actions'

function Todo({ todo, dropHandler, status, infoModalToggle }) {
  const dispatch = useDispatch()

  return (
    <li
      key={todo.id}
      className={`todo ${todo.priority}`}
      draggable
      onDrop={(e) => dropHandler(e, status, todo)}
      onMouseDown={() => dispatch(setCurrentAction(todo))}
      onClick={() => infoModalToggle()}
    >
      <div className="todo__header">
        <p className="todo__title">
          {todo.title} <span className="todo__number">#{todo.id}</span>
        </p>
      </div>
      <p className="todo__description">{todo.description}</p>
    </li>
  )
}

export default Todo
