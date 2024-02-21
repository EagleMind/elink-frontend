import React, { useState } from 'react';
import { useAuth } from '../../../context/auth';

interface LoginFormValues {
  phoneNumber: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('25377391');
  const [password, setPassword] = useState<string>('123456789');
  const auth = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await auth.signIn(phoneNumber, password);
    } catch (err: any) {
      setSignInError(err);
    }
    setLoading(false);
  };

  const validateForm = () => {
    const errors: Partial<LoginFormValues> = {};

    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <div className="flex justify-center p-6">
      <div className="max-w-md w-full">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <p className="text-red-500">
          {/* Display errors.phoneNumber */}
        </p>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <p className="text-red-500">
          {/* Display errors.password */}
        </p>
        {console.log(signInError)}
        <p className="text-red-500">{signInError}</p>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Sign In
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-2">
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
