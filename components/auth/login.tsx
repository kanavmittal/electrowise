import axios from "axios";
import { useState } from "react";
import Router from 'next/router';
export default function loginComponent() {
  const [data, setData] = useState({});
  const [err, setErr] = useState({ success: "", error: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("/auth/login", data)
      .then((res) => {
        setErr({ ...err, success: "Login Successful" });
        Router.push('/dashboard')

      })
      .catch((err) => {
        if(err.response.statusText)
        {
          setErr({ ...err, error: err.response.statusText });
        }
       
      });
  };
  const handlechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });

  };
  return (
    <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" action="#" method="POST">
        <div className="text-center">
          {err.error ? (
            <span className="text-red-500">{err.error}</span>
          ) : (
            <span className="text-green-500">{err.success}</span>
          )}
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
            onClick={handleSubmit}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
