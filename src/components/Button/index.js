import classNames from 'classnames'
import React from 'react'
import styles from './Button.module.scss'
import PropTypes from 'prop-types'

const Button = ({
  children,
  className,
  size,
  circle,
  secondary,
  loading,
  disabled,
  inline,
  success,
  error,
  ...otherProps
}) => {
  const classes = classNames(
    styles.root,
    { [styles.inline]: inline },
    { [styles.loading]: !!loading },
    { [styles.small]: size === 'small' },
    { [styles.large]: size === 'large' },
    { [styles.secondary]: !!secondary },
    { [styles.circle]: !!circle },
    { [styles.success]: !!success },
    { [styles.error]: !!error }
  )
  return (
    <button type='button' {...otherProps} disabled={loading || disabled} className={[classes, className].join(' ')}>
      {loading && (
        <div className={styles.loadingOverlay} />
      )}
      {children}
    </button>
  )
}
Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  circle: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  /** Sets display to inline-block */
  inline: PropTypes.bool,
  /** The size of the button */
  size: PropTypes.oneOf(['small', 'large']),
  /** Whether to use the secondary style */
  secondary: PropTypes.bool,
  /** Whether to use the outline style */
  outline: PropTypes.bool,
  /** Whether to mask the button with a loading indicator */
  loading: PropTypes.bool
}

export default Button
