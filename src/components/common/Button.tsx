import React from 'react';

interface ButtonProps {
    label: string;
    onSubmit: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onSubmit }) => {
    const handleClick = () => {
        onSubmit();
    };

    return (
        <button type="button" onSubmit={handleClick}>
            {label}
        </button>
    );
};

export default Button;
