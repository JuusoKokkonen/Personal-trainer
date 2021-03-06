import React from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    })

    const handleClickOpen = () => {
        console.log(props.customer);
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return(
        <div>
        <Button style={{margin: 15}} variant="outlined" color="primary" onClick={handleClickOpen}>
            Add a new customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                label="firstname"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                label="lastname"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                label="streetaddress"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
            <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                label="streetaddress"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
            <TextField
                margin="dense"
                name="city"
                value={customer.city}
                label="city"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                label="email"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
            <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                label="phone"
                onChange={e => handleInputChange(e)}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}