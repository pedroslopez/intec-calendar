import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Login from './screens/Login';
import Calendar from './screens/Calendar';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      scheduleData: []
    }

    this.receiveSchedule = this.receiveSchedule.bind(this);
  }

  receiveSchedule(scheduleData) {
    this.setState({scheduleData, loggedIn: true});
  }

  render() {
    return (
      <span>
        <Navbar staticTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              HIVECalendar
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {!this.state.loggedIn ? 
          <Login 
            receiveSchedule={this.receiveSchedule} /> : 
            <Calendar schedule={this.state.scheduleData}/>}

      </span>
      
    );
  }
}

export default App;
