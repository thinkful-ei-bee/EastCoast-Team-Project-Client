import React from 'react'
import { Input, Label, Textarea } from '../../Components/Form/Form'
import Button from '../../Components/Button/Button'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'rc-time-picker';
import "rc-time-picker/assets/index.css";
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

  handleAddEvent = (e) => {
    e.preventDefault()
    const { event_name, is_private, event_location, event_details } = e.target;
    
    const date = this.state.startDate
    const time = this.state.time._i
   
    EventService.postEvents({
      event_name: event_name.value,
      event_date: date,
      event_time: time, 
      is_private: is_private.value,
      event_location: event_location.value,
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

            <Label htmlFor="location">Location</Label>
            <select name="event_location" id="event_location" onChange = {this.handleStateChange} >
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="District Of Columbia">District Of Columbia</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>

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
