import { Modal } from 'components/Modal/Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <li className="ImageGalleryItem" onClick={this.toggleModal}>
        <img
          className="ImageGalleryItem-image"
          src={this.props.img.webformatURL}
          alt={this.props.img.tags}
        />
        {showModal && (
          <Modal
            alt={this.props.img.tags}
            src={this.props.img.largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    hits: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    totalHits: PropTypes.number.isRequired,
  }).isRequired,
};
