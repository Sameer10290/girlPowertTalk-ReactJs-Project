import React, { useState } from 'react';
import InputSelector from './InputSelector';

const inputs = [
    { id: 0, label: 'Input 1' },
    { id: 1, label: 'Input 2' },
    { id: 2, label: 'Input 3' },
    { id: 3, label: 'Input 4' },
    { id: 4, label: 'Input 5' },
    { id: 5, label: 'Input 6' },
    { id: 6, label: 'Input 7' },
    { id: 7, label: 'Input 8' },
];

const InputProgress = () => {
    const [selectedInputs, setSelectedInputs] = useState(Array.from({ length: inputs.length }, () => false));
    // useState([false, false, false, false, false, false, false, false]);
    const [progressValue, setProgressValue] = useState(0);

    const handleInputChange = (newInputs, newProgressValue) => {
        setSelectedInputs(newInputs);
        setProgressValue(newProgressValue);
    };

    return (
        <div>
            <InputSelector
                inputs={inputs}
                selectedInputs={selectedInputs}
                progressValue={progressValue}
                onInputChange={handleInputChange}
            />
        </div>
    );
}

export default InputProgress;
