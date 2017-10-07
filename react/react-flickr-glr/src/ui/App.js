import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import AddPhotoInput from './AddPhotoInput';
import MainImg from './MainImg';
import Carousel from './Carousel';
import PromptImg from './PromptImg';
import { RotateLoader } from 'react-spinners';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.handlePhotoInputChange = this.handlePhotoInputChange.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleMainImgChange = this.handleMainImgChange.bind(this);
        this.handlePromptImgChange = this.handlePromptImgChange.bind(this);
        this.state = {
            photos: this.props.data.photos,
            mainImg: this.props.data.photos.photo['0'],
            promptImg: undefined,
            loading: false
        };
    }

    handleLoading() {
        this.state = {
            loading: true
        };
        this.forceUpdate();
    }

    handlePhotoInputChange(data) {
        this.setState({
            photos: data.photos,
            mainImg: data.photos.photo['0'],
            loading: false
        });
    }

    handleMainImgChange(mainImg) {
        this.setState({ mainImg: mainImg });
    }

    handlePromptImgChange(promptImg) {
        this.setState({ promptImg: promptImg });
    }

    render() {

        if (this.state.loading) {
            return (
                <div className='loading'>
                    <RotateLoader color={'#123abc'}  loading={this.state.loading} />
                </div>
            );
        }

        if (!this.state.mainImg) {
            return (
                <div>
                    <TitleBar title={this.props.title}/>
                    <AddPhotoInput onPhotoInputChange={this.handlePhotoInputChange} onLoading={this.handleLoading}/>
                    <h1>There are no photos, try to search again!</h1>
                </div>
            );
        }

        return (
            <div>
                <TitleBar title={this.props.title}/>
                <AddPhotoInput onPhotoInputChange={this.handlePhotoInputChange} onLoading={this.handleLoading}/>
                <MainImg photo={this.state.mainImg} onPromptImgChange={this.handlePromptImgChange}/>
                <Carousel photos={this.state.photos} onMainImgChange={this.handleMainImgChange}/>
                <PromptImg promptImg={this.state.promptImg} onPromptImgChange={this.handlePromptImgChange}/>
            </div>
        );
    }
}

App.propTypes = {
    title: PropTypes.string.isRequired
};
