import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import $ from 'jquery';

import LoginForm from '../../components/Login';
import { IA_URL } from '../../config';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, password) {
        fetch(IA_URL + 'Main/Inicio', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                auth: { id, password },
                method: 'GET'
            }),
        }).then(res => {
            if(res.status === 200) {
                // yes
                return res.text();
            } else if (res.status === 401) {
                // no
                console.log('Unauthorized');
            } else {
                // some weird shit's going on bro
                console.error(res.statusText)
            }
        }).then(data => {
            this.scrapeSchedule(data);
        });
    }

    scrapeSchedule(html) {
        let schedule = [];

        $(html).find('.header-tr').each(function() {
            let cells = $(this).children();

            schedule.push({
                code: cells[0].textContent,
                name: cells[1].textContent,
                section: cells[2].textContent,
                key: cells[0].textContent + '-' + cells[2].textContent,
                room: cells[3].textContent,
                teacher: cells[11].textContent,
                schedule: {
                    monday: cells[4].textContent,
                    tuesday: cells[5].textContent,
                    wednesday: cells[6].textContent,
                    thursday: cells[7].textContent,
                    friday: cells[8].textContent,
                    saturday: cells[9].textContent
                }
            });
        });

        this.props.receiveSchedule(schedule);
    }

  render() {
    return (
      <Grid>
        <Row>
            <Col md={6} mdOffset={3}>
                <div>
                <h2>Login</h2>
                <p>Inicie sesión con su cuenta de INTEC para iniciar el proceso.</p>
                </div>
                
                <LoginForm onSubmit={this.handleSubmit} />
            </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
