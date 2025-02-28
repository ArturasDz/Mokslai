import React from "react";

export class ImperialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feet: 0, inches: 0 };
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleFeetChange = this.handleFeetChange.bind(this);
    this.handleInchChange = this.handleInchChange.bind(this);
    this.handleHeightChange = this.handleWeightChange.bind(this);
  }
  handleWeightChange(e) {
    const weight = e.target.value;
    this.props.weightChange(weight*0.453592);
  }

  handleAgeChange(e) {
    const age = e.target.value;
    this.props.ageChange(age);
  }
  handleFeetChange(e) {
    let newFeet = e.target.value;
    if (newFeet.length === 0) {
      newFeet = 0;
    }
    this.setState({ feet: newFeet });
    this.handleHeightChange();
  }

  handleInchChange(e) {
    let newInches = e.target.value;
    if (newInches.length === 0) {
      newInches = 0;
    }
    this.setState({ inches: newInches });
    this.handleHeightChange();
  }

  handleHeightChange() {
    const FEET_TO_CM = 30.48;
    const IN_TO_CM = 2.54;
    const totalHeight = (this.state.feet * FEET_TO_CM) + (this.state.inches * IN_TO_CM);
    this.props.heightChange(totalHeight);
  }

  render() {
    return (
      <div>
        <label for="weight">Weight:</label>
        <input
          type="text"
          id="weight"
          maxLength="6"
          placeholder="(lb)"
          onChange={this.handleWeightChange}
        />
        <label for="age">Age:</label>
        <input
          type="text"
          id="age"
          maxLength="3"
          placeholder="(years)"
          onChange={this.handleAgeChange}
        />
        <label for="height">Height:</label>
        <input
          type="text"
          id="height"
          maxLength="5"
          placeholder="(ft)"
          onChange={this.handleFeetChange}
        />
        <input
          type="text"
          maxLength="5"
          placeholder="(in)"
          onChange={this.handleInchChange}
        />
      </div>
    );
  }
}
