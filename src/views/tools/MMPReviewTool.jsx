import * as React from "react";

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
              <select className="custom-select" id="year" name="year" required>
                <option selected>2017</option>
                <option>2014</option>
                <option>2011</option>
                <option>2008</option>
                <option>2005</option>
                <option>2002</option>
                <option>1999</option>
                <option>1996</option>
              </select>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="threshold">
              <span className="input-label">Party vote threshold</span>
              <div className="input-group">
                <input className="form-control" type="number" id="threshold" name="threshold" max="100" min="0" step="1" value="5" required />
                <div className="input-group-addon">%</div>
              </div>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="overhang">
              <span className="input-label">Allow overhang seats</span>
              <input type="checkbox" className="custom-control-input" id="overhang" name="overhang" value="on" checked />
              <span className="custom-control-indicator"></span>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="tagAlong">
              <span className="input-label">Electorate tag-along</span>
              <input type="checkbox" className="custom-control-input" id="tagAlong" name="tagAlong" value="on" checked />
              <span className="custom-control-indicator"></span>
            </label>
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="tagAlongSeats">
              <span className="input-label">Seats for tag-along</span>
              <input className="form-control" type="number" id="tagAlongSeats" name="tagAlongSeats" max="120" min="1" step="1" value="1" required />
            </label>
          </form>
        </div>

        <table className="table result-table">
          <colgroup>
            <col width="35%" />
            <col className="d-none d-sm-table-cell" width="13%" />
            <col className="d-none d-sm-table-cell" width="13%" />
            <col width="13%" />
            <col width="13%" />
            <col width="13%" />
          </colgroup>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th className="d-none d-sm-table-cell" scope="col">Votes</th>
              <th className="d-none d-sm-table-cell" scope="col">Electorates</th>
              <th scope="col">List <span className="d-none d-lg-inline">Seats</span></th>
              <th scope="col">Total <span className="d-none d-lg-inline">Seats</span></th>
              <th scope="col">Diff<span className="d-none d-md-inline">erence</span></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>&nbsp;</td>
              <td className="d-none d-sm-table-cell">1</td>
              <td className="d-none d-sm-table-cell">1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td className="d-none d-sm-table-cell" colSpan="2">&nbsp;</td>
              <th scope="row" colSpan="2">Gallagher Index</th>
              <td>1</td>
              <td>1</td>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <th scope="row">National Party <span className="swatch d-none d-sm-block" style={{ background: "#00529f" }}></span></th>
              <td className="d-none d-sm-table-cell">1,131,501</td>
              <td className="d-none d-sm-table-cell">41</td>
              <td>19</td>
              <td>6</td>
              <td></td>
            </tr>
            <tr className="success">
              <th scope="row">National Party <span className="swatch d-none d-sm-block" style={{ background: "#00529f" }}></span></th>
              <td className="d-none d-sm-table-cell">1,131,501</td>
              <td className="d-none d-sm-table-cell">41</td>
              <td>19</td>
              <td>6</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">National Party <span className="swatch d-none d-sm-block" style={{ background: "#00529f" }}></span></th>
              <td className="d-none d-sm-table-cell">1,131,501</td>
              <td className="d-none d-sm-table-cell">41</td>
              <td>19</td>
              <td>6</td>
              <td className="decrease">-1</td>
            </tr>
            <tr>
              <th scope="row">National Party <span className="swatch d-none d-sm-block" style={{ background: "#00529f" }}></span></th>
              <td className="d-none d-sm-table-cell">1,131,501</td>
              <td className="d-none d-sm-table-cell">41</td>
              <td>19</td>
              <td>6</td>
              <td className="increase">+2</td>
            </tr>
          </tbody>
        </table>

      </main>
    );
  }

}

export default MMPReviewTool;
