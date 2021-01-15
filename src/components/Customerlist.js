import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button'

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomers, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => {
            setCustomers(data.content)
        })
    }

    const columns = [
        {
            Header: "First name",
            accessor: "firstname"
        },
        {
            Header: "Last name",
            accessor: "lastname"
        },
        {
            Header: "Address",
            accessor: "streetaddress"
        },
        {
            Header: "Postcode",
            accessor: "postcode"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Phone",
            accessor: "phone"
        },
    ]

    return (
        <div>
            <h1>Customers</h1>
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}