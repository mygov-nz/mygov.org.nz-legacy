import React from "react";

/**
 * Tools
 *
 * @param {{}} props
 * @returns {JSX.Element}
 */
export default function Tools (props) {
  return (
    <main className="container-fluid">

      <header className="mg-page-header">
        <h1>Tools</h1>
      </header>

      <ul className="row tool-list">
        <li className="col">
          <a href="/tools/mmp-review">MMP Review tool</a>
        </li>
        <li className="col">
          <a href="/tools/non-voters">Non-voters Tool</a>
        </li>
      </ul>

    </main>
  );
}
