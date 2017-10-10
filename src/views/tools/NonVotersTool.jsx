import * as React from "react";

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
            <label className="col-sm-6 col-md-4 col-xl form-group" htmlFor="party">
              <span className="input-label">Assign votes to</span>
              <select className="custom-select" id="party" name="party" required>
                <option value="@no" selected>Nobody</option>
                <option value="@nw">A new party</option>
                <option value="@nn">A new party with no List MPs</option>
                <optgroup label="Political parties">
                  <option value="nat">National Party</option>
                  <option value="lab">Labour Party</option>
                  <option value="grn">Green Party</option>
                  <option value="nzf">New Zealand First Party</option>
                  <option value="con">Conservative Party</option>
                  <option value="ima">Internet MANA</option>
                  <option value="mri">Maori Party</option>
                  <option value="act">ACT New Zealand</option>
                  <option value="alc">Aotearoa Legalise Cannabis Party</option>
                  <option value="uni">United Future</option>
                  <option value="ban">Ban1080</option>
                  <option value="dsc">Democrats for Social Credit</option>
                  <option value="civ">The Civilian Party</option>
                  <option value="nzi">NZ Independent Coalition</option>
                  <option value="foc">Focus New Zealand</option>
                </optgroup>
              </select>
            </label>
            <label className="d-none d-md-block col-md-4 col-xl form-group custom-control custom-checkbox" htmlFor="unenrolled">
              <span className="input-label">Include unenrolled voters</span>
              <input type="checkbox" className="custom-control-input" id="unenrolled" name="unenrolled" value="on" checked />
              <span className="custom-control-indicator"></span>
            </label>
            <label className="col-sm-12 col-xl form-group custom-rangeslider" htmlFor="votes">
              <span className="input-label">Percentage</span>
              <input type="hidden" id="votes" name="votes" value="50" step="5" max="100" min="0" required />
              <div className="rangeslider">
                <div className="fill" style="width: 50%"></div>
                <div className="handle" style="left: 50%">50%</div>
              </div>
            </label>
          </form>
        </div>

      </main>
    );
  }

}

export default NonVotersTool;
