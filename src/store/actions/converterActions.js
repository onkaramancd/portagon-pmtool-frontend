import axios from "axios";
import * as types from "../actionTypes/controllerActionTypes";
import * as endpoints from "../../endpoints";
import {actionResponse} from "./atlassianAPIActions";

export function requestMarkdownConversion(data) {
    return (dispatch, getState) => {
        dispatch(actionResponse(types.CONTROLLER_LOADING, null));
        axios
            .post(endpoints.BACKEND_URL + "/convert/md", data)
            .then(res => {
                if (res.data.success) {
                    dispatch(actionResponse(types.GET_MARKDOWN_OK, res.data));
                } else {
                    dispatch(actionResponse(types.GET_MARKDOWN_ERROR, res.data));
                }
            })
            .catch(err => {
                dispatch(actionResponse(types.GET_MARKDOWN_ERROR,
                    "Server problem on getting converter response."));
                console.log(err);
            })
    }
}