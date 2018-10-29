import createReducer from "../../library/createReducer";

const SOME_EVENT = "/home/event";

const initialState = {
};

export default createReducer(initialState, {

});

export function triggerEvent(eventPayload) {
	return {
		type: SOME_EVENT,
		payload: eventPayload
	};
}
