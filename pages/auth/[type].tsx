import { useState } from "react";
import RegisterComponent from "../../components/auth/register";
import LoginComponent from "../../components/auth/login";
import Router from "next/router";
import Link from "../../node_modules/next/link";
export default function Example() {
  const router = Router.useRouter();
  const { type } = router.query;
  return (
    <div className="h-screen bg-gray-100">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition ease-in delay-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type == "register" ? "Register" : "Login to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            {type == "register" ? (
              <Link href={"/auth/login"}>
                <button className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </button>
              </Link>
            ) : (
              <Link href={"/auth/register"}>
                <button className="font-medium text-indigo-600 hover:text-indigo-500">
                  Register
                </button>
              </Link>
            )}
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {type == "register" ? (
            <RegisterComponent></RegisterComponent>
          ) : (
            <LoginComponent></LoginComponent>
          )}
        </div>
      </div>
    </div>
  );
}
