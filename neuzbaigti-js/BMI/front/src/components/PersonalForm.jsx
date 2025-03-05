import React from "react";
import { MetricForm } from "./MetricForm";
import { EatingHabitList } from "./EatingHabitList";
import { GoalForm } from "./GoalForm";
import { FoodAllergiesIntolerance } from "./FoodAllergiesIntolerance";
import { ReligiousRestriction } from "./ReligiousRestriction";
import ActivityForm from "./ActivityForm";

export class PersonalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMetric: true,
      gender: "",
      eatingHabits: [],
      unwantedFoods: [],
      wantedFoods: [],
      medicalIndications: "",
      religiousIndications: "",
      activityLevel: "",
      goals: "",
      allergies: [],
      weight: "",
      age: "",
      height: ""
    };
  }

  handleWeightChange = (weight) => {
    this.setState({ weight });
  };

  handleAgeChange = (age) => {
    this.setState({ age });
  };

  handleHeightChange = (height) => {
    this.setState({ height });
  };

  handleFormSwitch = (isMetric) => {
    this.setState({ isMetric });
  };

  handleSubmit = async (e) => {
    // e.preventDefault();
    // const response = await fetch("/api/personal-info", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(this.state),
    // });
    // Apdorokite atsakymą

      // Save data to local storage
      localStorage.setItem('personalInfo', JSON.stringify(this.state));
    
      // Simulate a success message
      alert("Data saved locally!");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Gender:
            <select onChange={(e) => this.setState({ gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <MetricForm 
          weightChange={this.handleWeightChange} 
          ageChange={this.handleAgeChange} 
          heightChange={this.handleHeightChange} 
        />
        <EatingHabitList onHabitChange={(selectedHabits) => this.setState({ eatingHabits: selectedHabits })} />
        <GoalForm />
        
        {/* Medical Indications Dropdown */}
        <div>
          <label>
            Medical Indications:
            <select onChange={(e) => this.setState({ medicalIndications: e.target.value })}>
              <option value="">Select an indication</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Allergy">Allergy</option>
              <option value="None">None</option>
            </select>
          </label>
        </div>

        {/* Religious Indications Dropdown */}
        <div>
          <label>
            Religious Indications:
            <select onChange={(e) => this.setState({ religiousIndications: e.target.value })}>
              <option value="">Select an indication</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Halal">Halal</option>
              <option value="Kosher">Kosher</option>
              <option value="None">None</option>
            </select>
          </label>
        </div>

        <ActivityForm onActivityChange={(activityLevel) => this.setState({ activityLevel })} />
        
        <FoodAllergiesIntolerance onAllergyChange={(selectedAllergies) => this.setState({ allergies: selectedAllergies })} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
