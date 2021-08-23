import React from "react";
import "../styles/header.scss";
import {connect} from "react-redux";

class Header extends React.Component {
    renderSpinner() {
        if (this.props.atlassianLoading || this.props.converterLoading)
            return (<img id="spinner" src={process.env.PUBLIC_URL + '/spinner.gif'}/>)
        else return null;
    }

    render() {
        return(
            <div id={"header"}>
                {this.renderSpinner()}
                <img id={"logo"} src={process.env.PUBLIC_URL + "/portagonLogoWhite.png"} />
                <p id={"descr"}>PM Tool for internal use (version 0)</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        atlassianLoading: state.atlassianAPIReducer.loading,
        converterLoading: state.converterReducer.loading
    }
};

export default connect(mapStateToProps, null)(Header);