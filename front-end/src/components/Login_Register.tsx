import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const LoginRegister = () => {
  const [state, setState] = React.useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false); // New state for registration mode
  const [error, setError] = React.useState(''); // State for error message
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleMode = () => {
    setIsRegistering((prev) => !prev); // Toggle between login and registration modes
    // Reset form state when switching modes
    setState({ email: '', password: '' });
    setError(''); // Clear the error message
  };

  const handleSubmit = () => {
    // Check email and password
    if (state.email === 'senishchs@gmail.com' && state.password === '123456789') {
      // Redirect to /Chat page
      navigate('/Chat');
    } else {
      // Display error message
      setError('No such user found.');
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="bg-slate-500 w-96 p-4">
        <h1>{isRegistering ? 'Registration' : 'Login'}</h1>
        <div>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border border-gray-300 p-2 mb-2 w-full"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 p-2 mb-2 w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
        <button className="bg-blue-500 text-white p-2 w-full" onClick={handleSubmit}>
          {isRegistering ? 'Create New Account' : 'Login'}
        </button>
        <p className="mt-4 text-center text-gray-700">
          {isRegistering ? 'Already have an account?' : 'Have no account?'}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-500 ml-1"
          >
            {isRegistering ? 'Login' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
