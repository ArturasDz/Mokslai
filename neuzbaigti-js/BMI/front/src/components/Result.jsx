import React from "react";

export class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyCalories: 0,
      message: ""
    };
  }

  componentDidMount() {
    this.calculateCalories();
  }

  calculateCalories() {
    const { weight, height, age, activityLevel, goals } = this.props.userData;

    // Pavyzdinė formulė kalorijų skaičiavimui
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Moterims: + 5, vyrams: - 161
    let activityMultiplier;

    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "very active":
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    let maintenanceCalories = bmr * activityMultiplier;

    if (goals === "gain") {
      this.setState({ dailyCalories: maintenanceCalories + 500, message: "To gain weight, you need to consume more calories." });
    } else if (goals === "lose") {
      this.setState({ dailyCalories: maintenanceCalories - 500, message: "To lose weight, you need to consume fewer calories." });
    } else {
      this.setState({ dailyCalories: maintenanceCalories, message: "To maintain your weight, this is your daily calorie requirement." });
    }
  }

  render() {
    return (
      <div className="result-container">
        <h2>Your Daily Caloric Needs</h2>
        <p>{this.state.message}</p>
        <h3>{this.state.dailyCalories} calories</h3>
      </div>
    );
  }
}
