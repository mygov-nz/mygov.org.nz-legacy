import * as React from "react";
import { differenceClasses, differenceValue } from "utils";

/**
 *
 */
class ComparisonRow extends React.PureComponent {

  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    return (
      <tr className={ this.props.totalSeats ? 'success' : '' }>
        <th scope="row">
          { this.props.name }
          <span className="swatch d-none d-sm-block" style={{ background: `#${ this.props.swatch }` }}></span>
        </th>
        <td className="d-none d-sm-table-cell">{ this.props.votes.toLocaleString() }</td>
        <td className="d-none d-sm-table-cell">{ this.props.electorateSeats }</td>
        <td>{ this.props.listSeats }</td>
        <td>{ this.props.totalSeats }</td>
        <td className={ differenceClasses(this.props.seatDifference) }>{ differenceValue(this.props.seatDifference, 0) }</td>
      </tr>
    );
  }

}

export default ComparisonRow;
