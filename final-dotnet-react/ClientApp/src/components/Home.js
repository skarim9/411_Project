import React, { Component } from 'react';
import { Spotify } from './Spotify';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
            <h1 style={{margin:'50px'}}>411 Final Project</h1>
            <Spotify />
      </div>
    );
  }
}
