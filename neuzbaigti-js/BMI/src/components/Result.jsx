import React from "react";

export class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weightType: "", weightValue: "" };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.measurementType === "metric") {
      return { weightType: "kg", weightValue: 0.5 };
    } else {
      return { weightType: "lb", weightValue: 1 };
    }
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <h2>{this.props.calories} calories</h2>
            <p>to maintain your current wieght</p>
          </div>

          <table>
            <tr>
              <th></th>
              <th className="pl-20 pr-20">Gain Weight</th>
              <th>Lose Weight</th>
            </tr>
            <tr>
              <td>
                {this.state.weightValue} {this.state.weightType} per week
              </td>
              <td className="pl-20">{this.props.calories + 500} kcal per day</td>
              <td>{this.props.calories - 500} kcal per day</td>
            </tr>
            <tr>
              <td>
                {this.state.weightValue * 2} {this.state.weightType} per week
              </td>
              <td className="pl-20">{this.props.calories + 1000} kcal per day</td>
              <td>{this.props.calories - 1000} kcal per day</td>
            </tr>
          </table>
        </form>
      </div>
    );
  }
}
