import React from 'react';
import PropTypes from 'prop-types';
import { getPhotosFromApi } from './../api/photos';

export default class AddPhotoInput extends React.Component {

  handleSubmit(e) {
    let query = e.target.query.value;
    e.preventDefault();
    e.target.query.value = '';

    this.props.onLoading();

    getPhotosFromApi(query)
      .then(function(data) {
        this.props.onPhotoInputChange(data);
      }.bind(this));
  }

  render() {
    return (
      <div>
        <form className="form-search" onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" name="query" id="query" placeholder="Search for an images" required />
              <input type="submit" value="Search" />
        </form>
     </div>
    );
  }
}

AddPhotoInput.propTypes = {
  onPhotoInputChange: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired
};
