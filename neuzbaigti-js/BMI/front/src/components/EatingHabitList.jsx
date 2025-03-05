import React from "react";

export class EatingHabitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [
        { id: 1, label: "Vegetarian", selected: false },
        { id: 2, label: "Vegan", selected: false },
        { id: 3, label: "Gluten-Free", selected: false },
        { id: 4, label: "Dairy-Free", selected: false },
        { id: 5, label: "Paleo", selected: false },
        { id: 6, label: "Keto", selected: false },
      ],
    };
  }

  handleHabitChange = (id) => {
    this.setState((prevState) => {
      const updatedHabits = prevState.habits.map((habit) =>
        habit.id === id ? { ...habit, selected: !habit.selected } : habit
      );

      // Pranešti tėviniam komponentui apie pasirinkimus
      this.props.onHabitChange(updatedHabits.filter(habit => habit.selected));
      return { habits: updatedHabits };
    });
  };

  render() {
    return (
      <div className="eating-habit-list">
        <h2 className="text-blue-500 font-bold">Select Your Eating Habits:</h2>
        {this.state.habits.map((habit) => (
          <div key={habit.id}>
            <label>
              <input
                type="checkbox"
                checked={habit.selected}
                onChange={() => this.handleHabitChange(habit.id)}
              />
              {habit.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}
