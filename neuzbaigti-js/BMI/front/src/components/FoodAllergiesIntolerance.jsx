import React from "react";

export class FoodAllergiesIntolerance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allergies: [
        { id: 1, label: "Peanuts", selected: false },
        { id: 2, label: "Tree Nuts", selected: false },
        { id: 3, label: "Milk", selected: false },
        { id: 4, label: "Eggs", selected: false },
        { id: 5, label: "Wheat", selected: false },
        { id: 6, label: "Soy", selected: false },
        { id: 7, label: "Fish", selected: false },
        { id: 8, label: "Shellfish", selected: false },
        { id: 9, label: "Gluten", selected: false },
      ],
    };
  }

  handleAllergyChange = (id) => {
    this.setState((prevState) => {
      const updatedAllergies = prevState.allergies.map((allergy) =>
        allergy.id === id ? { ...allergy, selected: !allergy.selected } : allergy
      );

      // Pranešti tėviniam komponentui apie pasirinkimus
      this.props.onAllergyChange(updatedAllergies.filter(allergy => allergy.selected));
      return { allergies: updatedAllergies };
    });
  };

  render() {
    return (
      <div className="food-allergies-intolerance">
        <h2>Select Your Food Allergies and Intolerances</h2>
        {this.state.allergies.map((allergy) => (
          <div key={allergy.id}>
            <label>
              <input
                type="checkbox"
                checked={allergy.selected}
                onChange={() => this.handleAllergyChange(allergy.id)}
              />
              {allergy.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default FoodAllergiesIntolerance;
