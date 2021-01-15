import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';
import Button from '@material-ui/core/Button'


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data.content)
        })
    }

    const columns = [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Duration",
            accessor: "duration"
        },
        {
            Header: "Activity",
            accessor: "activity"
        },
        
    ]

    return (
        <div>
            <h1>Trainings</h1>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}