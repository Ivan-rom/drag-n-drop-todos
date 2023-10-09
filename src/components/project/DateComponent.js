import { useEffect, useState } from 'react'

function DateComponent({
  creatingData,
  startData = null,
  doneData = null,
  status,
}) {
  const [startDate, setStartDate] = useState(null)
  const [doneDate, setDoneDate] = useState(null)
  const creatingDate = new Date(creatingData)

  useEffect(() => {
    let date
    switch (status) {
      case 'development':
        date = new Date(startData)
        setStartDate(date)
        break
      case 'done':
        date = new Date(doneData)
        setDoneDate(date)
        date = new Date(startData)
        setStartDate(date)
        break

      default:
        break
    }
  }, [startData, doneData, status])

  return (
    <div className="info__date date">
      <div className="date__createing">
        Чоздали:{' '}
        <span className="date__day">{creatingDate.toLocaleDateString()} </span>
        <span className="date__day">{creatingDate.toLocaleTimeString()}</span>
      </div>
      {startDate !== null && (
        <div className="date__createing">
          Выполняют с:{' '}
          <span className="date__day">{startDate.toLocaleDateString()} </span>
          <span className="date__day">{startDate.toLocaleTimeString()}</span>
        </div>
      )}
      {doneDate !== null && (
        <div className="date__createing">
          Завершили:{' '}
          <span className="date__day">{doneDate.toLocaleDateString()} </span>
          <span className="date__day">{doneDate.toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  )
}

export default DateComponent
