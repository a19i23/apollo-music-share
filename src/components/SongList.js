import React from 'react';
import {
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';

const SongList = (props) => {
  const loading = false;

  const song = {
    title: '10,000 days',
    artist: 'Tool',
    thumbnail: 'https://img.youtube.com/vi/--ZtUFsIgMk/0.jpg',
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: 'flex',
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140,
  },
}));

function Song({ song }) {
  const classes = useStyles();
  const { thumbnail, title, artist } = song;
  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary">
              <PlayArrow />
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
