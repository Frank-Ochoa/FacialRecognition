import {CHANGE_INPUT_FIELD} from "../../constants";

export const setInputField = (text) =>
	({
		type: CHANGE_INPUT_FIELD,
		payload: text
	})

// Only want to set the imageURL, once the button has been clicked, but want to set it from w/e the input field is