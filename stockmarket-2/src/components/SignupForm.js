import React, { useState } from 'react';
import { Button, Container, Label, Input } from 'reactstrap';

const API_URL = "http://131.181.190.87:3000"

export default function SignupForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function signup() {
        const url = `${API_URL}/user/register`
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "Application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((err) => {
                if (err.error) { setError(err.message); throw new Error(err.message) }
                else {
                    setError("Login successful")
                    localStorage.token = err.token
                }
            })
            .catch(err => {

            })

    }

    return (
        <div className="signup-form-popup" id="signup-form">
            <Container>
                <Label for="Email">Email: </Label>
                <Input type="email" name="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Label for="Password">Password: </Label>
                <Input type="password" name="password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button color="danger" onClick={signup}>Sign Up</Button>
            </Container>
            <Label>{error}</Label>
        </div>
    )
}