import React, { Component } from 'react';
import { Table } from 'react-bootstrap';


class Schedule extends Component {

    constructor(props) {
        super(props);
        this.getRows = this.getRows.bind(this);
    }

    getRows() {
        let schedule = this.props.data;
        return schedule.map((classInfo) => 
            <tr key={classInfo.code}>
                <td>{classInfo.code}</td>
                <td>{classInfo.name}</td>
                <td>{classInfo.section}</td>
                <td>{classInfo.room}</td>
                <td>{classInfo.schedule.monday}</td>
                <td>{classInfo.schedule.tuesday}</td>
                <td>{classInfo.schedule.wednesday}</td>
                <td>{classInfo.schedule.thursday}</td>
                <td>{classInfo.schedule.friday}</td>
                <td>{classInfo.schedule.saturday}</td>
                <td>{classInfo.teacher}</td>
            </tr>
        );
    }

    render() {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Asignatura</th>
                        <th>Sec</th>
                        <th>Aula</th>
                        <th>Lun</th>
                        <th>Ma</th>
                        <th>Mi</th>
                        <th>Ju</th>
                        <th>Vi</th>
                        <th>Sa</th>
                        <th>Profesor</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </Table>
        );
    }
}

export default Schedule
