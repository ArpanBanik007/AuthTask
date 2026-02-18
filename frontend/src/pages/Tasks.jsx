import { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      console.log("Token:", token);

      const res = await axios.get(
        "http://localhost:8007/api/v1/tasks/mytasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Response:", res.data);

      setTasks(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.log("Full Error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch tasks");
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Tasks</h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No tasks found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {task.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                {task.description || "No description provided."}
              </p>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {task.status}
              </span>

              <p className="text-xs text-gray-400 mt-3">
                Created by: {task.createdBy?.email || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
