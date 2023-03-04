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
    const { webformatURL, tags, largeImageURL } = this.props.img;

    return (
      <li className="ImageGalleryItem" onClick={this.toggleModal}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        {showModal && (
          <Modal alt={tags} src={largeImageURL} onClose={this.toggleModal} />
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
