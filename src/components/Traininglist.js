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

    const deleteTraining = (link) => {
        if (window.confirm("Delete this training from the system?")) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchTrainings())
            .catch(err => console.error(err))
        }
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
        {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: ({value}) => <Button color="secondary" size="small" onClick={() => deleteTraining(value)}>Delete</Button>
    },
        
    ]

    return (
        <div>
            <h1>Trainings</h1>
            <button onClick={fetchTrainings}>Refresh</button>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}