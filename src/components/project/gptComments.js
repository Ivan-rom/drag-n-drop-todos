import React, { useState } from 'react'

// Простой компонент для отображения комментария
function Comment({ comment, onReply }) {
  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={() => onReply(comment.id)}>Ответить</button>
    </div>
  )
}

// Компонент для списка комментариев, рекурсивно вызывающий себя для вложенных комментариев
function CommentList({ comments, onReply }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} onReply={onReply} />
          {comment.replies && comment.replies.length > 0 && (
            <CommentList comments={comment.replies} onReply={onReply} />
          )}
        </div>
      ))}
    </div>
  )
}

// Компонент для создания новых комментариев
function CommentForm({ onSubmit }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите комментарий..."
      />
      <button type="submit">Отправить</button>
    </form>
  )
}

// Основной компонент, объединяющий все компоненты
function CommentApp() {
  const [comments, setComments] = useState([])

  const addComment = (text, parentCommentId) => {
    const newComment = {
      id: comments.length + 1,
      text,
      replies: [],
    }

    if (parentCommentId) {
      const parentComment = comments.find(
        (comment) => comment.id === parentCommentId
      )
      parentComment.replies.push(newComment)
      setComments([...comments])
    } else {
      setComments([...comments, newComment])
    }
  }

  return (
    <div>
      <h1>Система каскадных комментариев</h1>
      <CommentForm onSubmit={addComment} />
      <CommentList
        comments={comments}
        onReply={(commentId) => addComment('', commentId)}
      />
    </div>
  )
}

export default CommentApp
