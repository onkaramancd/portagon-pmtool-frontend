import * as types from "../actionTypes/controllerActionTypes";

const initState = {
    loading: false,
    markdownFileURL: null
}

export default function converterReducer(state = initState, action) {
    switch(action.type) {
        case types.CONTROLLER_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.GET_MARKDOWN_OK:
            return {
                ...state,
                loading: false,
                markdownFileURL: action.data.fileURL
            }
        case types.GET_MARKDOWN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        default:
            return state;
    }
}