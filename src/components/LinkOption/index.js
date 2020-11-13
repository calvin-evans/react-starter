import React from 'react'
import styles from './LinkOption.module.scss'
import PropTypes from 'prop-types'

const LinkOption = ({
  title,
  text,
  url,
  icon,
  className,
  ...otherProps
}) => {
  return (
    <a href={url} {...otherProps} className={[className, styles.root].join(' ')}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.text}>{text}</p>
      </div>
    </a>
  )
}

LinkOption.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default LinkOption
