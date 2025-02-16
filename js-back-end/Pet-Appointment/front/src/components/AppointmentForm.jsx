import { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

function AppointmentForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    pet_name: '',
    username: '',
    date: '',
    time: '',
    notes: ''
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(
        `${API_URL}/appointments`, 
        formData,
        { withCredentials: true }
      );
      
      onSubmit(); // Refresh appointments list
      onClose(); // Close modal
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Something went wrong');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-purple-800">New Appointment</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className='flex flex-col'>
            <label htmlFor="pet-name" className="block text-gray-700 mb-1">Pet Name</label>
            <input
              id="pet-name"
              type="text"
              name="pet_name"
              value={formData.pet_name}
              onChange={handleChange}
              placeholder="Pet's name"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="off"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="owner-name" className="block text-gray-700 mb-1">Pet Owner</label>
            <input
              id="owner-name"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Owner's name"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="name"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="appointment-date" className="block text-gray-700 mt-2 mr-7">Date</label>
            <input
              id="appointment-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-half border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="off"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="appointment-time" className="block text-gray-700 mt-2 mr-7">Time</label>
            <input
              id="appointment-time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-half border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              autoComplete="off"
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="appointment-notes" className="block text-gray-700 mb-1 mr-5">Notes</label>
            <textarea
              id="appointment-notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
              placeholder="Enter appointment details..."
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;