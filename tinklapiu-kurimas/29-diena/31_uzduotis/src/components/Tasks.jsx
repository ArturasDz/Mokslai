import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Tasks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [deleteTrigger]);

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setDeleteTrigger((deleteTrigger) => deleteTrigger + 1);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Task</th>
          <th>Due-to</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {data.map((task) => {
          return (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.task}</td>
              <td>{task.dueto}</td>
              <td>
                <Link to={`/tasks/${task.id}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
