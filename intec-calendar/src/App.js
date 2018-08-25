import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Login from './components/Login';
import './App.css';

class App extends Component {

  handleSuccess(html) {

  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Login onSuccess={this.handleSuccess} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
