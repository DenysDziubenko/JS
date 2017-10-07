import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './ui/App';
import { getPhotosFromApi } from './api/photos';
import { RotateLoader } from 'react-spinners';


ReactDOM.render(<div className='loading'>
                    <RotateLoader color={'#123abc'}  loading={true} />
                </div>, document.getElementById('root'));

getPhotosFromApi("Milky way Cosmos")
    .then(function(data) {
        ReactDOM.render(<App title={"Flickr gallery"} data={data}/>, document.getElementById('root'));
    });
