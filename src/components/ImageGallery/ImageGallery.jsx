import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { getImage } from 'components/services/PixabayAPI';
import React, { Component } from 'react';
import { Wrap } from './ImageGallery.styled';
import { toast } from 'react-hot-toast';

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

          if (Math.ceil(images.totalHits / 12) === 0) {
            toast.error('No images on your request!');
            return;
          }

          if (this.state.page < Math.ceil(images.totalHits / 12)) {
            return this.setState({ isShowButton: true });
          }
          this.setState({ isShowButton: false });
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

          if (this.state.page < Math.ceil(images.totalHits / 12)) {
            return this.setState({ isShowButton: true });
          }
          this.setState({ isShowButton: false });
        })
        .catch(error => console.log(error));
    }
  }

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
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
