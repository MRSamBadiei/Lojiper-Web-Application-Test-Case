"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/init";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [exits, setExist] = useState(false);
  const router = useRouter();

  const [error, setError] = useState(false);

  const emailExists = async () => {
    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);

    console.log("check", db);

    if (docSnap.exists()) {
      setExist(true);
    } else {
      setExist(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPass(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            <Alert hidden={!error} variant="filled" severity="error">
              You have entered an invalid email or password
            </Alert>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                  })
                    .then((e) => {
                      console.log(e);

                      if (!e?.ok) {
                        emailExists();

                        if (!exits) {
                          setError(true);
                        } else {
                          router.push("/SignUp");
                        }
                      } else {
                        router.push("/Home");
                      }
                    })
                    .catch((er) => {
                      console.log(er);
                    });
                }}
                disabled={!email || !password}
                className="flex w-full justify-center rounded-md disabled:bg-indigo-300 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <button
                onClick={() => router.push("/SignUp")}
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
