import React, { Component } from 'react';
import Keen from 'keen-tracking';
import MobileDetect from 'mobile-detect';


function initKeen () {
    const md = new MobileDetect();
    if (md.is('bot')) {
      return false;
    }

    const helpers = Keen.helpers;
    const utils = Keen.utils;

    const sessionCookie = utils.cookie('session-cookie');
    if (!sessionCookie.get('guest_id')) {
      sessionCookie.set('guest_id', helpers.getUniqueId());
    }

    const keenClient = new Keen({
      projectId: '59fc940bc9e77c0001098872',
      writeKey: '0D6811CCFE788176D79CB184A6F6F3E1987B348A19D426FE11B87FEF66CA40E19C8FF3D6C1C522AF7BAEF628085CA0C6E0A2B9ED870E2C94582E0B1DC001FDB73FE8D3DCB466A4E203E105B0A518EDE3E16F04A4BDC0E4A22B3C8392783387F6',
      host: 'api.keen.io',
      protocol: 'https',
      requestType: 'jsonp'
    });
    
    const debug = process.env.NODE_ENV === 'development';
    // // Optionally prevent recording in dev mode
    // Keen.enabled = true; 
    
    // Display events in the browser console
    if (debug) {
      Keen.debug = true;
      keenClient.on('recordEvent', Keen.log);
      keenClient.on('recordEvents', Keen.log);
    }
    
    // Add custom properties to all events 
    keenClient.extendEvents(() => {
      return {
        geo: {
          info: { /* Enriched */ },
          ip_address: '${keen.ip}',
        },
        page: {
          info: { /* Enriched */ },
          title: document.title,
          url: document.location.href
        },
        referrer: {
          info: { /* Enriched */ },
          url: document.referrer
        },
        tech: {
          browser: helpers.getBrowserProfile(),
          info: { /* Enriched */ },
          user_agent: '${keen.user_agent}',
          device_type: md.tablet() ? 'tablet' : md.mobile() ? 'mobile' : 'desktop'
        },
        time: helpers.getDatetimeIndex(),
        visitor: {
          guest_id: sessionCookie.get('guest_id')
          /* Include additional visitor info here */
        },
        keen: {
          addons: [
            {
              name: 'keen:ip_to_geo',
              input: {
                ip: 'geo.ip_address'
              },
              output : 'geo.info'
            },
            {
              name: 'keen:ua_parser',
              input: {
                ua_string: 'tech.user_agent'
              },
              output: 'tech.info'
            },
            {
              name: 'keen:url_parser',
              input: {
                url: 'page.url'
              },
              output: 'page.info'
            },
            {
              name: 'keen:referrer_parser',
              input: {
                referrer_url: 'referrer.url',
                page_url: 'page.url'
              },
              output: 'referrer.info'
            },
            {
              "name": "keen:date_time_parser",
              "input": {
                "date_time": "keen.timestamp"                                
              },
              "output": "timestamp_info"
            }
          ]
        }
      };
    });

    /*
    There are two ways to record an event. You can do it here with DOM selectors (see below),
    or you can do it inside the code where you have access to stuff like state and props.
    */

    // Keen.listenTo({
    //   'click .action_button, .action_button *': function(e){
    //     console.log('currentTarget: ', e.currentTarget); // returns #document. If you need currentTarget, see my implementation below
    //   }
    // });

    /* DOM Event Capturing - preserves event.currentTarget */
    // window.onload = ()=> {
    //   const resourceButtons = document.querySelectorAll('.action_button');
    //   resourceButtons.forEach( (button) => {
    //     button.addEventListener('click', (e) => {
    //       console.log(e.currentTarget); // will return the node the listener is attached to, even if you click a child
    //     });
    //   });
    // };
    return keenClient;
  }
export const keenClient = initKeen();


/* HOC for tracking page views with React Router */
export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => { //eslint-disable-line no-unused-vars
    keenClient.recordEvent('pageviews', {...options});
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};




/*
TODO
----
- hide writeKey
*/
