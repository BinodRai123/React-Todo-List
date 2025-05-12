import { useState, type JSX } from "react";

type task = {
  title: string;
};

type TaskProps = {
  task: { title: string };
  id: number;
  deleteTask: (id: number) => void;
};

const App = () => {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<task[]>([
    { title: "100 PushUps" },
    { title: "100 Setups" },
  ]);

  const deleteTask = (id: number) => {
    setTasks(
      tasks.filter((task, index) => {
        if (index != id) return task;
      })
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            My Todo List
          </h1>

          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setTasks([...tasks, { title: text }]);
              setText("");
            }}
          >
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></input>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-200">
              Add
            </button>
          </form>

          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <Task task={task} id={index} deleteTask={deleteTask} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

function Task({ task, id, deleteTask }: TaskProps): JSX.Element {
  return (
    <li
      key={id}
      className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition"
    >
      <span className="text-gray-700">{task.title}</span>
      <button
        onClick={() => deleteTask(id)}
        className="text-red-500 hover:text-red-700 transition cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}

export default App;
