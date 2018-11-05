import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';


class Schedule extends Component {

    constructor(props) {
        super(props);

        let selectionDefault = props.selectionDefault || false;
        let selectedClasses = {}
        let schedule = Object.values(props.data) || [];

        if(selectionDefault && schedule) {
            let selected = [];
            schedule.forEach(element => {
                selected.push(element.key);
                selectedClasses[element.key] = true
            });
            
            if(typeof(props.onSelectionChange) === 'function') {
                props.onSelectionChange(selected);
            }
        }

        this.state = {
            selectedClasses,
            schedule,
            isLoading: false
        }

        this.getRows = this.getRows.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelection(key, value) {
        this.setState({
            selectedClasses: {
                ...this.state.selectedClasses,
                [key]: value
            }
        })
    }

    handleSubmit() {
        this.setState({isLoading: true});
        if(this.props.onSelectionSubmit && typeof(this.props.onSelectionSubmit) === 'function') {
            let selected = [];
            (Object.entries(this.state.selectedClasses)).forEach(item => {
                const [key, value] = item;
                if(value) {
                    selected.push(this.props.data[key]);
                }
            });

            this.props.onSelectionSubmit(selected);
        }
    }

    getRows() {
        let schedule = this.state.schedule;
        return schedule.map((classInfo) => 
            <tr key={classInfo.key}>
                {this.props.selection && <td>
                    <input
                        type="checkbox"
                        checked={this.state.selectedClasses[classInfo.key] || false}
                        key={classInfo.key}
                        onChange={(e) => this.handleSelection(classInfo.key, e.target.checked)} />
                </td>}
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
            <div>
                <Table striped responsive>
                    <thead>
                        <tr>
                            {this.props.selection && <th></th>}
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
                {this.props.onSelectionSubmit && 
                    <Button bsSize="large" block
                        disabled={this.state.isLoading}
                        onClick={!this.state.isLoading ? this.handleSubmit : null}>
                        {this.state.isLoading ? 'Cargando...' : 
                            this.props.selectionButtonText || "Submit"}
                    </Button>
                }
            </div>
        );
    }
}

export default Schedule
