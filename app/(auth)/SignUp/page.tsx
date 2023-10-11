"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { auth, db } from "../../firebase/init";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { I_ContactInfo, I_PerosnalInfo } from "@/app/type";
import Alert from "@mui/material/Alert";
import { doc, setDoc } from "firebase/firestore";

const PersonalInfo: React.FC<{
  personalInfo: I_PerosnalInfo;
  setPersonalInfo: Dispatch<SetStateAction<I_PerosnalInfo>>;
  setStep: Dispatch<SetStateAction<number>>;
}> = ({ personalInfo, setPersonalInfo, setStep }) => {
  const changeTextEvent = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setPersonalInfo((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  };

  const changeBirthDateEvent = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPersonalInfo((p) => {
      return {
        ...p,
        dateOfBirth: {
          ...p.dateOfBirth,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const checkDisable = (): boolean => {
    if (
      personalInfo.fname === "" ||
      personalInfo.lname === "" ||
      personalInfo.dateOfBirth.d === "" ||
      personalInfo.dateOfBirth.m === "" ||
      personalInfo.dateOfBirth.y === ""
    ) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <label
            htmlFor="fname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              id="fname"
              name="fname"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeTextEvent}
              value={personalInfo.fname}
            />
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <label
            htmlFor="lname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lname"
              name="lname"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeTextEvent}
              value={personalInfo.lname}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              gender
            </label>
          </div>
          <div className="mt-2">
            <select
              id="gender"
              name="gender"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeTextEvent}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Date of birth
            </label>
          </div>
          <div className="mt-2 flex justify-between">
            <input
              id="d"
              name="d"
              type="text"
              required
              className="mr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeBirthDateEvent}
              placeholder="DD"
              maxLength={2}
              value={personalInfo.dateOfBirth.d}
            />
            <input
              id="m"
              name="m"
              type="text"
              required
              className="mr-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeBirthDateEvent}
              maxLength={2}
              placeholder="MM"
              value={personalInfo.dateOfBirth.m}
            />
            <input
              id="y"
              name="y"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeBirthDateEvent}
              maxLength={4}
              placeholder="YYYY"
              value={personalInfo.dateOfBirth.y}
            />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <button
          type="button"
          disabled={checkDisable()}
          className="flex w-full justify-center rounded-md disabled:bg-indigo-200 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            if (!checkDisable()) {
              setStep(2);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ContactInfo: React.FC<{
  showError: boolean;
  contactInfo: I_ContactInfo;
  setContactInfo: Dispatch<SetStateAction<I_ContactInfo>>;
  createNewAccount: () => void;
}> = ({ contactInfo, setContactInfo, createNewAccount, showError }) => {
  const pass = useRef<HTMLInputElement | null>(null);
  const conPass = useRef<HTMLInputElement | null>(null);
  const [showErrorLength, setShowErrorLength] = useState(false);
  const [showErrorConfirm, setShowErrorConfirm] = useState(false);
  const changeTextEvent = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setContactInfo((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (contactInfo.password !== "") {
      if (contactInfo.password.length < 6) {
        setShowErrorLength(true);
      } else {
        setShowErrorLength(false);
      }
    } else {
      setShowErrorLength(false);
    }

    if (
      contactInfo.confirmPassword !== "" &&
      contactInfo.confirmPassword !== contactInfo.password
    ) {
      setShowErrorConfirm(true);
    } else {
      setShowErrorConfirm(false);
    }

    setTimeout(() => {
      pass.current!.type = "password";
    }, 500);
  }, [contactInfo.password]);

  useEffect(() => {
    if (contactInfo.confirmPassword !== contactInfo.password) {
      setShowErrorConfirm(true);
    } else {
      setShowErrorConfirm(false);
    }

    setTimeout(() => {
      conPass.current!.type = "password";
    }, 500);
  }, [contactInfo.confirmPassword]);

  useEffect(() => {
    console.log(showErrorConfirm, showErrorLength);
  }, [showErrorConfirm, showErrorLength]);

  return (
    <div>
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
            onChange={changeTextEvent}
            value={contactInfo.email}
          />
        </div>
      </div>

      <div className="mt-5">
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
            type="text"
            ref={pass}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={changeTextEvent}
            value={contactInfo.password}
            minLength={6}
          />
        </div>
        <Alert
          hidden={!showErrorLength}
          className="mt-5"
          variant="filled"
          severity="error"
        >
          Password should be at least 6 characters long
        </Alert>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="text"
            ref={conPass}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={changeTextEvent}
            value={contactInfo.confirmPassword}
            minLength={6}
          />
        </div>
        <Alert
          hidden={!showErrorConfirm}
          className="mt-5"
          variant="filled"
          severity="error"
        >
          The passwords you entered do not match
        </Alert>
      </div>

      <Alert
        hidden={!showError}
        className="mt-5"
        variant="filled"
        severity="error"
      >
        Email is already exists
      </Alert>

      <div className="mt-7">
        <button
          type="button"
          disabled={
            showErrorConfirm ||
            showErrorLength ||
            contactInfo.email.trim() == ""
          }
          className="flex w-full disabled:bg-indigo-300 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={createNewAccount}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const steps = ["Personal Info", "Register"];

export default function Page() {
  const router = useRouter();
  const [step, setSetp] = useState<number>(1);
  const [showEmailExists, setShowEmailExists] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<I_PerosnalInfo>({
    fname: "",
    lname: "",
    gender: "Male",
    dateOfBirth: {
      d: "",
      m: "",
      y: "",
    },
  });

  const [contactInfo, setContactInfo] = useState<I_ContactInfo>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const createInfoIndatabase = async () => {
    await setDoc(doc(db, "Users", contactInfo.email), {
      info: personalInfo,
    });
  };

  const createNewAccount = (): void => {
    createUserWithEmailAndPassword(
      auth,
      contactInfo.email,
      contactInfo.password
    )
      .then((e) => {
        setShowEmailExists(false);
        createInfoIndatabase()
          .then((e) => {
            router.push("/SignIn");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        setShowEmailExists(true);
      });
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
            Sign up a new account
          </h2>
        </div>

        <Stepper className="mt-10" activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {step === 1 ? (
              <PersonalInfo
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
                setStep={setSetp}
              />
            ) : (
              <ContactInfo
                setContactInfo={setContactInfo}
                contactInfo={contactInfo}
                createNewAccount={createNewAccount}
                showError={showEmailExists}
              />
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/SignIn")}
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
