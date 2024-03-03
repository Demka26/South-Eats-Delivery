let defaultState = {
  restaurant: null,
};

let authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_RESTAURANT": {
      let newState = { ...state };
      newState.restaurant = action.payload.restaurant;
      return newState;
    }

    case "LOGOUT_RESTAURANT": {
      let newState = { ...state };
      newState.restaurant = null;
      return newState;
    }

    default:
      return state;
  }
};

export default authReducer;