export const SET_INDEX = "SET_INDEX";

export const setIndex = index => ({
  type: SET_INDEX,
  index,
});

export const initialState = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INDEX:
      return action.index;
    default:
      return state;
  }
};

export default reducer;
