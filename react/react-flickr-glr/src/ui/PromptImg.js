import React from 'react';

export default class PromptImg extends React.Component {

    showPrompt() {

        if (!this.props.promptImg) {
            return;
        }

        this.showCover();
        var form = document.getElementById('prompt-form');
        var container = document.getElementById('prompt-form-container');

        container.style.display = 'block';
        form.elements.cancel.focus();
    }

    showCover() {
        var coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
        document.body.appendChild(coverDiv);
    }

    hideCover() {
        document.body.removeChild(document.getElementById('cover-div'));
    }

    complete() {
        let container = document.getElementById('prompt-form-container');
        this.hideCover();
        container.style.display = 'none';
        this.props.onPromptImgChange(undefined);
    }

    handleCancelClick() {
        this.complete();
    }

    render() {
        return (
            <div id="prompt-form-container">
            {this.showPrompt()}
                <form id="prompt-form">
                    <img id="prompt-image" src={this.props.promptImg ? this.props.promptImg.href : ""} title={this.props.promptImg ? this.props.promptImg.title : ""} alt="" />
                    <input onClick={this.handleCancelClick.bind(this)} className="cancel" type="button" name="cancel" value="x"/>
                </form>
            </div>
        );
    }
}
