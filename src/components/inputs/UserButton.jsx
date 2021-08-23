import React from "react";
import { withRouter } from "react-router-dom";
import "../../styles/inputs/button.scss";

class UserButton extends React.Component {
    clickHandler(e) {
        if (this.props.callback)
            this.props.callback(e);
        if (this.props.path)
            window.open(this.props.path, this.props.target);
    }

    render() {
        return (
            <div>
                <button
                    disabled={this.props.buttonDisabled}
                    className={this.props.className}
                    id={this.props.id}
                    type='button'
                    value={this.props.value}
                    onClick={(e) => this.clickHandler(e)}
                    style={{marginTop: this.props.marginTop}}
                >
                    {this.props.icon}
                    {this.props.value}
                </button>
            </div>
        )
    }
}

UserButton.defaultProps = {
    className: "user-button",
    marginTop: "0px"
}

export default withRouter (UserButton);