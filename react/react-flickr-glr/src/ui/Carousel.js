import React from 'react';
import PropTypes from 'prop-types';
import { buildThumbnailUrl, buildPhotoLargeUrl } from './../api/photos';

export default class Carousel extends React.Component {

    constructor(props) {
        super(props);
        this.width = 130;
        this.count = 6;
        this.position = 0;
    }

    handlePrevClick(e) {
        let list = document.querySelector('ul');
        this.position = Math.min(this.position + this.width * this.count, 0);
        list.style.marginLeft = this.position + 'px';
    }

    handleNextClick(e) {
        let list = document.querySelector('ul');
        let listElems = document.querySelectorAll('li');
        this.position = Math.max(this.position - this.width * this.count, -this.width * (listElems.length - this.count));
        list.style.marginLeft = this.position + 'px';
    }


    handleThumbsClick(e) {
        var target = e.target;
        e.preventDefault();
        while (target !== 'UL') {
            if (target.nodeName === 'A') {

                let mainImg = {
                    href: target.href,
                    title: target.title
                };

                this.props.onMainImgChange(mainImg);
                break;
            }
            target = target.parentNode;
        }
    }

    renderPhotos() {

        if (!this.props.photos.photo) {
            return;
        }

        return this.props.photos.photo.map((photo) => {
            var thumbnailSrc = buildThumbnailUrl(photo);
            var photoSrc = buildPhotoLargeUrl(photo);
            return (
                <li key={photo.id}>
                    <a href={photoSrc} title={photo.title}><img src={thumbnailSrc} alt="" /></a>
                </li>
            );
        });
    }

    render() {
        return (
            <div id="carousel" className="carousel">
                <button className="arrow prev" onClick={this.handlePrevClick.bind(this)} >{"<"}</button>
                    <div className="gallery">
                        <ul id="thumbs" onClick={this.handleThumbsClick.bind(this)}>
                        {this.renderPhotos()}
                        </ul>
                    </div>
                <button className="arrow next" onClick={this.handleNextClick.bind(this)} >{">"}</button>
            </div>
        );
    }
}

Carousel.propTypes = {
    photos: PropTypes.object.isRequired,
    onMainImgChange: PropTypes.func.isRequired
};
