import { useState } from 'react';
import Button from './Button';

export default function UserInfoForm({ onSubmit, loading = false, initialValues = {} }) {
  const [formData, setFormData] = useState({
    designName: initialValues.designName || '',
    firstName: initialValues.firstName || '',
    lastName: initialValues.lastName || '', 
    email: initialValues.email || '',
    description: initialValues.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-info-form">
      <div className="form-group">
        <label htmlFor="designName">Design Name</label>
        <input
          type="text"
          id="designName"
          name="designName"
          value={formData.designName}
          onChange={handleChange}
          placeholder="Enter design name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter design description"
          rows="4"
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        fullWidth
        size="large"
      >
        Submit
      </Button>
    </form>
  );
}
