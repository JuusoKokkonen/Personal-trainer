import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import Addtraining from './Addtraining';


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings, []);
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data.content)
            console.log(trainings)
        })
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "date": training.date,
                "activity": training.activity,
                "duration": training.duration,
                "customer": "https://customerrest.herokuapp.com/api/customers/220"
            }
        })
        .then(res => fetchTrainings())
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm("Delete this training from the system?")) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchTrainings())
            .catch(err => console.error(err))
        }
    }

    const dateFormat = (date) => {
        var dateMoment = Moment(date)
        var dateFormatted = dateMoment.utc().format('YYYY-MM-DD HH:mm');
        return (
            <div>{dateFormatted}</div>
        )
    }

    const columns = [
        {
            Header: "Date",
            accessor: "date",
            Cell: ({value}) => dateFormat(value)
        },
        {
            Header: "Duration (minutes)",
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
            <div>
            <p>If there is no data, press here to refresh</p>
            <button onClick={fetchTrainings}>Refresh</button>
            </div>
            <Addtraining saveTraining={saveTraining}/>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
}