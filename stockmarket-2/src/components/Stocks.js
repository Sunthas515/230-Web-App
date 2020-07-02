import React, { useState, useEffect } from 'react';
import { Container, Label } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SearchBar from './Searchbar'

export default function Stocks() {

    const [search, setSearch] = useState('');
    const [rowData, setRowData] = useState([]);


    const columns = [
        { headerName: "Company", field: "name", flex: 1 },
        { headerName: "Symbol", field: "symbol", flex: 1 },
        { headerName: "Industry", field: "industry", flex: 1 }
    ];

    let url = ''

    if (search === '') {
        url = `http://131.181.190.87:3000/stocks/symbols`
    }
    else {
        url = `http://131.181.190.87:3000/stocks/symbols?industry=${search}`
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then(data =>
                data.map(stock => {
                    return {
                        name: stock.name,
                        symbol: stock.symbol,
                        industry: stock.industry
                    };
                })
            )
            .then(stocks => setRowData(stocks))
            .catch({})
    }, [url]);

    return (
        <div className="Stockspage" id="stocks">
            <h1>Stocks</h1>
            <Container>
                <Label for="Search">Search by industry and have stocks information displayed in the table below</Label>
                <SearchBar onSubmit={setSearch} />
                <div className="ag-theme-balham" style={{ height: "500px", paddingTop: "1%" }}>
                    <AgGridReact columnDefs={columns} rowData={rowData} pagination={true} />
                </div>
            </Container>

        </div>
    )
}