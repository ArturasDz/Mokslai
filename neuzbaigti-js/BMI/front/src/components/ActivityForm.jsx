import React from "react";

export class ActivityForm extends React.Component {
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
      <div className="flex flex-col">
        <label for="activity" className="font-bold">Activity level:</label>
        <select  className="w-64 bg-gray-200 rounded-md text-gray-500 mb-2" name="activity" id="activity" onChange={this.handleChange} >
          <optgroup label="Activity level">
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
