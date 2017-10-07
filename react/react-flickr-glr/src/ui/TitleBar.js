import React from 'react';
import PropTypes from 'prop-types';

export default class TitleBar extends React.Component {
  render() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired
};
