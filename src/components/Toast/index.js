import React, { useEffect } from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import styles from './Toast.module.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const messageSchema = propTypes.shape({
  status: propTypes.oneOf(['success', 'warning', 'error']),
  title: propTypes.string,
  text: propTypes.string
})

const Toast = ({ message }) => {
  const { status, title, text } = message
  const classes = classNames(
    styles.toastRoot,
    { [styles.success]: status === 'success' },
    { [styles.warning]: status === 'warning' },
    { [styles.error]: status === 'error' }
  )
  return (
    <div className={classes}>
      <h6 className={styles.title}>{title}</h6>
      {text && <p className={styles.text}>
        {text}
      </p>}
    </div>
  )
}

Toast.propTypes = {
  message: messageSchema
}

const ToastContainer = ({ position, messages, remove, duration }) => {
  const queue = []

  useEffect(() => {
    const removeItem = id => () => {
      remove(id)
      const index = queue.indexOf(id)
      if (index > -1) {
        queue.splice(index, 1)
      }
    }
    const addToQueue = ({ id }) => {
      if (remove && !queue[id]) {
        queue.push(id)
        setTimeout(removeItem(id), duration)
      }
    }
    messages.forEach(addToQueue)
  }, [messages, duration, queue, remove])

  const classes = classNames(
    styles.root,
    { [styles.topLeft]: position === 'topLeft' },
    { [styles.topRight]: position === 'topRight' },
    { [styles.topCenter]: position === 'topCenter' },
    { [styles.bottomLeft]: position === 'bottomLeft' },
    { [styles.bottomRight]: position === 'bottomRight' },
    { [styles.bottomCenter]: position === 'bottomCenter' }
  )
  return (
    <TransitionGroup className={classes}>
      {messages.map((message, i) => (
        <CSSTransition key={i} timeout={300} classNames={styles}>
          <Toast message={message} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

ToastContainer.defaultProps = {
  position: 'bottomRight',
  duration: 4000,
  messages: []
}

ToastContainer.propTypes = {
  position: propTypes.oneOf(['topLeft', 'topRight', 'topCenter', 'bottomRight', 'bottomLeft', 'bottomCenter']),
  duration: propTypes.number,
  messages: propTypes.arrayOf(messageSchema),
  remove: propTypes.func
}

export default ToastContainer
