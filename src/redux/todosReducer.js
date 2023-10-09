import { LocalStorageClient } from '../shared/LocalStorageClient'
import { initialState } from './initialState'
import {
  CHANGE_SUBTASK,
  CHANGE_TITLE,
  CREATE_TODO,
  DELETE_TODO,
  DROP_TODO,
  INIT_TABLE,
  SEND_COMMENT,
  SET_CURRENT,
  UPDATE_TODO,
} from './types'

let local
let newState
export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      newState = {
        ...state,
        todos: [...state.todos, action.data],
      }
      local.save(newState)
      return newState

    case UPDATE_TODO:
      state.todos.forEach((todo) => {
        if (todo.id === action.data.id) {
          const from = JSON.stringify(todo)
          const to = JSON.stringify(action.data)
          if (from === to) return state
        }
      })
      newState = {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== action.data.id),
          action.data,
        ],
      }
      local.save(newState)
      return newState

    case INIT_TABLE:
      local = new LocalStorageClient(action.data)
      const data = local.get()
      return { ...state, ...data }

    case DROP_TODO:
      const prev = state.todos.filter((todo) => todo.id !== action.data.todo.id)
      const changedTodo = { ...action.data.todo, status: action.data.status }
      if (action.data.status === 'development') {
        changedTodo.startedTime = Date.now()
      } else if (action.data.status === 'done') {
        changedTodo.doneTime = Date.now()
      }
      newState = {
        ...state,
        todos: [...prev, changedTodo].sort((a, b) => a.id - b.id),
      }
      local.save(newState)
      return newState

    case SET_CURRENT:
      return { ...state, currentTodo: action.data }

    case SEND_COMMENT:
      let newId = 0
      const comments = state.comments
        .filter(
          (com) => com.id.split(':')[0] === action.data.currentId.split(':')[0]
        )
        .filter(
          (com) =>
            com.id.split(':').length ===
            action.data.currentId.split(':').length + 1
        )
      if (comments.length !== 0) {
        const lastIds = comments[comments.length - 1].id.split(':')
        newId = +lastIds[lastIds.length - 1] + 1
      }
      const newComment = {
        id: action.data.currentId + ':' + newId,
        author: action.data.author,
        text: action.data.text,
      }
      newState = {
        ...state,
        comments: [...state.comments, newComment],
      }
      local.save(newState)
      return newState

    case CHANGE_SUBTASK:
      console.log(action.data)
      const todo = state.todos.find((todo) => todo.id === action.data.todoId)
      const newSubtasks = todo.subtasks.map((task) => {
        if (task.value === action.data.taskId) {
          task.done = !task.done
        }
        return task
      })

      const newTodo = { ...todo, subtasks: [...newSubtasks] }
      newState = {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== newTodo.id),
          newTodo,
        ],
      }
      local.save(newState)
      return newState

    case CHANGE_TITLE:
      newState = { ...state, title: action.data }
      local.save(newState)
      return newState

    case DELETE_TODO:
      const newComments = state.comments.filter((comment) => {
        return action.data.comments.find((com) => com === comment.id)
          ? false
          : true
      })
      newState = {
        ...state,
        currentTodo: null,
        todos: state.todos.filter((todo) => todo.id !== action.data.id),
        comments: newComments,
      }
      local.save(newState)
      return newState

    default:
      return state
  }
}
