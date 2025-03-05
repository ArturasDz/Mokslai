import React from "react";

export class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityLevel: "sedentary", // Default value
    };
  }

  handleActivityChange = (e) => {
    this.setState({ activityLevel: e.target.value });
    this.props.onActivityChange(e.target.value); // Notify parent component
  };

  render() {
    return (
      <div className="activity-form">
        <h2>Select Your Activity Level</h2>
        <div>
          <label>
            <select value={this.state.activityLevel} onChange={this.handleActivityChange}>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly active</option>
              <option value="moderate">Moderately active</option>
              <option value="active">Active</option>
              <option value="very active">Very active</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default ActivityForm;
