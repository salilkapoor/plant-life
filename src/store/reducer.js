export default (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        uid: action.payload.uid
      }

    case 'LOGIN_PERSIST':
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        uid: action.payload.uid
      }

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        uid: action.payload.uid
      }
    case 'ERROR_MESSAGES':
      return {
        ...state,
        alert: action.payload.alert
      }
    default:
      return state
  }
}
