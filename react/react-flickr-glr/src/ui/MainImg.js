import React from 'react';
import PropTypes from 'prop-types';
import { buildPhotoLargeUrl } from './../api/photos';

export default class MainImg extends React.Component {

    handleMainImgClick(e) {
        let target = e.target;

        if (target.nodeName === 'IMG') {

            let mainImg = {
                href: target.src,
                title: target.title
            };

            this.props.onPromptImgChange(mainImg);
        }
    }

    render() {
        return (
            <div>
            <p><img id="largeImg" onClick={this.handleMainImgClick.bind(this)} src={this.props.photo.href ? this.props.photo.href : buildPhotoLargeUrl(this.props.photo)} title={this.props.photo ? this.props.photo.title : ""} alt=""/></p>
            </div>
        );
    }
}

MainImg.propTypes = {
    photo: PropTypes.object.isRequired
};
