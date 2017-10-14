import * as React from 'react';
import Slider from 'react-rangeslider';
import { getYears } from '../../data';
import * as constants from '../../lib/tools/non-voters-tool/constants';
import ComparisonTable from '../widgets/ComparisonTable';

/**
 *
 */
class NonVotersTool extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const parties = this.props.rows
      .map(party => { return { id: party.id, name: party.name }; })
      .filter(party => party.id.slice(0, 1) !== '@')
      .sort((a, b) => a.name > b.name ? 1 : -1);

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
                  { parties.map(row => <option key={row.id} value={row.id}>{row.name}</option>) }
                </optgroup>
              </select>
            </label>

            {/* <label className="d-none d-md-block col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="unenrolled">
              <span className="input-label">Include unenrolled voters</span>
              <input type="checkbox" className="custom-control-input" id="unenrolled" name="unenrolled" value="on" checked={this.props.params.unenrolled} onChange={this.props.handlers.setUnenrolled} />
              <span className="custom-control-indicator"></span>
            </label> */}

            <label className="col-sm-12 col-md-4 col-xl form-group custom-rangeslider" htmlFor="votes">
              <span className="input-label">Percentage</span>
              <input type="hidden" id="votes" name="votes" defaultValue={this.props.params.votes} />
              <Slider
                handleLabel={`${this.props.params.votes}%`}
                max={100}
                min={0}
                onChange={this.props.handlers.setVotes}
                orientation={'horizontal'}
                step={5}
                tooltip={false}
                value={this.props.params.votes}
              />
            </label>

          </form>
        </div>

        <ComparisonTable {...this.props} />

      </main>
    );
  }

}

export default NonVotersTool;
