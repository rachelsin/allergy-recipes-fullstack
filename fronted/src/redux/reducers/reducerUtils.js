
function convertActionTypeToName(actionType) {
    return actionType.toLowerCase().replace(/_(\w)/g, v => v[1].toUpperCase());
}


// { type: "SET_USE_NAME", Ppayload: payloud }
export default function createReducer(state, action, handlers) {
    const key = convertActionTypeToName(action.type);
    const handler = handlers[key];
    if (handler) {
        handler(state, action);
    }
}
