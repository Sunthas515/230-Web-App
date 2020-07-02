import React from 'react';
import { Row, Col } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

let start = ''
let end = ''

export default function DateSelect() {
    return (
        <div>
            <Row>
                <Col>
                    <p>Please select a start date:</p>
                    <DayPickerInput onDayChange={startday => start = startday.toISOString()} />
                </Col>
                <Col>
                    <p>Please select a end date:</p>
                    <DayPickerInput onDayChange={endday => end = endday.toISOString()} />
                </Col>
            </Row>


        </div>
    );
}

export { start };
export { end };