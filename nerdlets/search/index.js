import React from 'react';
import { Grid, GridItem, TextField, NerdletStateContext, EntityByGuidQuery } from 'nr1';
import Filter from "./components/filter";
import Contents from "./components/contents";
import Helmet from 'react-helmet';
import mapper from './data/FilterMapper.json'

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class SearchNerdlet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      isEntityView: true
    }
  }

  componentDidMount() {
    NerdletStateContext.Consumer.subscribe((state)=>{
      if (state.entityGuid) {
        this.setState({ filter: mapper[atob(state.entityGuid).split('|')[1]], isEntityView: true});
      } else {
        this.setState({ isEntityView: false});
      }
    })
  }

  onChangeFilter(course) {
    this.setState({ filter: course})
  }
  render() {
    const { filter, isEntityView } = this.state;
    return (
      <div className='learning'>
        {false &&
        <div className='searchBar'>
          <TextField className='searchField' type={TextField.TYPE.SEARCH}
                     onChange={(e) => this.setState({searchKey: e.target.value})}
                     placeholder="e.g. 100,200, APM,Browser" autoFocus/>
        </div>
        }
        <div className='mainContents'>
        <Grid fullHeight fullWidth >
          {!isEntityView && (
          <GridItem columnSpan={2}>
            <Filter onChangeFilter={course => this.onChangeFilter(course)} />
          </GridItem>
          )}
          <GridItem columnSpan={10}>
            <Contents filter={filter} isEntityView={isEntityView}/>
          </GridItem>
        </Grid>
        </div>
        <Helmet>
          <script src="//fast.wistia.com/assets/external/E-v1.js" async></script>
        </Helmet>

      </div>
    );
  }
}
