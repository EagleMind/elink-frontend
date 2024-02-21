import React from 'react';

interface EmailInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ label, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label>{label}</label>
            <input
                type="email"
                value={value}
                onChange={handleChange}
                placeholder="Enter your email"
            />
        </div>
    );
};

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label>{label}</label>
            <input
                type="password"
                value={value}
                onChange={handleChange}
                placeholder="Enter your password"
            />
        </div>
    );
};

export { PasswordInput, EmailInput };


