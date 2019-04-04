import { connect } from 'react-redux'
import { REMOVE_MESSAGE } from '../ducks/messages'
import { Toast } from 'ans-base-ui'

const mapStateToProps = state => {
  return {
    messages: Object.values(state.messages.byId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: id => dispatch(REMOVE_MESSAGE({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
