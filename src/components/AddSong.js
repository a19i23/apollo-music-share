import React from 'react';
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '90%',
  },
}));

const AddSong = (props) => {
  const classes = useStyles();
  const [dialog, setDialog] = React.useState(false);

  function handleCloseDialog() {
    setDialog(false);
  }
  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img src="" alt="Song thumbnail" />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color="primary" variant="outlined">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        placeholder="Add YouTube or Soundcloud URL"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  );
};

export default AddSong;
