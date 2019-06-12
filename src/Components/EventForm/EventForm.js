import React from 'react'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'
// import './EventForm.css'

export default class EventForm extends React.Component{
  render(){
    const isPrivate = [
      { label: 'Group', value: false},
      { label: 'Private', value: true}
    ]
    return(
      <section>
        <div className="event-form">
        <fieldset>
          <form onSubmit={this.props.addEvent}>
            <h3>Create an event:</h3>

            <Label htmlFor="name">Name of event</Label>
            <Input type="text" id="event_name" name="event_name" placeholder="Name of event" required/>

            <Label htmlFor="date">Date</Label>
            <Input type="text" id="event_date" name="event_date" placeholder="Date" required/> 

            <Label htmlFor="time">Time</Label>
            <Input type="text" id="event_time" name="event_time" placeholder="time" required/> 

            <Label htmlFor="type">Type</Label>
            <Input type="text" id="event_type" name="event_type" placeholder="Type" required/> 

            {/* <Label>Group or Private</Label> */}
            {/* <Select id="isPrivate" name="isPrivate" onChange={e => this.props.handleChange(e.target.value)} options={ isPrivate } value={ this.props.selectValue }/> */}
            <select id="is_private" name="is_private" onChange={e => this.props.handleChange(e.target.value)} value={ this.props.selectValue }>
              <option value="false">Group</option>
              <option value="true">Private</option>
            </select>

            <Label htmlFor="locatio">Location</Label>
            <Input type="text" id="event_location" name="event_location" placeholder="Location" required/> 

            <Label htmlFor="details">Details</Label>
            <Input type="text" id="event_details" name="event_details" placeholder="Event details" required/> 

            <Button type="submit">Create Event</Button>       
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}
