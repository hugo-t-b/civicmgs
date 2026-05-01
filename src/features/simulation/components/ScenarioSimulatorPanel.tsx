import { useState } from "react"

interface ScenarioSimulatorPanelProps {
  populationChange: number
  onPopulationChange: (value: number) => void
  educationFundingChange: number
  onEducationFundingChange: (value: number) => void
  infrastructureFundingChange: number
  onInfrastructureFundingChange: (value: number) => void
}

interface SliderRowProps {
  label: string
  value: number
  onChange: (value: number) => void
}

function SliderRow({ label, value, onChange }: SliderRowProps) {
  const [textValue, setTextValue] = useState<string | null>(null);

  const handleFocus = () => {
    setTextValue(value === 0 ? "" : String(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTextValue(val);

    const num = Number(val);
    if (!isNaN(num)) {
      onChange(Math.max(-20, Math.min(20, num)));
    }
  };

  const handleBlur = () => {
    if (textValue === "" || textValue === null) {
      onChange(0);
    }
    setTextValue(null); // go back to controlled display mode
  };

  return (
    <div className="scenario-slider-row">
      <div className="scenario-slider-row__top">
        <label>{label}</label>

        <div className="scenario-slider-row__value">
          <input
            type="number"
            min={-20}
            max={20}
            step={1}
            value={textValue ?? value}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            className="scenario-slider-row__input"
          />
          <span className="scenario-slider-row__percent">%</span>
        </div>
      </div>

      <input
        type="range"
        min={-20}
        max={20}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function ScenarioSimulatorPanel({
  populationChange,
  onPopulationChange,
  educationFundingChange,
  onEducationFundingChange,
  infrastructureFundingChange,
  onInfrastructureFundingChange,
}: ScenarioSimulatorPanelProps) {
  return (
    <section className="scenario-panel">
      <h2>Scenario simulator</h2>
      <p>Adjust percentages to see immediate impact on suburb metrics.</p>

      <SliderRow
        label="Population change"
        value={populationChange}
        onChange={onPopulationChange}
      />
      <SliderRow
        label="Education funding change"
        value={educationFundingChange}
        onChange={onEducationFundingChange}
      />
      <SliderRow
        label="Infrastructure funding change"
        value={infrastructureFundingChange}
        onChange={onInfrastructureFundingChange}
      />
    </section>
  )
}
