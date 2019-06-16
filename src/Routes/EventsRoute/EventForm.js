import React from 'react'
import { Input, Label } from '../../Components/Form/Form'
import Button from '../../Components/Button/Button'
import EventService from '../../Services/events-service'
import './EventForm.css'

export default class EventForm extends React.Component{
  state = {
    selectValue: false,
    events: []
  }

  handleMenuChange = (selectValue) => {
    this.setState({ selectValue })
  }

  handleAddEvent = (e) => {
    e.preventDefault()
    const { event_name, event_date, event_time, event_type, is_private, event_location, event_details } = e.target;


    EventService.postEvents({
      event_name: event_name.value,
      event_date: event_date.value,
      event_time: event_time.value, 
      event_type: event_type.value,
      is_private: is_private.value,
      event_location: event_location.value,
      event_details: event_details.value
    }) 
      .then(response => {
        event_name.value =''
        event_date.value = ''
        event_time.value = ''
        event_type.value = ''
        is_private.value = ''
        event_location.value = ''
        event_details.value = ''
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
            <Input type="text" id="event_date" name="event_date" placeholder="Date" required/> 

            <Label htmlFor="time">Time</Label>
            <Input type="text" id="event_time" name="event_time" placeholder="Time" required/> 

            <Label htmlFor="type">Type</Label>
            <Input type="text" id="event_type" name="event_type" placeholder="Type" required/> 

            <select id="is_private" name="is_private" onChange={e => this.handleMenuChange(e.target.value)} value={ this.props.selectValue }>
              <option value="false">Group</option>
              <option value="true">Private</option>
            </select>

            <Label htmlFor="locatio">Location</Label>
            <Input type="text" id="event_location" name="event_location" placeholder="Location" required/> 

            <Label htmlFor="details">Details</Label>
            <Input type="text" id="event_details" name="event_details" placeholder="Event details" required/> 

            <Button type="submit" className="create-event-btn">Create Event</Button>      
            <Button type="click" onClick={this.routeChange} className="cancel-btn">Cancel</Button>    
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}
