export default function loginState(state = false, action) {
  switch (action.type) {
    case 'LOGIN_STATE':
      return action.payload
    default:
      return state
  }
}
