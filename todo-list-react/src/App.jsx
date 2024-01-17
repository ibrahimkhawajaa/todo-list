"use client";
import "./App.css";

import { useEffect, useState } from "react";
function App() {
  // states for app
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [main, setmain] = useState([]);

  // load tasks from local storage when component is mounted
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setmain(tasks);
    }
  }, []);

  // on submit form logic
  const onSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, desc };
    setmain([...main, newTask]);
    setTitle("");
    setDesc("");
    localStorage.setItem("tasks", JSON.stringify([...main, newTask]));
    console.log(main);
  };

  //no delete button logic
  const DeleteHandler = (i) => {
    let task = [...main];
    task.splice(i, 1);
    setmain(task);
    localStorage.setItem("tasks", JSON.stringify(task));
  };

  // on no task render and task render logic
  let Render = <div>No Task</div>;
  if (main.length > 0) {
    Render = main.map((t, i) => {
      return (
        <div className="flex items-center justify-center p-5" key={i}>
          <div className="gap-10 overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl">
              <thead>
                <tr className="text-gray-700 bg-blue-gray-100">
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Desciption</th>

                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-blue-gray-900">
                <tr className="border-b border-blue-gray-200">
                  <td className="px-4 py-3">{t.title}</td>
                  <td className="px-4 py-3">{t.desc}</td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => DeleteHandler(i)}
                      href="#"
                      class="font-medium text-blue-600 hover:text-blue-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <h1 className="p-10 text-2xl text-center">TodoList</h1>
      <form class="max-w-sm mx-auto pt-20 w-[80%]" onSubmit={onSubmit}>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            placeholder="title..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            placeholder="description..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="flex items-start mb-5"></div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <br />
      <br />
      <div className="text-center bg-[#F0F8FF] p-10">{Render}</div>
    </>
  );
}

export default App;