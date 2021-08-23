import React from "react";
import Navigation from "../Navigation";
import ReleaseNotes from "./ReleaseNotes";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Navigation />
                <ReleaseNotes />
            </div>
        )
    }
}

export default LandingPage;