export const SET_USER = "SET_USER";

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
