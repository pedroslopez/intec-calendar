import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Schedule from '../../components/Schedule';

 const ics = require('../../ics');

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            downloadUrl: ''
        }
        this.handleSelectionSubmit = this.handleSelectionSubmit.bind(this);
    }

    handleSelectionSubmit(selection) {
        let events = []
        for(let i=0; i<selection.length; i++) {
            let classEvents = this.classToEvent(selection[i]);
            for (let j=0; j<classEvents.length; j++) {
                let toLen = classEvents[j].recurrenceRule.length-1;
                if(classEvents[j].dayCount <= 1) {
                    toLen = 22
                }
                classEvents[j].recurrenceRule = classEvents[j].recurrenceRule.substring(0, toLen);
                classEvents[j].dayCount = undefined;
                events.push(classEvents[j]);
            }
        }
        console.log(events);

        const {error, value} = ics.createEvents(events);
        // console.log(value);
        
        this.setState({downloadUrl: 'data:text/calendar,' + encodeURI(value)});
    }

    downloadFile(data) {
        
    }

    getWeekday(date, desiredWeekday) {
        let currentWeekday = date.getDay();
        let delta = desiredWeekday - currentWeekday;

        date.setDate(date.getDate() + delta);
        return date;

    }

    classToEvent(classInfo) {
        const today = new Date();

        // check rule
        let classTimes = {}

        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const calDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
        for(let i=0; i<days.length; i++) {
            let day = days[i];
            let timeKey = classInfo.schedule[day].trim();

            if(timeKey) {
                if(! (timeKey in classTimes)) {
                    let splitTime = timeKey.split('/');
                    if(splitTime.length !== 2) {
                        continue;
                    }

                    let startTime = parseInt(splitTime[0], 10);
                    let endTime = parseInt(splitTime[1], 10);
                    let date = this.getWeekday(today, i+1);

                    // classTimes[timeKey] = {time: {startTime, endTime, duration: endTime-startTime}, days: []}
                    classTimes[timeKey] = {
                        start: [date.getFullYear(), date.getMonth()+1, date.getDate(), startTime, 0],
                        startType: 'local',
                        duration: {hours: endTime-startTime},
                        title: classInfo.name,
                        location: classInfo.room.replace(',', ' /'),
                        productId: 'pedroslopez/intec-calendar',
                        recurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=',
                        dayCount: 0
                    }
                }
    
                classTimes[timeKey].recurrenceRule += calDays[i] + ',';
                classTimes[timeKey].dayCount++;
            } 
        }

        return Object.values(classTimes);
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
                        onSelectionSubmit={!this.state.downloadUrl ? this.handleSelectionSubmit : false} 
                        selectionButtonText="Generar calendario"
                        data={this.props.schedule}/>
                    {this.state.downloadUrl && 
                        <a href={this.state.downloadUrl} download="schedule.ics">Haga click aqui para descargar el archivo</a>
                    }
                </Col>
            </Row>
        </Grid>
        );
    }
}

export default Calendar;
