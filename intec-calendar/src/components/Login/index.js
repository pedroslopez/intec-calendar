import React, { Component } from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';
import { IA_URL } from '../../config';

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
        console.log('begin fetch');
        fetch(IA_URL + 'Main/Inicio', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                auth: {
                    id: this.state.id,
                    password: this.state.password
                },
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
            console.log(data);
        });

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
