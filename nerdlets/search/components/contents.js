import React from 'react';
import { UserQuery, AccountsQuery } from 'nr1';
import Helmet from "react-helmet";
// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Contents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: '',
      id: '',
      account: ''
    }
  }

  componentDidMount() {
    fetch('https://link.nrug.nrkk.technology/files/contents.json')
      .then(res=>res.json()).then(data=>this.setState({ data }));

    UserQuery.query().then(({ data }) => this.setState({ id: data.id}));
    setTimeout(()=> {
      AccountsQuery.query().then(({ data }) => {data[0] && this.setState({ account: data[0].id })});
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.filter !== prevProps.filter) {
      this.setState({ filter: this.props.filter });
    }
  }

  render() {
    const { filter, id, account, data } = this.state;
    const contentsData = data;
    return (
      <div className="contents">
        {contentsData.filter(content => content.course === filter || (filter.length == 0)).map(data=>(
          <div className="contentItem">
            <div className="contentName">{data.title}</div>
            {data.mediaid.length > 0 && (
              <>
                <Helmet>UserQuery
                  <script src={`//fast.wistia.com/embed/medias/${data.mediaid}.jsonp`} async></script>
                </Helmet>
                <span style={{
                  "display": "inline-block",
                  "height": "360px",
                  "width": "640px",
                  "max-width": "100%",
                  "max-height": "calc(100vw * 0.5625)"
                }} onClick={()=>fetch(`https://link.nrug.nrkk.technology/files/track.json?id=${id}&account=${account}&mediaid=${data.mediaid}&title=${encodeURI(data.title)}`)}
                      className={`jsx-3348195404 wistia_embed wistia_async_${data.mediaid} hashedId=${data.mediaid} popover=true seo=false`}></span>
              </>)
            }
            <div className="contentMeta">
              <div className="contentTags">
                {[data.course, ...data.categories, data.level].map(t=>(
                  <div className="tag">{t}</div>
                ))}
              </div>
              <div className="contentUserInfo">
                <div className="lastseen"></div>
                <div className="thumbsUp"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
