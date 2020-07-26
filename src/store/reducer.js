export default (state, action) => {
  
  switch(action.type) {
    case 'INITIALIZE_LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        enterpriseId: action.payload.enterpriseId,
        role: action.payload.role,
        name: action.payload.name,
        contact: action.payload.contact,
        branchName: action.payload.branchName
      }

    case 'LOGIN_PERSIST':
        return {
          ...state,
          isLogin: action.payload.isLogin,
          token: action.payload.token,
          enterpriseId: action.payload.enterpriseId,
          role: action.payload.role,
          name: action.payload.name,
          contact: action.payload.contact,
          branchName: action.payload.branchName
        }

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        enterpriseId: action.payload.enterpriseId,
        role: action.payload.role,
        name: action.payload.name,
        contact: action.payload.contact
      }
      case 'CONTACT_TRACING':
        return {
          ...state,
          contactTracingEmployees:action.payload.contactTracingEmployees
        }
        case 'ERROR_MESSAGES':
          return {
            ...state,
            alert:action.payload.alert
          }
    default:
      return state
  }
}