import React, { Component } from 'react';

export class Callback extends Component {
    static displayName = Callback.name;
    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        console.log(params.get('code'));
        if (params.has('code')) {
            localStorage.setItem('spotify_auth_code', params.get('code'));
        } else {
            window.location.href = '/';
        }

        const client_id = '2f3a2522636a462bacba59f79acfe305';
        const client_secret = '64abb8f97a2f484d85eafd337030b9ea';

        const body = new URLSearchParams();
        body.append('code', params.get('code'));
        body.append('redirect_uri', 'https://localhost:44315/callback');
        body.append('grant_type', 'authorization_code');
        const options = {
            method: 'POST',
            body: body.toString(),
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        fetch('https://accounts.spotify.com/api/token', options)
            .then((resp) => resp.json())
            .then((respJson) => {
                localStorage.setItem('spotify_access_token', respJson.access_token);
            })
            .catch((err) => {
                console.log(err);
            });
	}

    render() {
        return null;
    }
}
