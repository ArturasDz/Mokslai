import React from "react";

export class ReligiousRestriction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restrictions: [
        { id: 1, label: "Vegetarian", selected: false },
        { id: 2, label: "Vegan", selected: false },
        { id: 3, label: "Halal", selected: false },
        { id: 4, label: "Kosher", selected: false },
        { id: 5, label: "No Alcohol", selected: false },
      ],
    };
  }

  handleRestrictionChange = (id) => {
    this.setState((prevState) => {
      const updatedRestrictions = prevState.restrictions.map((restriction) =>
        restriction.id === id ? { ...restriction, selected: !restriction.selected } : restriction
      );

      // Pranešti tėviniam komponentui apie pasirinkimus
      this.props.onRestrictionChange(updatedRestrictions.filter(restriction => restriction.selected));
      return { restrictions: updatedRestrictions };
    });
  };

  render() {
    return (
      <div className="religious-restriction">
        <h2>Select Your Religious Restrictions</h2>
        {this.state.restrictions.map((restriction) => (
          <div key={restriction.id}>
            <label>
              <input
                type="checkbox"
                checked={restriction.selected}
                onChange={() => this.handleRestrictionChange(restriction.id)}
              />
              {restriction.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default ReligiousRestriction;
