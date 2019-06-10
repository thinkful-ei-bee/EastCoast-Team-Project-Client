import React from 'react'

export default class NotifcationSent extends React.Component{

  routeChange = () => {
    this.props.history.push('/');
  }
  
  render() {
    return(
    <div>
      <h2>You have successfully eventified her!</h2>
      <button type="click" onClick={this.routeChange}>Back</button>
    </div>
  )
  }
  
}