import React from "react";

export class MetricForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.state = {
      medicalIndications: "",
      religiousIndications: "",
      unwantedFoods: "",
      wantedFoods: ""
    };
  }

  handleWeightChange(e) {
    const weight = e.target.value;
    this.props.weightChange(weight);
  }

  handleAgeChange(e) {
    const age = e.target.value;
    this.props.ageChange(age);
  }

  handleHeightChange(e) {
    const height = e.target.value;
    this.props.heightChange(height);
  }

  render() {
    return (
      <div className="flex flex-col gap-2 bg-white rounded-md p-4 m-4">
        <form>
          <div className="flex gap-10">
            <div className="flex flex-col w-50">
              <label for="weight" className="font-bold mb-2">
                Weight:
              </label>
              <input
                className="bg-gray-200 rounded-md text-gray-900 p-2"
                name="weight"
                id="weight"
                type="text"
                maxLength="6"
                placeholder="Enter your weight"
                onChange={this.handleWeightChange}
              />
            </div>
            <div className="flex flex-col w-50">
              <label for="age" className="font-bold mb-2">
                Age:
              </label>
              <input
                className="bg-gray-200 rounded-md text-gray-900 p-2"
                name="age"
                id="age"
                type="text"
                maxLength="3"
                placeholder="Enter your age"
                onChange={this.handleAgeChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-50">
            <label for="height" className="font-bold mb-2">
              Height:
            </label>
            <input
              className="bg-gray-200 rounded-md text-gray-900 mb-2 p-2"
              name="height"
              id="height"
              type="text"
              maxLength="5"
              placeholder="Enter your height"
              onChange={this.handleHeightChange}
            />
          </div>       
        </form>
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold p-1 px-2 rounded-md ">
            <a href="/activity-level">next</a>
          </button>
        </div>
      </div>
    );
  }
}
