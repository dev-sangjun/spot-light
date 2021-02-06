import { utils } from "react-modern-calendar-datepicker";
export const SET_ENTRY_DAY = "SET_ENTRY_DAY";

export const setEntryDay = day => ({
  type: SET_ENTRY_DAY,
  day,
});

export const initialState = utils().getToday();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY_DAY:
      return action.day;
    default:
      return state;
  }
};

export default reducer;
