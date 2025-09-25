import React, { Component } from 'react';
import '../css/Projecthomepage.css'; // reuse your homepage CSS

export class JobSearch extends Component {
  constructor() {
    super();
    this.state = {
      company: '',
      location: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearch = () => {
    const { company, location } = this.state;
    alert(`Searching feedback for Company: ${company}, Location: ${location}`);
    // later you can call API to fetch results
  }

  render() {
    const { company, location } = this.state;
    return (
      <div className='jobsearch-container'>
        <h1>Welcome to Feedback Search</h1>
        <div className='searchBar'>
          <input
            type='text'
            name='company'
            value={company}
            onChange={this.handleInputChange}
            placeholder='Search by company'
            className='searchText'
          />
          <input
            type='text'
            name='location'
            value={location}
            onChange={this.handleInputChange}
            placeholder='Location'
            className='searchLocation'
          />
          <button className='searchButton' onClick={this.handleSearch}>
            Search Feedback
          </button>
        </div>
      </div>
    );
  }
}

export default JobSearch;
