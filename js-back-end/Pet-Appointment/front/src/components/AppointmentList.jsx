import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import { format } from "date-fns";
const API_URL = import.meta.env.VITE_API_URL;
import Footer from "./Footer";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [user, setUser] = useState(null);


function changeLang() {
 const language = getCookie("lang");
 if ( test == "en") {
  setCookie("lang", "es", 365);
  window.location.reload();
 } else {
  setCookie("lang", "en", 365);
  window.location.reload();
 }
}



  useEffect(() => {
    fetchAppointments();
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        setUser(response.data.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: response } = await axios.get(`${API_URL}/appointments`, {
        withCredentials: true,
      });
      setAppointments(response.data || []); // Užtikriname, kad visada bus masyvas
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Failed to fetch appointments"
        );
      } else {
        setError("An unexpected error occurred");
      }
      setAppointments([]); // Klaidos atveju nustatome tuščią masyvą
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      fetchAppointments();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Failed to delete appointment"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      console.log('Sending data:', updatedData);

      const formattedData = {
        ...updatedData,
        date: updatedData.date,
        time: updatedData.time.substring(0, 5),
      };


      console.log('Formatted data:', formattedData);

      const response = await axios.patch(`${API_URL}/appointments/${id}`, formattedData, {
        withCredentials: true,
      });

      console.log('Server response:', response.data);

      fetchAppointments();
      setEditingAppointment(null);
    } catch (error) {
      console.error('Edit error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          window.location.href = '/login';
        } else {
          setError(error.response?.data?.message || "Failed to edit appointment");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const openEditForm = (appointment) => {
    setEditingAppointment(appointment);
  };

  const closeEditForm = () => {
    setEditingAppointment(null);
  };

  const sortAppointments = (appointmentsToSort) => {
    if (!Array.isArray(appointmentsToSort)) return [];

    return [...appointmentsToSort].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "petName":
          return (a.pet_name || "").localeCompare(b.pet_name || "");
        case "ownerName":
          return (a.owner_email || "").localeCompare(b.owner_email || "");
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-4 w-3/4">
      <h1 className="text-3xl text-center text-purple-800 font-bold mb-6">
        Pets Medicare

        <button className="btn" onClick={changeLang}>asdas </button>
      </h1>

      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-purple-700 text-white py-2 mb-6 rounded-lg hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-xl pb-1">+</span> Add Appointment
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {showForm ? (
        <div>
          <AppointmentForm
            onClose={() => setShowForm(false)}
            onSubmit={() => {
              fetchAppointments();
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <label htmlFor="sort-select" className="sr-only">Sort appointments by</label>
            <select
              id="sort-select"
              name="sort"
              className="border p-2 rounded bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by: Date</option>
              <option value="petName">Sort by: Pet Name</option>
              <option value="ownerName">Sort by: Owner Name</option>
            </select>
          </div>

          <div className="space-y-4">
            {sortAppointments(appointments).map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 relative hover:shadow-lg transition-shadow bg-white"
              >
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="absolute top-1 right-2 text-gray-500 hover:text-red-500 border-1 border-rounded text-xl"
                  title="Delete appointment"
                >
                  X
                </button>
                <button
                  onClick={() => openEditForm(appointment)}
                  className="absolute top-12 right-1 text-white hover:text-blue-500 text-md bg-purple-800
                  px-2 py-1 mr-1 rounded-md"
                  title="Edit appointment">
                  EDIT
                </button>
                <h3 className="text-xl text-purple-700 font-semibold">
                  {appointment.pet_name}
                </h3>
                <p className="text-gray-600">
                  Owner: {appointment.owner_name || 'Unknown'}
                </p>
                <p className="text-gray-700 mt-2">{appointment.notes}</p>
                <p className="text-right text-gray-500 mt-2">
                  {format(new Date(appointment.date), "MMM-d")} {appointment.time}
                </p>
                <div className="absolute top-2 right-8 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${appointment.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {appointment.status || "pending"}
                  </span>
                </div>
              </div>
            ))}

            {appointments.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-8">
                No appointments found
              </div>
            )}
          </div>
        </>
      )}

      {editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = {
                date: e.target.date.value,
                time: e.target.time.value,
                notes: e.target.notes.value,
                status: user?.role === 'admin' ? e.target.status.value : undefined,
              };
              console.log('Form data:', formData);
              handleEdit(editingAppointment.id, formData);
            }}>
              {user?.role === 'admin' && (
                <div className="mb-4">
                  <label htmlFor="edit-status" className="block mb-2">Status:</label>
                  <select
                    id="edit-status"
                    name="status"
                    defaultValue={editingAppointment.status || 'pending'}
                    className="w-full border rounded p-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="edit-date" className="block mb-2">Date:</label>
                <input
                  id="edit-date"
                  type="date"
                  name="date"
                  defaultValue={editingAppointment.date.split('T')[0]}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-time" className="block mb-2">Time:</label>
                <input
                  id="edit-time"
                  type="time"
                  name="time"
                  defaultValue={editingAppointment.time ? editingAppointment.time.substring(0, 5) : ''}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-notes" className="block mb-2">Notes:</label>
                <textarea
                  id="edit-notes"
                  name="notes"
                  defaultValue={editingAppointment.notes}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AppointmentList;
