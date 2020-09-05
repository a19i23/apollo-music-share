import React from 'react';
import Header from './components/Header';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import SongReducer from './reducer';

export const SongContext = React.createContext({
  song: {
    id: '03375c9f-8f75-482a-9661-3b5832dfb45e',
    title: 'Bisou sur la joue',
    artist: 'LÜNE',
    thumbnail:
      'https://i1.sndcdn.com/artworks-TcmHyFud1i2NYVYe-kjZ5GA-t500x500.jpg',
    url: 'https://soundcloud.com/lunemusique/bisou-sur-la-joue-1',
    duration: 250,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(SongReducer, initialSongState);

  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? { position: 'fixed', width: '100%', right: 0, top: 70 }
              : { position: 'fixed', width: '100%', left: 0, bottom: 0 }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
