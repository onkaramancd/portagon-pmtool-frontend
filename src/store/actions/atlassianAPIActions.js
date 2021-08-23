import axios from "axios";
import * as types from "../actionTypes/atlassianAPIActionTypes";
import * as endpoints from "../../endpoints"

export function requestAllBoards() {
    return (dispatch, getState) => {
        dispatch(actionResponse(types.ATLASSIAN_API_LOADING, null));
        axios
            .get(endpoints.BACKEND_URL + "/jira/boards", {})
            .then(res => {
                dispatch(actionResponse(types.GET_BOARDS_OK, res.data));
            })
            .catch(err => {
                dispatch(actionResponse(types.GET_BOARDS_ERROR,
                    "Problem getting boards from backend."));
            });
    }
}

export function requestAllSprints(param) {
    return (dispatch, getState) => {
        dispatch(actionResponse(types.ATLASSIAN_API_LOADING, null));
        axios
            .get(endpoints.BACKEND_URL + "/jira/sprints?boardId=" + param, {})
            .then(res => {
                dispatch(actionResponse(types.GET_SPRINTS_OK, res.data));
            })
            .catch(err => {
                dispatch(actionResponse(types.GET_SPRINTS_ERROR,
                    "Problem getting sprints from backend."));
            });
    }
}

export function requestJQL(data, callback) {
    return (dispatch, getState) => {
        dispatch(actionResponse(types.ATLASSIAN_API_LOADING, null));

        axios
            .post(endpoints.BACKEND_URL + "/jira/jql", data)
            .then(res => {
                if (res.data.success) {
                    dispatch(actionResponse(types.GET_JQL_OK, res.data));
                    if (callback) callback();
                } else {
                    dispatch(actionResponse(types.GET_JQL_ERROR, res.data));
                }
            })
            .catch(err => {
                dispatch(actionResponse(types.GET_JQL_ERROR, "Server problem on getting JQL response."));
                console.log(err);
            })
    };
}

export function requestSetSprintID(data) {
    return (dispatch, getState) => {
        dispatch(actionResponse(types.SET_SPRINT_ID, data));
    }
}


export function actionResponse(type, response) {
    return {
        type: type,
        data: response
    }
}