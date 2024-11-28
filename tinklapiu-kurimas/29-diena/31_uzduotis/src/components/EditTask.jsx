import { useParams } from "react-router";

export default function Tasks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [register, handleSubmit] = useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${id}`);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        header: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
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
    <form onSubmit={handleSubmit(onSubmit)} className="col-8 mx-auto">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task" className="form-label">
          Task
        </label>
        <input
          type="text"
          id="task"
          {...register("task")}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dueto" className="form-label">
          DueTo
        </label>
        <input
          type="date"
          id="dueto"
          {...register("dueto")}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}
