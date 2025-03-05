import React from "react";
import { MetricForm } from "./MetricForm";
import { EatingHabitList } from "./EatingHabitList";
import { GoalForm } from "./GoalForm";
import { FoodAllergiesIntolerance } from "./FoodAllergiesIntolerance";
import { ReligiousRestriction } from "./ReligiousRestriction";
import { MedicalIndication } from "./MedicalIndication"
import ActivityForm from "./ActivityForm";
import FormSelector from "./FormSelector";

export class PersonalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMetric: true,
      gender: "",
      eatingHabits: [],
      unwantedFoods: [],
      wantedFoods: [],
      medical: [],
      religiousIndications: [],
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

    //SAVE DATA TO LOCAL STORAGE
    localStorage.setItem('personalInfo', JSON.stringify(this.state));

    //ALERT IF SUCCESSFULL
    alert("Data saved locally!");
  };

  render() {
    return (


      <form onSubmit={this.handleSubmit}>

        <div className="">
          <label>
            Gender:
            <select onChange={(e) => this.setState({ gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <MetricForm
          weightChange={this.handleWeightChange}
          ageChange={this.handleAgeChange}
          heightChange={this.handleHeightChange}
        />

{/* <FormSelector /> */}

        <ActivityForm onActivityChange={(activityLevel) => this.setState({ activityLevel })} />

        <EatingHabitList onHabitChange={(selectedHabits) => this.setState({ eatingHabits: selectedHabits })} />

        <MedicalIndication onMedicalChange={(selectedMedicalIndication) => this.setState({ medical: selectedMedicalIndication })} />

        <ReligiousRestriction onRestrictionChange={(selectedIndications) => this.setState({ religiousIndications: selectedIndications })} />

        <FoodAllergiesIntolerance onAllergyChange={(selectedAllergies) => this.setState({ allergies: selectedAllergies })} />

        <GoalForm />

        {/* PRODUCTS LIST */}

        {/* RESULT */}



        <button type="submit">Submit</button>


      </form>
    );
  }
}
