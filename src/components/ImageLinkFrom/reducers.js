import {CHANGE_INPUT_FIELD} from "../../constants";

const initialStateSearch = {
	inputField: ''
}
// Actions are just objects that we are returning

export const searchImage = (state = initialStateSearch, action = {}) =>
{
	// If we receive any actions related to searchImage, we act upon the state
	switch (action.type)
	{
		case CHANGE_INPUT_FIELD:
			return Object.assign({}, state, {inputField: action.payload})
		default:
			return state;
	}
}
