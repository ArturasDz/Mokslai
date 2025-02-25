import React from "react";

export class MetricForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleHeightChange = this.handleWeightChange.bind(this);
  }

  handleWeightChange(e) {
    const weight = e.target.value;
    this.props.onWeightChange(weight);
  }

  handleAgeChange(e) {
    const age = e.target.value;
    this.props.onAgeChange(age);
  }

  handleHeightChange(e) {
    const height = e.target.value;
    this.props.onHeightChange(height);
  }

  render() {
    return (
      <div>
        <label>Weight:</label>
        <input
          type="text"
          maxLength="6"
          placeholder="(kg)"
          onChange={this.handleWeightChange}
        />
        <label>Age:</label>
        <input
          type="text"
          maxLength="3"
          placeholder="(years)"
          onChange={this.handleAgeChange}
        />
        <label>Height:</label>
        <input
          type="text"
          maxLength="5"
          placeholder="(cm)"
          onChange={this.handleHeightChange}
        />
      </div>
    );
  }
}
