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

export function createTodoAction(todo) {
  return {
    type: CREATE_TODO,
    data: todo,
  }
}

export function initTableAction(id) {
  return {
    type: INIT_TABLE,
    data: id,
  }
}
export function setCurrentAction(todo) {
  return {
    type: SET_CURRENT,
    data: todo,
  }
}

export function updateTodoAction(todo) {
  return {
    type: UPDATE_TODO,
    data: todo,
  }
}
export function sendCommentAction(data) {
  return {
    type: SEND_COMMENT,
    data,
  }
}

export function dropTodoAction(status, todo) {
  return {
    type: DROP_TODO,
    data: {
      status,
      todo,
    },
  }
}

export function changeSubtaskAction(todoId, taskId) {
  return {
    type: CHANGE_SUBTASK,
    data: {
      todoId,
      taskId,
    },
  }
}

export function changeTitleAction(data) {
  return {
    type: CHANGE_TITLE,
    data,
  }
}

export function deleteTodoAction(id, comments) {
  return {
    type: DELETE_TODO,
    data: {
      id,
      comments,
    },
  }
}
