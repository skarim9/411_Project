import React, { Component } from 'react';

export class SpotifyAlbums extends Component {
    static displayName = SpotifyAlbums.name;

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            imageUrls: [],
            imageJSX: <p>nothin here</p>
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
            .then((resp) => resp.json())
            .then((respJson) => {
                //console.log(JSON.stringify(respJson));
                /*
                this.setState({
                    albums: respJson.items
                });
                
                for (const album in respJson['items']) {
                    console.log(JSON.stringify(album));
                    console.log(album['images'][0]['url']);
                    this.setState((state) => {
                        return {
                            imageUrls: [
                                ...state.imageUrls,
                                album['images'][0]['url']
                            ]
                        }
					});
				}
                */
                respJson['items'].forEach((album) => {
                    console.log(album['album']['images'][0]['url']);
                    this.setState((state) => {
                        return {
                            imageUrls: [
                                ...state.imageUrls,
                                album['album']['images'][0]['url']
                            ],
                            imageJSX: state.imageJSX + <img src={album['album']['images'][0]['url']}/>
						}
                    }, () => {
                            console.log(JSON.stringify(this.state));

                    });
                });
                //console.log(JSON.stringify(respJson['items'][0]['album']['images'][0]));
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
                {this.state.imageUrls.map(url => (
                    <img src={url} width={150} />
                ))}
            </div>
        );
    }
}
