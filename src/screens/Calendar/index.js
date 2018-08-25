import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Schedule from '../../components/Schedule';

class Calendar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Grid>
            <Row>
                <Col sm={12}>
                    <div>
                    <h2>Calendar</h2>
                    <p>Inicie sesión con su cuenta de INTEC para iniciar el proceso.</p>
                    </div>
                    <Schedule data={this.props.schedule}/>
                </Col>
            </Row>
        </Grid>
        );
    }
}

export default Calendar;
