"use client";
import Header from "../Components/Header";
import Search from "./Search";
import List from "./List";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { useEffect, useState } from "react";
import { I_CityRoutes, I_PerosnalInfo } from "../type";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

const kind = [
  {
    name: "Buses",
    icon: DirectionsBusIcon,
  },
  {
    name: "Flights",
    icon: AirplanemodeActiveIcon,
  },
  {
    name: "Hotels",
    icon: HotelIcon,
  },
  {
    name: "Cars",
    icon: DirectionsCarIcon,
  },
  {
    name: "Ferries",
    icon: DirectionsBoatIcon,
  },
];

const Main: React.FC<{ email: string }> = ({ email }) => {
  const [cityRoute, setCityRoute] = useState<I_CityRoutes[]>([]);
  const [userData, setUserData] = useState<{ info: I_PerosnalInfo }>({
    info: {
      fname: "",
      lname: "",
      dateOfBirth: {
        d: "",
        m: "",
        y: "",
      },
      gender: "Male",
    },
  });
  const getUserFromDB = async () => {
    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data() as { info: I_PerosnalInfo });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getUserFromDB();
  }, []);

  const getPath = async () => {
    const response = await fetch("/api/path");

    const json = await response.json();
    setCityRoute(json);
  };

  useEffect(() => {
    getPath();
  }, []);

  return (
    <div>
      <Header fullName={`${userData.info.fname} ${userData.info.lname}`} />
      <section>
        <ul className="flex flex-col md:flex-row container mx-auto py-4">
          {kind.map((e, i) => {
            return (
              <li
                className={`${
                  i == 0
                    ? "theme-bg-color text-white"
                    : "text-zinc-500 border border-zinc-400"
                } mr-3 rounded-3xl p-2`}
                key={i}
              >
                <div className="flex items-center mx-3">
                  <span
                    className="mr-2"
                    style={{ color: i == 0 ? "white" : "#d23b38" }}
                  >
                    <e.icon />
                  </span>

                  <span className="font-semibold">{e.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <Search routes={cityRoute} setRoutes={setCityRoute} />
      <List routes={cityRoute} gender={userData.info.gender} />
    </div>
  );
};

export default Main;
