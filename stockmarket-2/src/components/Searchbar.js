import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'reactstrap';

export default function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState('')
    return (
        <div>
            <Row>
                <Col xs='10'>
                    <Input name="industry-search" id="industry-search" type="search" placeholder="Search" value={innerSearch} onChange={(e) => setInnerSearch(e.target.value)} />
                </Col>
                <Col xs='auto'>
                    <Button id="industry-search-button" type="submit" color="dark" onClick={() => props.onSubmit(innerSearch)} >Search</Button>
                </Col>
            </Row>

        </div>
    )
}