import * as React from "react";
import ComparisonTable from "views/widgets/ComparisonTable";
import { getYears } from "data";

/**
 *
 */
class MMPReviewTool extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <main className="container-fluid">

        <header className="mg-page-header">
          <h1>MMP Review Tool</h1>
        </header>

        <p>This tool was created to allow users to evaluate the possible effects of changes to rules determining the outcome of a New Zealand General Election.</p>

        <div className="card form-card">
          <form className="row">
            <label className="col-sm-12 col-md-8 col-xl form-group" htmlFor="year">
              <span className="input-label">Data year</span>
              <select className="custom-select" id="year" name="year" required value={this.props.params.year} onChange={this.props.handlers.setYear}>
                { getYears().map(year => <option key={year}>{year}</option>) }
              </select>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="threshold">
              <span className="input-label">Party vote threshold</span>
              <div className="input-group">
                <input className="form-control" type="number" id="threshold" name="threshold" max="100" min="0" step="1" required value={this.props.params.threshold} onChange={this.props.handlers.setThreshold} />
                <div className="input-group-addon">%</div>
              </div>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="overhang">
              <span className="input-label">Allow overhang seats</span>
              <input type="checkbox" className="custom-control-input" id="overhang" name="overhang" value="on" checked={this.props.params.overhang} onChange={this.props.handlers.setOverhang} />
              <span className="custom-control-indicator"></span>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="tagAlong">
              <span className="input-label">Electorate tag-along</span>
              <input type="checkbox" className="custom-control-input" id="tagAlong" name="tagAlong" value="on" checked={this.props.params.tagAlong} onChange={this.props.handlers.setTagAlong} />
              <span className="custom-control-indicator"></span>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="tagAlongSeats">
              <span className="input-label">Seats for tag-along</span>
              <input className="form-control" type="number" id="tagAlongSeats" name="tagAlongSeats" max="120" min="1" step="1" required value={this.props.params.tagAlongSeats} onChange={this.props.handlers.setTagAlongSeats} />
            </label>
          </form>
        </div>

        <ComparisonTable {...this.props} />

      </main>
    );
  }

}

export default MMPReviewTool;
