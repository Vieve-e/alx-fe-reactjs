import { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!username) {
      newErrors.username = 'Username is required.';
    }

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);

    // If there are no errors, the form is valid
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Registration successful!');
      setFormData({ username: '', email: '', password: '' }); // Reset form
    }
  };
        return (
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
              <h2>User Registration</h2>
              <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                </div>
        
                {/* Email Field */}
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
        
                {/* Password Field */}
                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
        
                <button type="submit" style={{ marginTop: '10px' }}>
                  Register
                </button>
              </form>
            </div>
          );
        };
        
        export default RegistrationForm;