import React, { Component } from 'react';
import { SpotifyAlbums } from './SpotifyAlbums';

export class Spotify extends Component {
    static displayName = Spotify.name;

    logout = () => {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_auth_code');
        window.location.href = '/';
    };

    login = () => {
        const clientId = '2f3a2522636a462bacba59f79acfe305';

        var authEndpoint = 'https://accounts.spotify.com/authorize?';
        authEndpoint += 'response_type=code';
        authEndpoint += '&client_id=' + encodeURIComponent(clientId);
        authEndpoint += '&scope=' + encodeURIComponent('user-read-private user-read-email user-library-read');
        authEndpoint += '&redirect_uri=' + encodeURIComponent('https://localhost:44315/callback');
        authEndpoint += '&state=0';  //cheat

        window.location.href = authEndpoint;
    };

    render() {
        const spotifyAuthToken = localStorage.getItem('spotify_access_token');

        return (
            <div>
                {!spotifyAuthToken && <button onClick={this.login}>login to Spotify</button>}
                {spotifyAuthToken && 
                    <div>
                        <SpotifyAlbums accessToken={spotifyAuthToken} />
                    </div>
                }
                <button onClick={this.logout}>logout</button>
            </div>
        );
    }
}
