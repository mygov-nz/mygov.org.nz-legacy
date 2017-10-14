import * as React from 'react';

/**
 *
 */
class Layout extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const cdn = this.props.cdn;

    return (
      <html className="no-js" lang="en-NZ">
          <head>
              <title>{this.props.title}</title>
              <meta charSet="utf-8" />
              <meta httpEquiv="x-ua-compatible" content="ie=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content={this.props.description} />
              <meta name="theme-color" content="#f89828" />
              <meta name="msapplication-config" content={`${cdn}/browserconfig.xml`} />
              <link rel="stylesheet" href={`${cdn}/css/style.css`} />
              <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700&amp;subset=latin-ext" />
              <link rel="manifest" href={`${cdn}/manifest.json`} />
              <link rel="apple-touch-icon" href={`${cdn}/apple-touch-icon.png`} />
              <link rel="mask-icon" href={`${cdn}/images/pinned-tab-icon.svg`} color="#f89828" />
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
                      {/* <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                      </li> */}
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/tools" id="navbar-tools" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tools</a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-tools">
                          <a className="dropdown-item active" href="#">MMP Review Tool</a>
                          <a className="dropdown-item" href="#">Non-voters Tool</a>
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

              <script dangerouslySetInnerHTML={{ __html: "window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;ga('create','UA-45926000-1','auto');ga('send','pageview')" }} />
              <script src={`${cdn}/js/behaviour.js`} async></script>
              <script src={`${cdn}/js/mmp-review-tool.js`} async></script>
              <script src="http://google-analytics.com/analytics.js" async defer></script>
          </body>
      </html>
    );
  }

}

export default Layout;
