import './App.css';

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import qs from 'qs';

import ColorPicker from './components/ColorPicker/ColorPicker';
import EmojiPicker from './components/EmojiPicker/EmojiPicker';
import Tracks from './components/Tracks/Tracks';
import Header from './components/Header/Header';

function App() {
	

	//dotenv variables
	const clientId = "38c9b6bdc33543008b4d8e7686ef895f";
	const clientSecret = "9106fd2b362e4a6490acd9339065e914";

	// Set up states for retrieving access token and top tracks
	const [token, setToken] = useState('')
	const [tracks, setTracks] = useState([]);

	// State for choosing a color
	const [color, setColor] = useState('');

	// State for choosing an emoji
	const [emoji, setEmoji] = useState('');

	// variables for api call
	const genre = emoji;
	const tempo = color;

	const getAuth = async () => {
		axios.get(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=https%3A%2F%2Fsick-of-it.herokuapp.com%2F`).then(res =>{
			console.log(res);
		})
	}

	const getToken = async () => {
		
		const headers = {
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		  },
		  auth: {
			username: clientId,
			password: clientSecret,
		  },
		};

		const data = {
		  grant_type: 'client_credentials',
		};
	  
		try {
		  const response = await axios.post(
			'https://accounts.spotify.com/api/token',
			qs.stringify(data),
			headers
		  );
		  console.log(response.data.access_token);
		  setToken(response.data.access_token)
		  return response.data.access_token;
		} catch (error) {
		  console.log(error);
		}
	  };

	useEffect(()=>{
		  
		  getAuth();
		  getToken();

		  const getTracks = () => {
				axios.get(`https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=${genre}&seed_tracks=0c6xIDDpzE81m2q797ordA&max_tempo=${tempo}`,{
					'method': 'GET',
					'headers': {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					}
				}).then(trackResponse => {
					console.log(trackResponse.data.tracks);
					setTracks(trackResponse.data.tracks);
				}).catch(error => {
					console.log(error)
				})
			}	

			getTracks();
	}, [emoji])
// add emoji to above square brackets once API call is settled
  const colorChoice = colorPick => {
	setColor(colorPick);
  }

  const emojiChoice = emojiPick => {
	setEmoji(emojiPick);
  }

  return (
    <div className="App">
	  <Header />
      <ColorPicker color={color} colorChoice={colorChoice} />
      <EmojiPicker emoji={emoji} emojiChoice={emojiChoice} />
	  {emoji 
		? <Tracks tracks={tracks} />
		: null
	  }
    </div>
  );
}

export default App;
