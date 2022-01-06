import React from 'react';
import { Checkbox } from 'nr1';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filter: [],
      filterTag: ""
    };
  }

  componentDidMount() {
    //load tags and sort
    fetch('https://link.nrug.nrkk.technology/files/filter.json')
      .then(res=>res.json()).then(data=>this.setState({ filter: data.course }))

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.searchKey !== prevProps.searchKey) {
      //this.setState({ data: this.props.data });
    }
  }

  onChange(course) {
    this.setState({ filterTag: course})
    this.props.onChangeFilter(course);
  }

  render() {
    const { filterTag, filter } = this.state;

    //const levels = odata.reduce((r, d) =>{ r[d.level] = true; return r}, {})
    return (
      <div class='filter'>
        <div className="list">
          {filter.map(tag => (
            <Checkbox className='item' onChange={() => this.onChange(filterTag === tag.name ? '' : tag.name)} label={`${tag.name} (${tag.count})`} checked={filterTag === tag.name} />
          ))}
        </div>

      </div>
    );
  }
}
