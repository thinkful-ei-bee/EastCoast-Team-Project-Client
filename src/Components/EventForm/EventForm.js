import React from 'react'

export default class EventForm extends React.Component{
  render(){
    return(
      <section>
        <div className="event-form">
        <fieldset>
          <form >

            <label htmlFor="name">Name of event</label>
            <input type="text" id="name" name="name" placeholder="Name of event" required/>

            <label htmlFor="date">Date</label>
            <input type="text" id="date" name="date" placeholder="Date" required/> 

            <label htmlFor="time">Time</label>
            <input type="text" id="time" name="time" placeholder="time" required/> 

            <label htmlFor="type">Type</label>
            <input type="text" id="type" name="type" placeholder="Type" required/> 

            <label htmlFor="group-or-private">Group or private date event</label>
            <input type="text" id="group-or-private" name="group-or-private" placeholder="group or private date event" required/> 

            <label htmlFor="locatio">Locatio</label>
            <input type="text" id="locatio" name="location" placeholder="Location" required/> 

            <label htmlFor="details">Details</label>
            <input type="text" id="date" name="date" placeholder="Event details" required/> 

            <button type="submit">Login</button>       
          </form>
        </fieldset>
        </div>
      </section>
    )
  }   
}