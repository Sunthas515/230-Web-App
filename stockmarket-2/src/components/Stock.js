import React, { useState, useEffect } from 'react'
import { Container, Label } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import { Line } from 'react-chartjs-2';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SearchBar from './Searchbar';
import DateSelect from './DateSelect';
import { start } from './DateSelect';
import { end } from './DateSelect';


let chart = false;
let chartData = [];

export default function Stock() {
    const token = localStorage.token;
    const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
    const [rowData, setRowData] = useState([]);
    const [search, setSearch] = useState('');

    let columns = [];

    let url = ''

    if (search === '') {
        url = `http://131.181.190.87:3000/stocks/symbols`
        columns = [
            { headerName: "Company", field: "name", flex: 1 },
            { headerName: "Symbol", field: "symbol", flex: 1 },
            { headerName: "Industry", field: "industry", flex: 1 }
        ];
    }
    else if (search !== '' && start === '' && end === '') {
        url = `http://131.181.190.87:3000/stocks/${search}`
        columns = [
            { headerName: 'TimeStamp', field: 'timestamp', flex: 2 },
            { headerName: 'Stock', field: 'symbol', flex: 1 },
            { headerName: 'Name', field: 'name', flex: 1 },
            { headerName: 'Industry', field: 'industry', flex: 2 },
            { headerName: 'Opening Price', field: 'open', flex: 1 },
            { headerName: 'Max Price', field: 'high', flex: 1 },
            { headerName: 'Min Price', field: 'low', flex: 1 },
            { headerName: 'Closing Price', field: 'close', flex: 1 },
            { headerName: 'Volumes', field: 'volumes', flex: 1 }
        ];


    }
    else {
        url = `http://131.181.190.87:3000/stocks/authed/${search}?from=${start}&to=${end}`
        columns = [
            { headerName: 'Date', field: 'timestamp', flex: 2 },
            { headerName: 'Stock', field: 'symbol', flex: 1 },
            { headerName: 'Name', field: 'name', flex: 1 },
            { headerName: 'Industry', field: 'industry', flex: 2 },
            { headerName: 'Opening Price', field: 'open', flex: 1 },
            { headerName: 'Max Price', field: 'high', flex: 1 },
            { headerName: 'Min Price', field: 'low', flex: 1 },
            { headerName: 'Closing Price', field: 'close', flex: 1 },
            { headerName: 'Volumes', field: 'volumes', flex: 1 }
        ];

        chart = true;
    }

    useEffect(() => {

        if (search === '' || start !== '') {
            fetch(url, { headers })
                .then(res => res.json())
                .then(data => data)
                .then(val =>
                    val.map(stock => {
                        let date = new Date(stock.timestamp).toDateString();
                        return {
                            timestamp: date,
                            symbol: stock.symbol,
                            name: stock.name,
                            industry: stock.industry,
                            open: stock.open,
                            high: stock.high,
                            low: stock.low,
                            close: stock.close,
                            volumes: stock.volumes
                        };
                    })
                )
                .then(stocks => setRowData(stocks))
        }
        else {
            fetch(url, { headers })
                .then(res => res.json())
                .then(data => [data])
                .then(val =>
                    val.map(stock => {
                        let date = new Date(stock.timestamp).toDateString();
                        return {
                            timestamp: date,
                            symbol: stock.symbol,
                            name: stock.name,
                            industry: stock.industry,
                            open: stock.open,
                            high: stock.high,
                            low: stock.low,
                            close: stock.close,
                            volumes: stock.volumes
                        };
                    })
                )
                .then(stocks => setRowData(stocks))
        }

    }, [url]);


    chartData = {
        labels: rowData.map((data) => new Date(data.timestamp).toDateString()),
        datasets: [
            {
                label: "High Price",
                data: rowData.map((data) => data.high),
            },
        ],
    };

    return (
        <div className="Pricepage" id="history">
            <h1>Price History</h1>
            <Container>
                <Label for="Table">All most recent data collected for specified company over selected timeframe. Please login to use this service.</Label>
                <Label for="Table">If no start and end date selected, data will be displayed for most recent data point only.</Label>
                <Label for="Table">If no end date selected, data will be displayed from start date until end of the data (24th March 2020).</Label>
                <SearchBar onSubmit={setSearch} />
                <DateSelect />
                <div className="ag-theme-balham" style={{ height: "500px", paddingTop: "1%" }}>
                    <AgGridReact columnDefs={columns} rowData={rowData} pagination={false} />
                </div>
                <LineChart />
            </Container>
        </div>
    )
}

function LineChart() {
    if (chart) {
        return (
            <Line data={chartData} />
        );
    }
    else {
        return (null);
    }
}