import * as types from "../actionTypes/atlassianAPIActionTypes";

const initState = {
    loading: false,
    jqlIssues: null,
    boards: null,
    sprints: null,
    selectedSprintID: null,
    error: null
}

export default function atlassianAPIReducer(state=initState, action) {
    switch(action.type) {
        case types.ATLASSIAN_API_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.GET_BOARDS_OK:
            return {
                ...state,
                loading: false,
                boards: action.data.data
            }
        case types.GET_BOARDS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        case types.SET_SPRINT_ID:
            return {
                ...state,
                selectedSprintID: action.data
            }
        case types.GET_SPRINTS_OK:
            return {
                ...state,
                loading: false,
                sprints: action.data.data.slice(10, action.data.data.length).reverse()
            }
        case types.GET_SPRINTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        case types.GET_JQL_OK:
            return {
                ...state,
                loading: false,
                jqlIssues: action.data.data
            }
        case types.GET_JQL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        default:
            return state;
    }
}