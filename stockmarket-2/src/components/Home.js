import React from 'react';
import { Container } from 'reactstrap';

export default function Home() {
    return (
        <div className="Homepage" id="home">
            <h1>Home</h1>
            <Container>
                <p>
                    Welcome to the Stock Market protal. Click on Stocks to see
                    the available companies, or choose Price History to sample from the most
                    recent one hundred days of information for a particular stock after login
          </p>
            </Container>
        </div>
    )
}