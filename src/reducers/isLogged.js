const initialState = {
  logged: false
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, logged: !state.logged };

    default:
      return { ...state };
  }
};
export default loggedReducer;
