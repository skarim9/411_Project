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
            })
            .catch((err) => {
                console.log(err);
            });

    };

    componentDidMount() {
        this.getAlbums();
	}

    imgClicked = (ev) => {
        const imgElem = ev.target;
        imgElem.src = '/jbconv.jpg';
    };

    render() {
        return (
            <div>
                {this.state.imageUrls.map(url => (
                    <img onClick={this.imgClicked} src={url} width={150} />
                ))}
            </div>
        );
    }
}
