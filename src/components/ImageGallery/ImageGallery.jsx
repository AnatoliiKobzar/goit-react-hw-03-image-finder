import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { getImage } from 'components/services/PixabayAPI';
import React, { Component } from 'react';
import { Wrap } from './ImageGallery.styled';

export class ImageGallary extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    totalPages: null,
    isShowButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        loading: true,
        images: [],
        page: 1,
      });

      getImage(this.props.value.trim())
        .then(response => response.json())
        .then(images => {
          this.setState({
            images: images.hits,
            totalPages: Math.ceil(images.totalHits / 12),
          });

          if (!this.hasMorePhotos()) {
            this.toggleShowBtn();
          }
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      getImage(this.props.value.trim(), this.state.page)
        .then(response => response.json())
        .then(images => {
          this.setState({
            images: [...prevState.images, ...images.hits],
          });

          if (!this.hasMorePhotos()) {
            this.toggleShowBtn();
          }
        })
        .catch(error => console.log(error));
    }
  }

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  toggleShowBtn = () => {
    this.setState({ isShowButton: !this.state.isShowButton });
  };

  hasMorePhotos = () => {
    return this.state.page < this.state.totalPages;
  };

  render() {
    const { loading, isShowButton } = this.state;

    return (
      <Wrap>
        {!loading ? (
          <ul className="ImageGallery">
            {this.state.images.map(img => {
              return <ImageGalleryItem key={img.id} img={img} />;
            })}
          </ul>
        ) : (
          <Loader />
        )}
        {isShowButton && <Button loadMore={this.loadMore} />}
      </Wrap>
    );
  }
}
