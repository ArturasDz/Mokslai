import React from "react";

export class ActivityLevel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const activity = e.target.value;
    this.props.onChange(activity);
  }
  render() {
    return (
      <div>
        <label>Activity level:</label>
        <select name="activity" id="activity" onChange={this.handleChange}>
          <optgroup>
            <option value="" disabled selected>
              Select your activity level
            </option>
            <option value="1">Sedentary life, almost no exercise</option>
            <option value="2">Light exercise, 1 to 3 days per week</option>
            <option value="3">Moderate exercise, 3 to 5 days per week</option>
            <option value="4">Intense exercise every day</option>
            <option value="5">
              Very hard or intense exercise or very physical job
            </option>
          </optgroup>
        </select>
      </div>
    );
  }
}
