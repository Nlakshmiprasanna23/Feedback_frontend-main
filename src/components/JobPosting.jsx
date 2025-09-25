import React, { Component } from 'react';
import '/src/css/JobPosting.css';
import { BASEURL, callApi } from '../api';

export default class JobPosting extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      company: '',
      location: '',
      jobtype: '',
      salary: '',
      description: '',
      showPopup: false,
      jobList: []
    };
  }

  componentDidMount() {
    this.loadJobs();
  }

  // Map jobtype code to label
  mapJobType(type) {
    if (type === "1") return "Positive";
    if (type === "2") return "Negative";
    return "";
  }

  // Load all jobs
  loadJobs() {
    callApi("GET", BASEURL + "jobs/read", "", (response) => {
      try {
        let data = JSON.parse(response);
        this.setState({ jobList: data });
      } catch (e) {
        alert("Error loading jobs");
      }
    });
  }

  // Load data into popup for update
  updateData(id) {
    callApi("GET", BASEURL + "jobs/getdata/" + id, "", (response) => {
      try {
        let data = JSON.parse(response);
        this.setState({
          id: data.id,
          title: data.title,
          company: data.company,
          location: data.location,
          jobtype: data.jobtype,
          salary: data.salary,
          description: data.description,
          showPopup: true
        });
      } catch (e) {
        alert("Job not found or invalid data");
      }
    });
  }

  // Delete job
  deleteData(id) {
    if (!window.confirm("Click OK to confirm deletion")) return;
    callApi("DELETE", BASEURL + "jobs/delete/" + id, "", (response) => {
      alert("Feedback deleted");
      this.loadJobs();
    });
  }

  // Handle input change
  loadInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Save or update job
  saveJob() {
    const { id, title, company, location, jobtype, salary, description } = this.state;
    const payload = JSON.stringify({ id, title, company, location, jobtype, salary, description });

    if (id) {
      callApi("PUT", BASEURL + "jobs/update", payload, (response) => {
        alert("Feedback updated");
        this.setState({ id: '', title: '', company: '', location: '', jobtype: '', salary: '', description: '', showPopup: false });
        this.loadJobs();
      });
    } else {
      callApi("POST", BASEURL + "jobs/create", payload, (response) => {
        alert("Feedback saved");
        this.setState({ id: '', title: '', company: '', location: '', jobtype: '', salary: '', description: '', showPopup: false });
        this.loadJobs();
      });
    }
  }

  render() {
    const { title, company, location, jobtype, salary, description, jobList, showPopup, id } = this.state;

    return (
      <div className='jpcontainer'>

        {/* Popup */}
        {showPopup && (
          <div className='popup'>
            <div className='popupwindow'>
              <div className='popupheader'>
                <label>{id ? "Update Feedback" : "Submit Feedback"}</label>
                <span onClick={() => this.setState({ showPopup: false })}>&times;</span>
              </div>
              <div className='popupcontent'>
                <label>Feedback Title</label>
                <input type='text' name='title' value={title} onChange={this.loadInputChange} />

                <label>Submitted By</label>
                <input type='text' name='company' value={company} onChange={this.loadInputChange} />

                <label>Department / Topic</label>
                <input type='text' name='location' value={location} onChange={this.loadInputChange} />

                <label>Feedback Type</label>
                <select name='jobtype' value={jobtype} onChange={this.loadInputChange}>
                  <option value=""></option>
                  <option value="1">Positive</option>
                  <option value="2">Negative</option>
                </select>

                <label>Priority / Rating</label>
                <input type='text' name='salary' value={salary} onChange={this.loadInputChange} />

                <label>Feedback Message</label>
                <textarea rows="5" name='description' value={description} onChange={this.loadInputChange}></textarea>

                <button onClick={() => this.saveJob()}>{id ? "Update" : "Submit"}</button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className='header'>
          <label>All Feedbacks</label>
        </div>

        {/* Feedback List */}
        <div className='content'>
          {jobList.map((data) => (
            <div className='result' key={data.id}>
              <div className='div1'>
                <label>{data.title}</label>
                <span>{data.salary}</span>
                <img src='images/bin.jpeg' alt='delete' onClick={() => this.deleteData(data.id)} width="30px" />
                <img src='images/pen.jpeg' alt='edit' onClick={() => this.updateData(data.id)} width="30px" />
              </div>
              <div className='div2'>
                {data.company} | {data.location} | {this.mapJobType(data.jobtype)}
              </div>
              <div className='div3'>
                {data.description}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className='footer'>
          <button onClick={() => this.setState({ showPopup: true })}>Submit Feedback</button>
        </div>
      </div>
    );
  }
}
