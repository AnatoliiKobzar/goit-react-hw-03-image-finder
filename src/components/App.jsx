import React, { Component } from 'react';
import { ImageGallary } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    searchText: '',
  };

  handelSubmit = searchText => {
    this.setState({ searchText });
  };

  render() {
    const { searchText } = this.state;

    return (
      <div className="App">
        <Toaster
          toastOptions={{
            duration: 1500,
            style: {
              background: '#363636',
              color: '#fff',
            },
            position: 'top-right',
          }}
        />
        <Searchbar onSearch={this.handelSubmit} />
        <ImageGallary value={searchText} />
      </div>
    );
  }
}
