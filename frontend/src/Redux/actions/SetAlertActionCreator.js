import { v4 as uuidv4 } from 'uuid';
import { SetAlertAction, RemoveAlertAction } from "./actions"


export const SetAlertActionCreator = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuidv4();
  dispatch(SetAlertAction({ msg, alertType, id }))

  setTimeout(() => dispatch(RemoveAlertAction(id)), timeout);
};