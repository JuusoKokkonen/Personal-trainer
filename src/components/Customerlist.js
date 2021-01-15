import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button'
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';

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

    const deleteCustomer = (link) => {
        if (window.confirm("Delete this customer from the system?")) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
        }
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
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
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: "links[0].href",
            Cell: ({value}) => <Button color="secondary" size="small" onClick={() => deleteCustomer(value)}>Delete</Button>
        },
    ]

    return (
        <div>
            <h1>Customers</h1>
            <div>
            <p>If there is no data, press here to refresh</p>
            <button onClick={fetchCustomers}>Refresh</button>
            </div>
            <Addcustomer saveCustomer={saveCustomer}/>
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}