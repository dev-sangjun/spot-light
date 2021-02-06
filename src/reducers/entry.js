export const SET_ENTRY = "SET_CUR_ENTRY";

export const setEntry = entry => ({
  type: SET_ENTRY,
  entry,
});

export const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY:
      return action.entry;
    default:
      return state;
  }
};

export default reducer;
