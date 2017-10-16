import * as React from "react";
import { differenceClasses, differenceValue } from "../../utils";

/**
 * [ComparisonRow description]
 *
 * @param {[type]} props [description]
 */
const ComparisonRow = props => (
  <tr className={ props.totalSeats ? 'success' : '' }>
    <th scope="row">
      { props.name }
      <span className="swatch d-none d-sm-block" style={{ background: `#${ props.swatch }` }} />
    </th>
    <td className="d-none d-sm-table-cell">{ props.votes.toLocaleString() }</td>
    <td className="d-none d-sm-table-cell">{ props.electorateSeats }</td>
    <td>{ props.listSeats }</td>
    <td>{ props.totalSeats }</td>
    <td className={ differenceClasses(props.seatDifference) }>{ differenceValue(props.seatDifference, 0) }</td>
  </tr>
);

export default ComparisonRow;
