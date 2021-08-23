import React from "react";
import {connect} from "react-redux";
import "../styles/sprintPicker.css";
import {
    requestAllBoards,
    requestAllSprints,
    requestJQL,
    requestSetSprintID
} from "../store/actions/atlassianAPIActions";

class SprintPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBoardId: null
        };
    }

    getBoards() {
        this.props.dispatchGetBoards();
    }

    boardSelectOnChange(e) {
        this.setState({selectedBoardId: e.target.value});
        this.props.dispatchGetSprints(e.target.value);
    }

    sprintSelectOnChange(e) {
        if (e) {
            this.props.dispatchSetSprintID(e.target.value);

            this.props.dispatchGetJQL({
                "jql": `Sprint = ${e.target.value} AND status=done order by type`
            });
        }
    }

    renderSprints() {
        if (this.props.sprints) {
            let selects = [<option value={null}>---</option>];
            for (let i = 0; i < this.props.sprints.length; i += 1) {
                selects.push(
                    <option value={this.props.sprints[i].id}>{this.props.sprints[i].name}</option>
                );
            }

            return (<div>
                <p className={"step-descr"}>02. Select sprint</p>
                <select
                    name="sprintSelect"
                    id="sprint-select"
                    onChange={e => this.sprintSelectOnChange(e)}>
                    {selects}
                </select>
            </div>);
        }
    }

    renderBoards() {
        if (!this.props.boards) {
            return (<p id={"link"} onClick={() => this.getBoards()}>Get data from Jira</p>);
        }

        let selects = [<option value={null}>---</option>];
        for (let i = 0; i < this.props.boards.length; i += 1) {
            selects.push(
                <option value={this.props.boards[i].id}>{this.props.boards[i].name}</option>
            );
        }

        return (<select
                name="boardSelect"
                id="board-select"
                onChange={e => this.boardSelectOnChange(e)}>
                {selects}
            </select>
        );
    }

    render() {
        return (
            <div id={"sprint-picker-container"}>
                <p id={"header"}>Sprint picker</p>
                <p>Define from which sprint to pull the relevant data from.</p>
                <p className={"step-descr"}>01. Pull boards</p>
                {this.renderBoards()}
                {this.renderSprints()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.atlassianAPIReducer.boards,
        sprints: state.atlassianAPIReducer.sprints,
        jqlIssues: state.atlassianAPIReducer.jqlIssues
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchGetBoards: () => {
            dispatch(requestAllBoards());
        },
        dispatchGetSprints: param => {
            dispatch(requestAllSprints(param));
        },
        dispatchGetJQL: param => {
            dispatch(requestJQL(param));
        },
        dispatchSetSprintID: param => {
            dispatch(requestSetSprintID(param))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SprintPicker);