import React from "react";

export class GoalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "maintain", // Numatytoji vertė
      weightChange: 0 // Svorio pokytis per savaitę
    };
  }

  handleGoalChange = (e) => {
    this.setState({ goal: e.target.value });
  };

  handleWeightChange = (e) => {
    this.setState({ weightChange: e.target.value });
  };

  render() {
    return (
      <div className="goal-form">
        <h2>Set Your Goals</h2>
        <div>
          <label>
            Goals:
            <select value={this.state.goal} onChange={this.handleGoalChange}>
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain weight</option>
              <option value="lose">Lose weight</option>
            </select>
          </label>
        </div>
        {this.state.goal !== "maintain" && (
          <div>
            <label>
              Desired weight change per week (in kg):
              <input
                type="number"
                value={this.state.weightChange}
                onChange={this.handleWeightChange}
                placeholder="Enter weight change"
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default GoalForm;
