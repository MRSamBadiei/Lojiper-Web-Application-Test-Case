"use client";
import { signOut } from "next-auth/react";
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

const Header: React.FC<{ fullName: string }> = ({ fullName }) => {
  return (
    <div>
      <header className="p-5">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="uppercase font-bold text-2xl">sb travel</div>
          <div className="flex items-center">
            <p className="mr-5">Welcome {fullName}</p>
            <button className="border rounded-md p-2" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </header>

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
    </div>
  );
};

export default Header;
