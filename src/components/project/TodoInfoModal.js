import { useEffect, useState } from 'react'
import Comments from './Comments'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeSubtaskAction,
  deleteTodoAction,
  sendCommentAction,
} from '../../redux/actions'
import DateComponent from './DateComponent'

function TodoInfoModal({ info, infoModalChange, createModalChange }) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments)
  const [currentId, setCurrentId] = useState(`${info.id}`)
  const [answerAuthor, setAnswerAuthor] = useState('')
  const [currentComments, setCurrentComments] = useState([])
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    setCurrentComments([
      ...comments.filter((comment) => {
        const ids = comment.id.split(':')
        return ids[0] === info.id
      }),
    ])
  }, [comments, info])

  useEffect(() => {
    if (currentId !== info.id)
      setAnswerAuthor(comments.find((com) => com.id === currentId).author)
  }, [currentId, comments, info])

  function editToggle() {
    createModalChange(info)
    infoModalChange()
  }

  function sendComment(e) {
    e.preventDefault()

    const newComment = {
      currentId,
      author,
      text,
    }
    dispatch(sendCommentAction(newComment))
    setCurrentId(info.id)
    setText('')
    setAuthor('')
  }

  function changeSubtask(taskId) {
    dispatch(changeSubtaskAction(info.id, taskId))
  }

  function deleteTodo() {
    const commentsIds = currentComments.reduce(
      (prev, cur) => [...prev, cur.id],
      []
    )
    dispatch(deleteTodoAction(info.id, commentsIds))
    infoModalChange()
  }

  return (
    <div className="info">
      <div className="info__background" onClick={infoModalChange}></div>
      <div className="info__wrapper">
        <div className="info__header">
          <div className="info__buttons">
            <button className="info__edit" onClick={editToggle}>
              edit
            </button>
            <button className="info__delete" onClick={deleteTodo}>
              delete
            </button>
          </div>
          <p className="info__title">
            {info.title} <span className="info__number">#{info.id}</span>
          </p>
          <DateComponent
            creatingData={info.createdTime}
            startData={info.startedTime}
            doneData={info.doneTime}
            status={info.status}
          />
        </div>
        <p className="info__description">{info.description}</p>

        <div className=" info__subtasks">
          <p>Подзадачи:</p>
          {info.subtasks.length !== 0 ? (
            <ul className="info__list">
              {info.subtasks.map((task) => (
                <li
                  onClick={() => changeSubtask(task.value)}
                  className={`info__subtask ${task.done && 'done'}`}
                  key={task.value}
                >
                  {task.value}
                </li>
              ))}
            </ul>
          ) : (
            <p>Пока нет подзадач</p>
          )}
        </div>

        <div className="info__comments comments">
          <p>Комментарии:</p>
          {currentComments?.length !== 0 ? (
            <Comments data={currentComments} setCurrentId={setCurrentId} />
          ) : (
            <p>Комменатриев пока нет</p>
          )}
          <form className="comments__form" onSubmit={sendComment}>
            {currentId !== info.id && (
              <div className="comments__answer">
                Ответить: {answerAuthor}
                <button
                  className="comments__button"
                  type="button"
                  onClick={() => setCurrentId(info.id)}
                ></button>
              </div>
            )}
            <label>
              Автор:
              <input
                type="text"
                className="comments__input"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
            <label>Комментарий: </label>
            <input
              type="text"
              className="comments__input"
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
            <button className="comments__submit">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TodoInfoModal
