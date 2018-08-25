import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleSubmit(e) {
        this.props.onSubmit(this.state.id, this.state.password);
        e.preventDefault();
    }

    handleChangeID(e) {
        this.setState({id: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }
    
    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="id">
                <Col componentClass={ControlLabel} sm={2}>
                    ID
                </Col>
                <Col sm={10}>
                    <FormControl type="number" placeholder="ID / Matricula" onChange={this.handleChangeID} />
                </Col>
                </FormGroup>
            
                <FormGroup controlId="password">
                <Col componentClass={ControlLabel} sm={2}>
                    Contraseña
                </Col>
                <Col sm={10}>
                    <FormControl type="password" placeholder="Contraseña" onChange={this.handleChangePassword} />
                </Col>
                </FormGroup>
            
                <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit">Entrar</Button>
                </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default Login;
