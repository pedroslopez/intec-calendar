import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Schedule from '../../components/Schedule';

class Calendar extends Component {

    constructor(props) {
        super(props);

        this.handleSelectionSubmit = this.handleSelectionSubmit.bind(this);
    }

    handleSelectionSubmit(selection) {
        console.log(selection);
    }

    render() {
        return (
        <Grid>
            <Row>
                <Col sm={12}>
                    <div>
                    <h2>Calendar</h2>
                    <p>Seleccione las clases que desea exportar al calendario</p>
                    </div>
                    <Schedule selection 
                        selectionDefault={true} 
                        onSelectionSubmit={this.handleSelectionSubmit} 
                        selectionButtonText="Generar calendario"
                        data={this.props.schedule}/>
                </Col>
            </Row>
        </Grid>
        );
    }
}

export default Calendar;
