import styles from './Input.module.scss'
import classNames from 'classnames'
import * as icons from 'react-icons/fi'
import React, { forwardRef, useEffect } from 'react'
import propTypes from 'prop-types'

const allowedIcons = Object.keys(icons).map(icon => icon.substr(2))

const Input = forwardRef(({ className, icon, type, tabBefore, tabAfter, value, style, defaultValue, loading, inline, innerRef, ...otherProps }, ref) => {
  const Icon = icon && icons[`Fi${icon}`]
  const classes = classNames(
    styles.root,
    { [styles.inline]: inline },
    { [styles.loading]: loading },
    { [styles.inputWithIcon]: !!icon }
  )
  useEffect(() => {
    if (ref) {
      ref.current.style.height = ''
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  })
  return (
    <div className={`${classes} ${className || ''}`} style={style}>
      {Icon && <Icon />}
      {tabBefore && (
        <div className={styles.tabBefore}>{tabBefore}</div>
      )}
	  {type !== 'textarea'
	    ? <input {...otherProps} type={type} value={value} defaultValue={defaultValue} ref={ref} />
        : <textarea {...otherProps} type={type} value={value} defaultValue={defaultValue} ref={ref} />
	  }
      {tabAfter && (
        <div className={styles.tabAfter}>{tabAfter}</div>
      )}
      {loading && <div className={styles.loadingIcon} /> }
    </div>
  )
})

Input.defaultProps = {
  type: 'text',
  format: {}
}

Input.propTypes = {
  /** The input type (must be text-based, not submit, checkbox etc) */
  type: propTypes.oneOf(['text', 'textarea', 'tel', 'email', 'password', 'color', 'number', 'search', 'url', 'time']),
  /** Whether to show an icon - see https://goo.gl/3wa4RG (ignore Fi prefix) */
  icon: propTypes.oneOf(allowedIcons),
  /** Sets display to inline-block */
  inline: propTypes.bool,
  /** Content to be displayed before the input */
  tabBefore: propTypes.oneOfType([propTypes.node, propTypes.string]),
  /** Content to be displayed after the input */
  tabAfter: propTypes.oneOfType([propTypes.node, propTypes.string]),
  /** Whether to show a loading spinner */
  loading: propTypes.bool
}

// eslint-disable-next-line
export default Input
