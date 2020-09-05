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
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/queries';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';
import { SongContext } from '../App';

const SongList = (props) => {
  const { data, loading, error } = useSubscription(GET_SONGS);

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

  if (error) return <div>Error fetching songs</div>;
  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
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
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const { state, dispatch } = React.useContext(SongContext);
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);
  const classes = useStyles();
  const { thumbnail, title, artist } = song;

  function handleTogglePlay() {
    dispatch({ type: 'SET_SONG', payload: { song } });
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
  }

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typname: 'Song' } },
    });
  }

  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && song.id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [setCurrentSongPlaying, song.id, state.isPlaying, state.song.id]);

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
            <IconButton size="small" color="primary" onClick={handleTogglePlay}>
              {currentSongPlaying ? <Pause> </Pause> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size="small"
              color="secondary"
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
