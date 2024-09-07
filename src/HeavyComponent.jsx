import React from 'react';

function HeavyComponent({ data }) {
    return (
        <div>
            <h2>Heavy Component Loaded!</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default HeavyComponent;
