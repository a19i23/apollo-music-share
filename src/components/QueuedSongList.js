import React from 'react';
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));
const song = {
  title: '10,000 days',
  artist: 'Tool',
  thumbnail: 'https://img.youtube.com/vi/--ZtUFsIgMk/0.jpg',
};

const QueuedSongList = (props) => {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    greaterThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color="textSecondary" variant="button">
          {' '}
          Queue (5){' '}
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
};

function QueuedSong({ song }) {
  const classes = useStyles();
  const { title, thumbnail, artist } = song;

  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.text}
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;