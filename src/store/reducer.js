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

    case 'PLANT_SELECTED':
      return {
        ...state,
        plantSelected: {
          id: action.payload.plantId,
          commonName: action.payload.commonName,
          humidity: action.payload.humidity,
          maxTemp: action.payload.maxTemp,
          minTemp: action.payload.minTemp,
          moisture: action.payload.moisture,
          deviceId: action.payload.deviceId
        }
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
