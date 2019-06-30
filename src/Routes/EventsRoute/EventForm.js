import React from 'react'
import { Input, Label, Textarea } from '../../Components/Form/Form'
import Button from '../../Components/Button/Button'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'rc-time-picker';
import "rc-time-picker/assets/index.css";
import SelectUSState from 'react-select-us-states'
import EventService from '../../Services/events-service'
import './EventForm.css'

export default class EventForm extends React.Component{
  state = {
    selectValue: false,
    events: [],
    startDate: new Date(),
    time: {
      am: true
    },
    state: '',
  }

  handleMenuChange = (selectValue) => {
    this.setState({ selectValue })
  }

  handleDateChange = (date) => {
    this.setState({ startDate: date })
  }

  handleTimeChange = (time) => {
    this.setState({ time: time })
  }

  handleStateChange = (state) => {
    this.setState({ state: state })
  }

  handleAddEvent = (e) => {
    e.preventDefault()
    const { event_name, is_private, event_details } = e.target;
    
    const date = this.state.startDate
    const time = this.state.time._i
    const state = this.state.state
   
    EventService.postEvents({
      event_name: event_name.value,
      event_date: date,
      event_time: time, 
      is_private: is_private.value,
      event_location: state,
      event_details: event_details.value
    }) 
      .then(response => {
        this.setState({ events: [...this.state.events, response]})
        this.props.history.push('/');
      }) 
  }

  routeChange = () => {
    this.props.history.push('/');
  }


  render(){
    return(
      <section>
        <div className="event-form">
        <fieldset>
          <form onSubmit={this.handleAddEvent}>
            <h3>Create an event:</h3>

            <Label htmlFor="name">Name of event</Label>
            <Input type="text" id="event_name" name="event_name" placeholder="Name of event" required/>

            <Label htmlFor="date">Date</Label>
            <DatePicker 
              selected = {this.state.startDate}
              onChange = {this.handleDateChange}
            />

            <Label htmlFor="time">Time</Label>
            <TimePicker 
              placeholder="Click to select time"
              selected = {this.state.time}
              onChange = {this.handleTimeChange}
              required
            />

            <Label className="is-private-label" htmlFor="is_private">Is this event a private event or a group event?</Label>
            <select  className="is_private" name="is_private" id="is_private" onChange={this.handleMenuChange}>
              <option value="true">Private</option>
              <option value="false">Group</option>
            </select>

            <Label htmlFor="locatio">Location</Label>
            <SelectUSState className="select-state"
              selected = {this.state.state}
              onChange = {this.handleStateChange}
            />

            <Label className="event-details" htmlFor="details">Details</Label>
            <Textarea type="text" id="event_details" name="event_details" placeholder="Enter event details..."></Textarea>

            <Button type="submit" className="create-event-btn">Create Event</Button>      
            <Button type="click" className="cancel-btn" onClick={this.routeChange}>Cancel</Button>    
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}
