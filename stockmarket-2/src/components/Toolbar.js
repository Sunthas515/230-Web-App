import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

export default function Toolbar() {
    return (
        <ButtonToolbar>
            <ButtonGroup className="main-toolbar">
                <Button color="dark" href="/">Home</Button>
                <Button color="dark" href="/stocks">Stocks</Button>
                <Button color="dark" href="/price">Price History</Button>
            </ButtonGroup>
        </ButtonToolbar >
    );
}