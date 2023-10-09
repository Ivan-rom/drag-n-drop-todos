import { useEffect, useState } from 'react'

function Comments({ data, inner = false, setCurrentId, index = 1 }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    data.forEach((comment) => {
      const ids = comment.id.split(':').slice(index)
      if (ids.length === 1) {
        setComments((prev) => [...prev, { ...comment, replies: [] }])
      } else {
        setComments((prev) => {
          prev[ids[0]].replies.push(comment)
          return [...prev]
        })
      }
    })
  }, [data, index])

  return (
    <ul className={`comments__list${inner ? '-inner' : ''}`}>
      {comments.map((comment) => (
        <li className="comments__comment" key={comment.id}>
          <p className="comments__author">{comment.author}</p>
          <p className="comments__text">{comment.text}</p>
          <button
            className="comments__button"
            onClick={() => setCurrentId(comment.id)}
          >
            Ответить
          </button>
          {comment?.replies.length !== 0 && (
            <Comments
              data={comment.replies}
              inner={true}
              setCurrentId={setCurrentId}
              index={index + 1}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default Comments
