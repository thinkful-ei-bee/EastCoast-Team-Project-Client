import React from 'react'
import { Input, Label } from '../../Components/Form/Form'
import Button from '../../Components/Button/Button'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
<<<<<<< HEAD
import TimePicker from 'react-time-picker'
=======
import TimePicker from 'rc-time-picker';
>>>>>>> farahClient2
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
    console.log(state)
  }

  handleAddEvent = (e) => {
    e.preventDefault()
    const { event_name, is_private, event_time, event_details } = e.target;
    
    const date = this.state.startDate
    const time = this.state.time
    const state = this.state.state

    EventService.postEvents({
      event_name: event_name.value,
      event_date: date,
      event_time: event_time.value, 
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
    const options = [
      { value: 'false', label: 'Group' },
      { value: 'true', label: 'Private' }
    ]

    return(
      <section>
        <div className="event-form">
        <fieldset>
          <form onSubmit={this.handleAddEvent}>
            <h3>Create an event:</h3>

            <Label htmlFor="name">Name of event</Label>
            <Input type="text" id="event_name" name="event_name" placeholder="Name of event" required/><br></br>

            <Label htmlFor="date">Date</Label>
            
            <DatePicker 
              selected = {this.state.startDate}
              onChange = {this.handleDateChange}
            />

            <Label htmlFor="time">Time</Label>
            <TimePicker 
              selected = {this.state.time}
              onChange = {this.handleTimeChange}
              required
            />
            {/* <Input type="text" id="event_time" name="event_time" placeholder="time" required/> <br></br> */}

            <Label htmlFor="is_private">Is this event a private event or a group event?</Label><br></br>
            <Select  
              className="is_private"
              name="is_private"
              id="is_private"
              value = {this.state.selectValue} 
              onChange={this.handleMenuChange}
              options = {options} />

            <Label htmlFor="locatio">Location</Label>
            <SelectUSState className="select-state"
              selected = {this.state.state}
              onChange = {this.handleStateChange}
            />

            <Label htmlFor="details">Details</Label>
            <Input type="text" id="event_details" name="event_details" placeholder="Event details" required/> 

            <Button type="submit" className="create-event-btn">Create Event</Button>      
            <Button type="click" onClick={this.routeChange}>Cancel</Button>    
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}
