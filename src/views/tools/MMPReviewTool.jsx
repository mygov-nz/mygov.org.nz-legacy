import React, { PureComponent } from 'react';
import { getYears } from '../../data';
import ComparisonTable from '../widgets/ComparisonTable';

/**
 *
 */
class MMPReviewTool extends PureComponent {

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
                <div className="input-group-append">
                  <div className="input-group-text">%</div>
                </div>
              </div>
            </label>

            <label className="col-sm-6 col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="overhang">
              <input type="checkbox" className="custom-control-input" id="overhang" name="overhang" value="on" checked={this.props.params.overhang} onChange={this.props.handlers.setOverhang} />
              <span className="custom-control-label">Allow overhang seats</span>
            </label>

            <label className="col-sm-6 col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="tagAlong">
              <input type="checkbox" className="custom-control-input" id="tagAlong" name="tagAlong" value="on" checked={this.props.params.tagAlong} onChange={this.props.handlers.setTagAlong} />
              <span className="custom-control-label">Electorate tag-along</span>
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

  /**
   * [shouldComponentUpdate description]
   *
   * @param  {{ params: {} }} nextProps [description]
   * @return bool
   */
  shouldComponentUpdate(nextProps) {
    const params = this.props.params;
    const nextParams = nextProps.params;

    return nextParams.overhang !== params.overhang
      || nextParams.tagAlong !== params.tagAlong
      || nextParams.tagAlongSeats !== params.tagAlongSeats
      || nextParams.threshold !== params.threshold
      || nextParams.year !== params.year;
  }

}

export default MMPReviewTool;
