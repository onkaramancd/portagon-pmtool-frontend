import React from "react";
import ReactDOMServer from 'react-dom/server';
import {connect} from "react-redux";
import SprintPicker from "../SprintPicker";
import "../../styles/pages/releaseNotes.scss";
import UserButton from "../inputs/UserButton";
import {requestMarkdownConversion} from "../../store/actions/converterActions";
import * as endpoints from "../../endpoints";
const FileSaver = require('file-saver');

class ReleaseNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideNoNotes: false,
            innerHeightLowerPadding: 188,
            selectedReleaseNotes: []
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.markdownFileURL) {
            let url = endpoints.BACKEND_URL + "/" + this.props.markdownFileURL;
            let spl = this.props.markdownFileURL.split("/");
            FileSaver.saveAs(url, spl[spl.length-1]);
        }
    }

    hideNoNotesOnChange(e) {
        this.setState({hideNoNotes: !this.state.hideNoNotes});
    }

    onSelectReleaseNote(e) {
        console.log(e);
        let selects = this.state.selectedReleaseNotes;
        let index = this.state.selectedReleaseNotes.indexOf(e)

        if (index > -1) {
            selects.splice(index, 1);
        } else selects.push(e);

        this.setState({selectedReleaseNotes: selects});
    }

    renderMarkDown() {
        let notes = [];

        for (let i = 0; i < this.state.selectedReleaseNotes.length; i += 1) {
            let item = this.state.selectedReleaseNotes[i];
            let releaseNotes = item.fields.customfield_10052 ? item.fields.customfield_10052 : null;

            notes.push(
                <div>
                    <u>{item.key}</u>
                    <p>{item.fields.summary}</p>
                    <i>{releaseNotes}</i>
                    <br/>
                </div>
            )
        }

        let sprintName = this.props.sprints.find(obj => {
            return obj.id == this.props.selectedSprintID
        }).name

        return (
            <div>
                <h1>Release notes for {sprintName}</h1>
                {notes}
            </div>
        );
    }

    exportMarkdown() {
        this.props.dispatchConvertMarkdown({
            html: ReactDOMServer.renderToStaticMarkup(this.renderMarkDown())
        })
    }

    renderExportButtons() {
        return (
            <div id={"export-buttons"}>
                <p id={"selected-items-count"}>{this.state.selectedReleaseNotes.length} items selected</p>

                <h3>Export release notes</h3>
                <UserButton
                    id={"export-button-markdown"}
                    value={"Download selected as markdown"}
                    callback={() => this.exportMarkdown()}
                />
            </div>
        )
    }

    renderReleaseNotes() {
        if (this.props.jqlIssues) {

            let sprintName = this.props.sprints.find(obj => {
                return obj.id == this.props.selectedSprintID
            }).name
            let issues = [];

            for (let i = 0; i < this.props.jqlIssues.length; i += 1) {

                let browseBaseURL = "https://crowddeskdev.atlassian.net/browse/";
                let item = this.props.jqlIssues[i];
                let releaseNotes = item.fields.customfield_10052 ?
                    <p className={"release-notes"}>{item.fields.customfield_10052}</p> : null;

                if (!(this.state.hideNoNotes && !releaseNotes)) {

                    if (!releaseNotes) releaseNotes = <p className={"release-notes"}>-</p>;

                    issues.push(
                        <div style={{display: "block"}}>
                            <div className={"issue-container inline"}>
                                <input className={"cb"} type="checkbox" onChange={e => this.onSelectReleaseNote(item)}/>
                                <a className={"key"} href={browseBaseURL + item.key} target="_blank">{item.key}</a>
                                <p className={"type"}>{item.fields.issuetype.name}</p>
                                <p className={"summary"}>{item.fields.summary}</p>
                                {releaseNotes}
                            </div>
                        </div>);
                }
            }
            return (
                <div>
                    <div id={"release-notes-content"}>
                        <h3>Release notes for sprint <span id={"sprint-name"}>{sprintName}</span></h3>

                        <div id={"hide-no-notes-container"} className={"inline"}>
                            <input type="checkbox" id="no-notes-checkbox" name="no-notes-checkbox"
                                   onChange={e => this.hideNoNotesOnChange(e)}
                            />
                            <p id={"label"}>Hide issues without release notes</p>
                        </div>

                        <div style={{display: "block"}}></div>

                        <div id={"issue-headers"}>
                            <div className={"header"} id={"sel"}></div>
                            <div className={"header"} id={"key"}>Key</div>
                            <div className={"header"} id={"type"}>Type</div>
                            <div className={"header"} id={"summary"}>Summary</div>
                            <div className={"header"} id={"release-notes"}>Release notes</div>
                        </div>

                        <div id={"issues"}>{issues}</div>
                    </div>
                    {this.renderExportButtons()}
                </div>
            )
        }
    }

    render() {
        return (
            <div
                style={{height: window.innerHeight - this.state.innerHeightLowerPadding}}
                className={"content-container"}
                id={"release-notes-container"}
            >
                <h1>Release Notes</h1>
                <div className={"h1-line"}></div>
                <h2>Merge all release notes into a single document.</h2>

                <SprintPicker/>
                {this.renderReleaseNotes()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sprints: state.atlassianAPIReducer.sprints,
        jqlIssues: state.atlassianAPIReducer.jqlIssues,
        selectedSprintID: state.atlassianAPIReducer.selectedSprintID,
        markdownFileURL: state.converterReducer.markdownFileURL
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchConvertMarkdown: param => {
            dispatch(requestMarkdownConversion(param));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseNotes);