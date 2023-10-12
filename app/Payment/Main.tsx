"use client";
import Header from "../Components/Header";
import Image from "next/image";
import visa from "@/public/cards-782.png";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useAppSelector } from "../features/hook";
import { useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

const Main: React.FC = () => {
  const router = useRouter();
  const price = useAppSelector((state) => state.userSelection.price);
  const seats = useAppSelector((state) => state.userSelection.seats);
  const date: number = useAppSelector((state) => state.userSelection.Date);
  const destination = useAppSelector(
    (state) => state.userSelection.Destination
  );
  const departureLocation = useAppSelector(
    (state) => state.userSelection.DepartureLocation
  );

  const [state, setState] = useState(0);

  const ref = useRef<HTMLFormElement | null>(null);
  const [load, setLoad] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState({
    m: "",
    y: "",
  });
  const [cvc2, setCvc2] = useState("");

  const payBtn = () => {
    if (
      cardNumber.trim() !== "" &&
      expirationDate.m.trim() !== "" &&
      expirationDate.y.trim() !== "" &&
      cvc2.trim() !== ""
    ) {
      setLoad(true);

      setTimeout(() => {
        setState(1);
        setLoad(false);
      }, 1000);
    } else {
      ref?.current?.requestSubmit();
    }
  };

  return (
    <div>
      <div
        className={`w-screen h-screen flex justify-center items-center z-10 absolute ${
          !load ? "hidden" : ""
        }`}
        style={{
          backgroundColor: "#0000003e",
        }}
      >
        <CircularProgress />
      </div>

      <Header fullName="" />
      <div
        className={`container mx-auto mt-10  flex-col md:flex-row ${
          state === 0 ? "flex" : "hidden"
        } `}
      >
        <div className="border p-5 rounded-md mr-5 w-1/3">
          <div className="border-b">
            <p>Trip information</p>
          </div>

          <div className="flex mt-5">
            <div className="w-1/2">
              <p className="font-semibold">From</p>
              <p>{departureLocation}</p>
            </div>
            <div className="w-1/2">
              <p className="font-semibold">To</p>
              <p>{destination}</p>
            </div>
          </div>

          <div className="flex mt-5">
            <div className="w-1/2">
              <p className="font-semibold">Date</p>
              <p>{dayjs.unix(date).toISOString().split("T")[0]}</p>
            </div>
            <div className="w-1/2">
              <p className="font-semibold">Seat(s)</p>
              <div className="flex flex-wrap">
                {seats.map((e, i) => (
                  <p key={i} className="mx-2">
                    {e}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border p-5 rounded-md w-2/2">
          <div className="border-b">
            <p>Payment information</p>
          </div>
          <Image className="mt-5" height={100} src={visa} alt={""} />
          <form ref={ref} className="w-full  mt-5">
            <div className="flex flex-col">
              <p className="mb-1">Card number</p>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="rounded-md"
                type="text"
                placeholder="•••• •••• •••• ••••"
              />
            </div>

            <div className="flex mt-5">
              <div className="flex flex-col w-1/2 mr-2">
                <p className="mb-1">Expiration date</p>
                <div className="flex w-2/4">
                  <input
                    required
                    className="rounded-md mr-1 w-1/2"
                    placeholder="MM"
                    type="number"
                    maxLength={2}
                    value={expirationDate.m}
                    onChange={(e) =>
                      setExpirationDate((p) => {
                        return { ...p, m: e.target.value };
                      })
                    }
                  />
                  <input
                    required
                    className="rounded-md w-1/2"
                    placeholder="YY"
                    type="number"
                    maxLength={2}
                    value={expirationDate.y}
                    onChange={(e) =>
                      setExpirationDate((p) => {
                        return { ...p, y: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <p className="mb-1">CVC2</p>
                <input
                  required
                  className="rounded-md"
                  placeholder="•••"
                  type="text"
                  maxLength={4}
                  value={cvc2}
                  onChange={(e) => setCvc2(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full mt-5">
              <button
                type="button"
                onClick={payBtn}
                className="text-white bg-lime-600 w-full flex p-2 rounded-md"
              >
                <GppGoodIcon className="w-10 h-10 my-auto" />
                <div className="flex flex-col justify-center items-center mx-auto">
                  <p>{price}₺</p>
                  <p>Make Secure Payments</p>
                </div>
                <div></div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`container mx-auto mt-10 ${
          state === 1 ? "flex" : "hidden"
        } flex-col`}
      >
        <Alert variant="filled" severity="success">
          payment successful!
        </Alert>

        <button
          onClick={() => {
            router.push("/Home");
          }}
          className="mx-auto p-5 rounded-md bg-green-500 mt-20 text-white"
        >
          Return to home page
        </button>
      </div>
    </div>
  );
};

export default Main;
