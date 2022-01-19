import React from 'react';
import { TextField } from 'nr1';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data, tags } = this.state;
    return (
      <div class='searchBar'>
        <TextField type={TextField.TYPE.SEARCH} placeholder="e.g. 100,200, APM,Browser" autoFocus/>
      </div>
    );
  }
}
