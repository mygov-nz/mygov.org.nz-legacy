import * as React from "react";

/**
 * [Tools description]
 *
 * @param {[type]} props [description]
 */
const Tools = props => (
  <main className="container-fluid">

    <header className="mg-page-header">
      <h1>Tools</h1>
    </header>

    <ul className="row tool-list">
      <li className="col">
        <a href="/tools/non-voters">Non-voters Tool</a>
      </li>
      <li className="col">
        <a href="/tools/mmp-review">MMP Review tool</a>
      </li>
    </ul>

  </main>
);

export default Tools;
