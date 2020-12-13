import React, { Component } from 'react';

export class SpotifyAlbums extends Component {
    static displayName = SpotifyAlbums.name;

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            imageUrls: []
        }

        console.log(this.props.accessToken);
	}

    getAlbums = () => {
        const clientId = '2f3a2522636a462bacba59f79acfe305';

        var endpoint = 'https://api.spotify.com/v1/me/albums';
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.accessToken
            },
        };
        fetch(endpoint, options)
            .then((resp) => resp.text())
            .then((respJson) => {
                console.log(respJson);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    componentDidMount() {
        this.getAlbums();
	}

    render() {
        return (
            <div>

            </div>
        );
    }
}
