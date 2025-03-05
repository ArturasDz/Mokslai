import React from "react";

export class MedicalIndication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medical: [
                { id: 1, label: "Diabetes", selected: false },
                { id: 2, label: "Heart disease", selected: false },
            ],
        };
    }

    handleMedicalChange = (id) => {
        this.setState((prevState) => {
            const updatedMedicalIndications = prevState.medical.map((indication) =>
                indication.id === id ? { ...indication, selected: !indication.selected } : indication
            );

            this.props.onMedicalChange(updatedMedicalIndications.filter(indication => indication.selected))
            return { medical: updatedMedicalIndications };
        });
    };

    render() {
        return (
            <div className="medical-indication">
                <h2 className="text-yellow-500 font-bold">Select Your Medical Indication:</h2>
                {this.state.medical.map((indication) => (
                    <div key={indication.id}>
                        <label>
                            <input type="checkbox"
                                checked={indication.selected}
                                onChange={() => this.handleMedicalChange(indication.id)}
                            />
                            {indication.label}
                        </label>
                    </div>
                ))}
            </div>
        )
    }
}

export default MedicalIndication