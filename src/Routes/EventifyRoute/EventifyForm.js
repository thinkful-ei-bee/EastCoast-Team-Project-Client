import React from 'react'
import EventService from '../../Services/events-service'
import UserContext from '../../contexts/UserContext'
import Button from '../../Components/Button/Button'
import './EventifyForm.css'


export default class EventifyForm extends React.Component{
  state = {
    events: [],
    selectedValue: ''
  }

  static contextType = UserContext

  componentDidMount() {
    EventService.getEvents()
      .then(event => {
        const eventList = event.filter(ev => ev.event_owner_id === this.context.user.id)
        this.setState({ events: eventList})
      })
  }

  handleMenuChange = (selectedValue) => {
    this.setState({ selectedValue })
  }

  handleChooseEvent = (e) => {
    e.preventDefault()
    this.props.history.push('/notificationSent')
  }

  routeChange = () => {
    this.props.history.push('/');
  }

  
  render() {
    console.log(this.context.user)
    const events = (!this.state.events) ? [] : this.state.events.map((event, i) => 
      <option key={i}>{event.event_name}</option>
      )
     
    return(
      <div className="eventify-form">
        <fieldset>
          <form onSubmit={this.handleChooseEvent}>
            <h2>Choose one of your events to invite this person:</h2>
            <select id="chooseEvent" name="chooseEvent" onChange={e => this.handleMenuChange(e.target.value)} value={ this.state.selectedValue }>
              {events}
            </select><br></br>
            <Button>Choose event</Button><br></br>
            <Button type="click" onClick={this.routeChange}>Cancel</Button>    
          </form>
        </fieldset>
      </div>
    )
  }
}
