import * as React from 'react';
import classNames from 'classnames';
import manifest from '../rev-manifest.json';

function asset(name) {
  return (manifest[name] === undefined) ? name : manifest[name];
}

/**
 *
 */
class Layout extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <html lang="en-NZ">
          <head>
              <title>{this.props.title}</title>
              <meta charSet="utf-8" />
              <meta httpEquiv="x-ua-compatible" content="ie=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content={this.props.description} />
              <meta name="theme-color" content="#f89828" />
              <meta name="msapplication-config" content="/browserconfig.xml" />
              <link rel="stylesheet" href={`/${asset('css/style.css')}`} />
              <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700&amp;subset=latin-ext" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
              <link rel="mask-icon" href="/images/pinned-tab-icon.svg" color="#f89828" />
          </head>
          <body>
              <a className="skippy sr-only sr-only-focusable" href="#content">Skip to main content</a>

              <header>
                <nav className="navbar navbar-expand-sm navbar-dark mg-navbar">
                  <a className="navbar-brand" href="#" rel="home">MyGov</a>

                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item dropdown">
                        <a className={classNames('nav-link dropdown-toggle', { active: this.props.nav === 'tools' })} href="/tools" id="navbar-tools" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tools</a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-tools">
                          <a className={classNames('dropdown-item', { active: this.props.nav === 'tools/mmp-review' })} href="/tools/mmp-review">MMP Review Tool</a>
                          <a className={classNames('dropdown-item', { active: this.props.nav === 'tools/non-voters' })} href="/tools/non-voters">Non-voters Tool</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>

              <div id="content">
                {this.props.children}
              </div>

              <footer className="mg-footer">
                <a href="https://mygov.org.nz">mygov.org.nz</a>
              </footer>

              <script src={`/${asset('js/vendor.js')}`}></script>
              <script src={`/${asset('js/behaviour.js')}`}></script>
              {(this.props.scripts || []).map(src => <script key={src} src={`/${asset(src)}`} />)}
              <script dangerouslySetInnerHTML={{ __html: "window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;ga('create','UA-45926000-1','auto');ga('send','pageview')" }} />
              <script src="//google-analytics.com/analytics.js" async defer></script>
              <script dangerouslySetInnerHTML={{ __html: "if(navigator.serviceWorker){navigator.serviceWorker.register('/sw.js').catch(function(err){console.error('Unable to register service worker.',err)})}" }} />
          </body>
      </html>
    );
  }

}

export default Layout;
