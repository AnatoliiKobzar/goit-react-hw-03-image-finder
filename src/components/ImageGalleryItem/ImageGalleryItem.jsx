import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={this.props.img.webformatURL}
          alt={this.props.img.tags}
        />
      </li>
    );
  }
}
