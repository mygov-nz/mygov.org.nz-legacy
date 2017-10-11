import * as React from "react";
import ResultTable from "./widgets/ResultTable";
import { getYears } from "data";
import * as constants from 'public/js/non-voters-tool/constants';

/**
 *
 */
class NonVotersTool extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <main className="container-fluid">

        <header className="mg-page-header">
          <h1>Non-voters Tool</h1>
        </header>

        <p>This tool was created to allow users to evaluate the possible effects of hypothetical situations where non-voters had instead chosen to vote.</p>

        <div className="card form-card">
          <form className="row">
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="year">
              <span className="input-label">Data year</span>
              <select className="custom-select" id="year" name="year" required value={this.props.params.year} onChange={this.props.handlers.setYear}>
                { getYears().map(year => <option key={year}>{year}</option>) }
              </select>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="party">
              <span className="input-label">Assign votes to</span>
              <select className="custom-select" id="party" name="party" required value={this.props.params.party} onChange={this.props.handlers.setParty}>
                <option value={constants.PARTY_NOBODY}>{constants.PARTY_NAMES[constants.PARTY_NOBODY]}</option>
                <option value={constants.PARTY_NEW}>{constants.PARTY_NAMES[constants.PARTY_NEW]}</option>
                <option value={constants.PARTY_NEW_NO_LIST}>{constants.PARTY_NAMES[constants.PARTY_NEW_NO_LIST]}</option>
                <optgroup label="Political parties">
                  { this.props.rows.map(row => <option key={row.id} value={row.id}>{row.name}</option>) }
                </optgroup>
              </select>
            </label>
            <label className="d-none d-md-block col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="unenrolled">
              <span className="input-label">Include unenrolled voters</span>
              <input type="checkbox" className="custom-control-input" id="unenrolled" name="unenrolled" value="on" checked={this.props.params.unenrolled} onChange={this.props.handlers.setUnenrolled} />
              <span className="custom-control-indicator"></span>
            </label>
            <label className="col-sm-12 col-xl form-group custom-rangeslider" htmlFor="votes">
              <span className="input-label">Percentage</span>
              <input type="hidden" id="votes" name="votes" step="5" max="100" min="0" required value={this.props.params.votes} onChange={this.props.handlers.setVotes} />
              <div className="rangeslider">
                <div className="fill" style={{ width: `${this.props.params.votes}%` }}></div>
                <div className="handle" style={{ left: `${this.props.params.votes}%` }}>{this.props.params.votes}%</div>
              </div>
            </label>
          </form>
        </div>

        <ResultTable {...this.props} />

      </main>
    );
  }

}

export default NonVotersTool;
