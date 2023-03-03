import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  hendelChenge = event => {
    this.setState({ searchValue: event.target.value });
  };

  handelSubmit = event => {
    const { onSearch } = this.props;
    const { searchValue } = this.state;

    event.preventDefault();

    if (!searchValue) {
      toast.error('Enter the query!');
      return;
    }

    onSearch(searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handelSubmit}>
          <button type="submit" className="SearchForm-button">
            <FcSearch size="34px" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={this.hendelChenge}
          />
        </form>
      </header>
    );
  }
}
