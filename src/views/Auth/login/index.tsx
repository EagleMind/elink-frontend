import React, { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string>('');
  const [email, setEmail] = useState<string>('hassen@test.com');
  const [password, setPassword] = useState<string>('123456');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await auth.signIn(email, password);
      navigate('/');
    } catch (err: any) {
      setSignInError(err);
      console.log(err);
    }
    setLoading(false);
  };

  const validateForm = () => {
    const errors: Partial<LoginFormValues> = {};

    if (!email) {
      errors.email = 'Email number is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white border border-gray-300 w-1/5 h-1/2 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Logo" width={200} className="p-5" />
        </div>
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Email Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <p className="text-red-500">
            {/* Display errors.email */}
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <p className="text-red-500">
            {/* Display errors.password */}
          </p>
          <p className="text-red-500">{signInError}</p>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <button onClick={handleSubmit} className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
                Sign In
              </button>
              <button className="w-full mt-2 py-2 px-4 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
