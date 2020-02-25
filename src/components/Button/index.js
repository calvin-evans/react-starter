import styles from './Button.module.scss'
import classNames from 'classnames'
import * as icons from 'react-icons/fi'
import React from 'react'
import propTypes from 'prop-types'

const allowedIcons = Object.keys(icons).map(icon => icon.substr(2))

const Button = ({ children, className, icon, size, circle, outline, secondary, loading, inline, green, red, ...otherProps }) => {
  const classes = classNames(
    styles.root,
    { [styles.inline]: inline },
    { [styles.loading]: !!loading },
    { [styles.iconOnly]: !children },
    { [styles.small]: size === 'small' },
    { [styles.large]: size === 'large' },
    { [styles.xlarge]: size === 'xlarge' },
    { [styles.secondary]: !!secondary },
    { [styles.circle]: !!circle },
    { [styles.green]: !!green },
    { [styles.red]: !!red },
    { [styles.outline]: !!outline }
  )
  const Icon = icon && (
    typeof icon === 'string'
      ? icons[`Fi${icon}`]
      : icon
  )
  return (
    <button type="button" {...otherProps} className={[classes, className].join(' ')}>
      {loading && (
        <div className={styles.loadingOverlay} />
      )}
      {Icon && <Icon />}
      {children}
    </button>
  )
}

Button.propTypes = {
  /** Whether to show an icon - see https://goo.gl/3wa4RG (ignore Fi prefix) */
  icon: propTypes.oneOfType([
    propTypes.oneOf(allowedIcons),
    propTypes.func
  ]),
  /** Sets display to inline-block */
  inline: propTypes.bool,
  /** The size of the button */
  size: propTypes.oneOf(['small', 'default', 'large', 'xlarge']),
  /** Whether to use the secondary style */
  secondary: propTypes.bool,
  /** Whether to use the outline style */
  outline: propTypes.bool,
  /** Whether to mask the button with a loading indicator */
  loading: propTypes.bool
}

export default Button
