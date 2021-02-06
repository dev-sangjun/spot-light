import { combineReducers } from "redux";
import user from "./user";
import day from "./day";
import entry from "./entry";
import modal from "./modal";
import sidebar from "./sidebar";
export default combineReducers({ user, day, entry, modal, sidebar });
