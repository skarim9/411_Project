import React, { Component } from 'react';

export class Spotify extends Component {
    static displayName = Spotify.name;

    login = () => {
        const clientId = '2f3a2522636a462bacba59f79acfe305';

        var authEndpoint = 'https://accounts.spotify.com/authorize?';
        authEndpoint += 'response_type=code';
        authEndpoint += '&client_id=' + encodeURIComponent(clientId);
        authEndpoint += '&scope=' + encodeURIComponent('user-read-private user-read-email');
        authEndpoint += '&redirect_uri=' + encodeURIComponent('https://localhost:44315/callback');
        authEndpoint += '&state=0';  //cheat

        window.location.href = authEndpoint;
    };

    render() {
        localStorage.removeItem('spotify_auth_code');
        const spotifyAuthCode = localStorage.getItem('spotify_auth_code');

        return (
            <div>
                {!spotifyAuthCode && <button onClick={this.login}>login to Spotify</button>}
                {spotifyAuthCode && <p>{spotifyAuthCode}</p>}
            </div>
        );
    }
}
