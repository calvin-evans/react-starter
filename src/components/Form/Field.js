import React, { Children, useRef, useState, cloneElement } from 'react'
import classNames from 'classnames'
import uniqueId from 'lodash/uniqueId'
import propTypes from 'prop-types'
import uniq from 'lodash/uniq'
import { FiAlertCircle } from 'react-icons/fi'

import styles from './Form.module.scss'
import Validator from './validator'
import Label from '../Label'

const rootClasses = warnings => classNames(
  styles.field,
  { [styles.invalid]: warnings.length > 0 }
)

const childClasses = warnings => classNames(
  { [styles.invalidInput]: warnings.length > 0 }
)

const augmentFieldInput = ({ child, warnings, childRef, uuid, setWarnings, validate, otherProps }) => cloneElement(child, {
  ref: childRef,
  id: uuid,
  className: [
    childClasses(warnings),
    child.props.className
  ].join(' '),
  onBlur(e) {
    setWarnings(validate(e.target.value))
    if (child.props.onBlur) {
      return child.props.onBlur(e)
    }
  },
  ...otherProps
})

const Field = ({
  validations,
  children,
  required,
  label,
  thisRef,
  className,
  ...otherProps
}) => {
  Children.only(children)
  if (!children.props.name) throw new Error('Field children require a name prop')

  if (required && !validations.includes('required')) {
    validations = validations.concat('required')
  }

  // init refs & state
  const childRef = useRef()
  const [warnings, setWarnings] = useState([])
  const validate = new Validator(validations)
  const uuid = uniqueId(children.props.name + '_')

  // create augmented child
  const child = augmentFieldInput({
    warnings,
    childRef,
    uuid,
    setWarnings,
    validate,
    otherProps,
    child: children
  })

  // create validation method ref
  const validateChild = () => validate((childRef.current && childRef.current.value) || '')
  if (thisRef) {
    thisRef.current = silent => {
      const w = validateChild()
      if (!silent) {
        setWarnings(w)
      }
      return w
    }
  }

  return (
    <div className={[rootClasses(warnings), className].join(' ')}>
      {label && <Label htmlFor={uuid}>{label}</Label>}
      {child}
      {warnings && uniq(warnings).map(warning => (
        <div className={styles.warning} key={warning} >
          <FiAlertCircle /> {warning}
        </div>
      ))}
    </div>
  )
}

Field.displayName = 'Field'

Field.defaultProps = {
  validations: []
}

Field.propTypes = {
  /** 1 child only, should be a for element, (input, select, checkbox, radio) */
  children: propTypes.node.isRequired,
  /** same as defaultValue prop for inputs, apply here instead */
  defaultValue: propTypes.string,
  /** controls value of field/input */
  value: propTypes.string
}

export default Field
