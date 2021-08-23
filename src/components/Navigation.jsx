import React from "react";
import Header from "./Header";
import { CgNotes } from "react-icons/all";
import "../styles/nav.css";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerHeightLowerPadding: 100
        };
    }

    render() {
        return(
            <div id={"nav-container"} style={{height: window.innerHeight - this.state.innerHeightLowerPadding}}>
                <Header />
                <div className={"nav-link"}>
                    <div className={"nav-link-content"}>
                        <CgNotes className={"dot-icon"} />
                        <p>Release Notes</p>
                    </div>
                    <div className={"line"}></div>
                </div>
            </div>
        )
    }
}

export default Navigation;