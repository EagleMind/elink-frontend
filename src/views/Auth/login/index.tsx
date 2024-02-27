import React, { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { redirect, useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string>('');
  const [email, setemail] = useState<string>('hassen@test.com');
  const [password, setPassword] = useState<string>('123456');
  const auth = useAuth();
  const navigate = useNavigate()
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("clicked")
      await auth.signIn(email, password);
      navigate('/')
    } catch (err: any) {
      redirect("/login");
      setSignInError(err);
      console.log(err)
    }
    setLoading(false);
  };

  const validateForm = () => {
    const errors: Partial<LoginFormValues> = {};

    if (!email) {
      errors.email = 'email number is required';
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
          placeholder="email Number"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
        />
        <p className="text-red-500">
          {/* Display errors.email */}
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
