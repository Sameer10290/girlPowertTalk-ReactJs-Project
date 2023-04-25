import React, { useState } from 'react';
import infoIcon from '../../assests/Vector.svg';

const InputSelector = ({ inputs, selectedInputs, progressValue, onInputChange }) => {
    const [inputValue, setInputValue] = useState(
        inputs.reduce(
            (obj, input) => ({ ...obj, [input.id]: 0 }),
            { sum: 0, remaining: 100 }
        )
    );


    const handleUpdate = (event, id) => {
        const newInputValue = { ...inputValue };
        const previousValue = newInputValue[id];
        newInputValue[id] = parseFloat(event.target.value);
        if (isNaN(newInputValue[id])) {
            newInputValue[id] = 0;
        }
        const sum = newInputValue.sum - previousValue + newInputValue[id];
        newInputValue.sum = sum;
        newInputValue.remaining = 100 - sum;
        setInputValue(newInputValue);
        console.log(inputValue)

        const selectedCount = Object.values(selectedInputs).filter((input) => input).length;
        let newProgressValue = (sum / selectedCount) || 0;

        onInputChange(selectedInputs, newProgressValue);

        const newRemainingInputs = { ...selectedInputs };
        Object.keys(newRemainingInputs).forEach((inputId) => {
            if (!newRemainingInputs[inputId]) {
                remainingValue = remainingValue - newInputValue[inputId];
            }
        });

        Object.keys(newRemainingInputs).forEach((inputId) => {
            if (!newRemainingInputs[inputId]) {
                const inputValueId = newInputValue[inputId];
                const remainingInputsCount = Object.keys(newRemainingInputs).filter((id) => !newRemainingInputs[id]).length;
                const newRemainingInputValue = remainingInputsCount > 1 ? remainingValue / remainingInputsCount : remainingValue;
                if (inputValueId > 0) {
                    newProgressValue += inputValueId;
                    newRemainingInputs[inputId] = inputValueId;
                    remainingValue -= inputValueId;
                } else {
                    newRemainingInputs[inputId] = newRemainingInputValue;
                    remainingValue -= newRemainingInputValue;
                }
            }
        });

        setInputValue({ ...newInputValue, remainingInputs: newRemainingInputs });
    };

    const handleSelection = (id) => {
        const newInputs = [...selectedInputs];
        newInputs[id] = !newInputs[id];

        const selectedCount = newInputs.filter((input) => input).length;
        let newProgressValue = (selectedCount / inputs.length) * 100;

        onInputChange(newInputs, newProgressValue);
    };

    const triangleStyle = {
        left: `calc(${progressValue}% - 10px)`
    };

    return (
        <>
            <div className='cards'>
                {inputs.map((input) => (
                    <div key={input.id} className='input-card'>
                        <div className='info-icon'>
                            <p>Lorem ipsum dolor sit amet consectetur. Quis fermentum lectus mi fermentum aliquam id etiam. Massa tellus sed libero venenatis semper sagittis ornare. Duis dignissim mauris vulputate dolor tempus. Arcu libero interdum viverra ullamcorper condimentum volutpat.</p>
                            <img src={infoIcon} alt="ⓘ" />
                        </div>
                        <div className='input-check'>
                            <input type="checkbox" checked={selectedInputs[input.id]} onChange={() => handleSelection(input.id)} />
                            <label>{input.label}</label>
                        </div>
                        <input className='weightage' type='text' value={inputValue[input.id]} onChange={(event) => handleUpdate(event, input.id)} />
                    </div>
                ))}
            </div>
            <div className='card-2'>
                <div className='weigh-indicator'>
                    <span>High</span>
                    <span>Medium</span>
                    <span>Low</span>
                </div>
                <progress value={progressValue} max="100" />
                <div className='pointer'>
                    <div className="triangle" style={triangleStyle} />
                </div>
                <p>Check Detailed Checklist  →</p>
            </div>
        </>
    );
}

export default InputSelector;