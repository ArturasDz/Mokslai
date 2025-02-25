import React from "react";
import { MetricForm } from "./MetricForm";
import { ImperialForm } from "./ImperialForm";
import { ActivityLevel } from "./ActivityLevel";
import { Result } from "./Result";

export class CalorieForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      gender: "",
      height: "",
      weight: "",
      activity: "",
      measurement: "",
      measurementSelected: false,
      result: "",
      showResult: false,
      showForm: "",
    };
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeWeight = this.changeWeight.bind(this);
    this.changeAge = this.changeAge.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.changeActivity = this.changeActivity.bind(this);
    this.getCalories = this.getCalories.bind(this);
    this.validEntry = this.validEntry.bind(this);
  }

  handleMeasurementChange(e) {
    this.setState({ measurement: e.target.value, measurementSelected: true });
  }

  changeGender(e) {
    this.setState({ gender: e.target.value });
  }

  changeWeight(newWeight) {
    this.setState({ weight: newWeight });
  }

  changeAge(newAge) {
    this.setState({ age: newAge });
  }

  changeHeight(newHeight) {
    this.setState({ height: newHeight });
  }

  changeActivity(newActivity) {
    this.setState({ activity: newActivity });
  }

  validEntry() {
    const fields = [
      this.state.age,
      this.state.gender,
      this.state.height,
      this.state.weight,
      this.state.activity,
      this.state.measurement,
    ];
    var i;
    for (i in fields) {
      if (fields[i].length === 0) {
        return false;
      }
    }

    if (this.state.age < 0 || this.state.age > 120) {
      return false;
    }
    if (this.state.height < 0) {
      return false;
    }
    if (this.state.weight < 0) {
      return false;
    }
    return true;
  }
  getCalories(event) {
    if (this.validEntry()) {
      this.setState({
        showResult: true,
        resultForm: (
          <Result
            calories={this.state.result}
            measurementType={this.state.measurement}
          />
        ),
      });
    } else {
      alert("Please fill out all fields");
    }
  }

  calculateCalories() {
    let bmr = 0;

    if (this.state.gender === "male") {
      bmr =
        10 * this.state.weight +
        6.25 * this.state.height -
        5 * this.state.age +
        5;
    } else {
      bmr =
        10 * this.state.weight +
        6.25 * this.state.height -
        5 * this.state.age -
        161;
    }

    switch (this.state.activity) {
      case "sedentary, little or no exercise":
        bmr = bmr * 1.2;
        break;
      case "lightly active, exercise 1-3 days per week":
        bmr = bmr * 1.375;
        break;
      case "moderately active, exercise 6-7 days per week":
        bmr = bmr * 1.55;
        break;
      case "very active, intense exercise everyday":
        bmr = bmr * 1.725;
        break;
      case "extra active, very hard or intense exercise or very physical job":
        bmr = bmr * 1.9;
        break;
    }
    return Math.round(bmr);
  }

  render() {
    return (
      <div>
        <div class="entry-form">
          <form>
            <p>Select unit of measurement:</p>
            <div class="measurement-choice">
              <input
                type="radio"
                id="metric"
                value="metric"
                checked={this.state.measurement === "metric"}
                onChange={this.handleMeasurementChange}
              />
              <label for="metric">Metric (kg/cm)</label>
              <input
                type="radio"
                id="imperial"
                value="imperial"
                checked={this.state.measurement === "imperial"}
                onChange={this.handleMeasurementChange}
              />
              <label for="female">Imperial (lbs/feet+inches)</label>
            </div>

            <div class="gender-choice">
              <label for="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                class="browser-default custom-select"
                onChange={this.changeGender}
              >
                <option value="" disabled selected>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {this.state.measurement === "metric" && (
              <MetricForm
                weightChange={this.changeWeight}
                ageChange={this.changeAge}
                heightChange={this.changeHeight}
              />
            )}
            {this.state.measurement === "imperial" && (
              <ImperialForm
                weightChange={this.changeWeight}
                ageChange={this.changeAge}
                heightChange={this.changeHeight}
              />
            )}
            {this.state.measurementSelected && (
              <ActivityLevel onChange={this.changeActivity} />
            )}
            {this.state.measurementSelected && (
              <button
                type="button"
                class="btn btn-primary"
                id="calculate-btn"
                onClick={this.getCalories}
              >
                Calculate my calories
              </button>
            )}
          </form>
        </div>
        <div>{this.state.showResult && this.state.resultForm}</div>
      </div>
    );
  }
}
