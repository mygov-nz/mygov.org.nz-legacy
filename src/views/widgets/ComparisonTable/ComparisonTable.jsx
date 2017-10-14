import * as React from "react";
import ComparisonRow from "./ComparisonRow";
import { differenceClasses, differenceValue, roundFloat } from "utils";

/**
 *
 */
class ComparisonTable extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <table className="table comparison-table">
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
            <td className="d-none d-sm-table-cell">{ this.props.totalVotes.toLocaleString() }</td>
            <td className="d-none d-sm-table-cell">{ this.props.totalElectorateSeats }</td>
            <td>{ this.props.totalListSeats }</td>
            <td>{ this.props.totalSeats }</td>
            <td className={ differenceClasses(this.props.seatDifference) }>{ differenceValue(this.props.seatDifference, 0) }</td>
          </tr>
          <tr>
            <td className="d-none d-sm-table-cell" colSpan="2">&nbsp;</td>
            <th scope="row" colSpan="2">Gallagher Index</th>
            <td>{ roundFloat(this.props.gallagherIndex) }</td>
            <td className={ differenceClasses(this.props.gallagherIndexDifference, "gallagher-") }>{ differenceValue(this.props.gallagherIndexDifference) }</td>
          </tr>
        </tfoot>
        <tbody>
          { this.props.rows.sort((a, b) => a.votes > b.votes ? -1 : 1).map(this.renderRow) }
        </tbody>
      </table>
    );
  }

  /**
   *
   * @param {object} row
   * @returns {JSX.Element}
   */
  renderRow(row) {
    return (
      <ComparisonRow key={ `party-${ row.id }` } {...row} />
    );
  }

}

export default ComparisonTable;
