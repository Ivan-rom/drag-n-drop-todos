import { useEffect, useState } from 'react'
import Header from './Header'
import CreateModal from './CreateModal'
import { useDispatch, useSelector } from 'react-redux'
import { initTableAction } from '../../redux/actions'
import Todos from './Todos'
import TodoInfoModal from './TodoInfoModal'
import { useParams } from 'react-router-dom'

function Project() {
  const { id } = useParams()

  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const currentTodo = useSelector((state) => state.currentTodo)

  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isInfoModal, setIsInfoModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const [filter, setFilter] = useState('')
  const [filteredTodos, setFilteredTodos] = useState([...todos])

  useEffect(() => {
    dispatch(initTableAction(id))
  }, [dispatch, id])

  useEffect(() => {
    setFilteredTodos(
      todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(filter.toLowerCase()) ||
          todo.description.toLowerCase().includes(filter.toLowerCase()) ||
          todo.id === filter
      )
    )
  }, [todos, filter])

  function createModalToggle(todo) {
    if (todo) {
      setEditingTodo(todo)
    } else {
      setEditingTodo(null)
    }
    setIsCreateModal((prev) => !prev)
  }

  function infoModalToggle() {
    setIsInfoModal((prev) => !prev)
  }

  return (
    <div className="project">
      <Header filter={filter} setFilter={setFilter} projectId={id} />
      <Todos
        todos={filteredTodos}
        createModalChange={createModalToggle}
        infoModalChange={infoModalToggle}
      />
      {isCreateModal && (
        <CreateModal
          createModalChange={createModalToggle}
          todo={editingTodo}
          newId={+todos[todos.length - 1]?.id + 1 || 1}
        />
      )}
      {isInfoModal && (
        <TodoInfoModal
          info={currentTodo}
          infoModalChange={infoModalToggle}
          createModalChange={createModalToggle}
        />
      )}
    </div>
  )
}

export default Project
