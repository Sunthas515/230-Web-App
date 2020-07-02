import React from 'react';
import { Button } from 'reactstrap';

export default function Hero() {
    return (
        <div className="hero-image">
            <div className="hero-text">
                <h1><b>Stock Market Viewer</b></h1>
                <p>For all your stock market needs</p>
                <div className="login">
                    <Button color="success" href="/LoginForm">Login</Button>
                    <Button color="danger" href="/SignupForm">Signup</Button>
                </div>
            </div>
        </div>
    );
}