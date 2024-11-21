import { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

  // Validate form inputs
  const ValidateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required.';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            console.log('Submitted data:', formData);
            // Simulate API call
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
                    value={formData.username}
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
                    value={formData.email}
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
                    value={formData.password}
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