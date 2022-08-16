import { useState } from "react";
import Router from "next/router";
import axios from "axios";
export default function registerComponent() {
  const [data, setData] = useState({});
  const [err, setErr] = useState({ error: "", success: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("/auth/register", data)
      .then((res) => {
        setErr({ ...err, success: "You are registered successfully" });
        Router.push("/auth?login");
      })
      .catch((err) => {
        setErr({ ...err, error: err.response.statusText });
      });
  };
  const handlechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };
  return (
    <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <div className="mb-4 text-center">
        {
          err.error? (
            <span className="text-red-500">{err.error}</span>
          ): (
            <span className="text-green-500">{err.success}</span>
          )
        }
      </div>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handlechange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handlechange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handlechange}
            />
          </div>
        </div>
        
        
        <div>
          <label
            htmlFor="cpu"
            className="block text-sm font-medium text-gray-700"
          >
            Electricity cost per unit
          </label>
          <div className="mt-1">
            <input
              id="cpu"
              name="cost"
              type="test"
              autoComplete="cost"
              required
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handlechange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
