"use client";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import React, { useEffect, useState } from "react";
import { I_AvailableBus, I_CityRoutes } from "../type";
import BusLayout from "./components/BusLayout";

import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";

const AvailableBus: React.FC<{
  data: I_AvailableBus;
  id: number;
  gender: "Male" | "Female";
}> = ({ data, id, gender }) => {
  const [open, setOpen] = useState(false);

  const [init, setInit] = useState(data.Seats);

  useEffect(() => {
    // console.log(init);
  }, [init]);

  return (
    <section
      className={`bg-white rounded-md border mb-10 ${id === 1 ? "mt-10" : ""}`}
    >
      {/* Main */}
      <div className="flex items-center p-5">
        <div className="flex justify-between w-3/4">
          <div className="text-center">
            <h3 className="font-semibold mb-3">id</h3>
            <div>{id}</div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-3">Departure - Destination</h3>
            {data.DepartureLocation} - {data.Destination}
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-3">Date</h3>
            <div>{dayjs.unix(data.Date).toISOString().split("T")[0]}</div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-3">Price</h3>
            <div>{data.Price}₺</div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-3">number of available seats</h3>

            <div className="flex items-center justify-center">
              <AirlineSeatReclineNormalIcon />
              <span>{40 - init.length}</span>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="theme-bg-color rounded-md"
          >
            <p className="text-white p-1 px-7">Select</p>
          </button>
        </div>
      </div>

      {/* data */}
      {open ? (
        <BusLayout
          price={data.Price}
          gender={gender}
          init={init}
          setInit={setInit}
          departureLocation={data.DepartureLocation}
          destination={data.Destination}
          date={data.Date}
        />
      ) : (
        <></>
      )}

      {/* footer */}
      <div className="flex justify-end border-t">
        <div className="flex items-center px-5 py-2 text-zinc-500">
          <ArrowCircleDownIcon className="w-5 h-5" />
          <p className="ml-1 text-sm">View</p>
        </div>
      </div>
    </section>
  );
};

const List: React.FC<{ gender: "Male" | "Female"; routes: I_CityRoutes[] }> = ({
  gender,
  routes,
}) => {
  return (
    <div className="container mx-auto">
      {routes.length == 0 ? (
        <div className={`bg-yellow-600 text-white rounded-md pl-5 py-3 mt-5`}>
          <p>warning</p>
          <p>- No available bus found</p>
        </div>
      ) : (
        <></>
      )}
      {routes.map((e, i) => {
        return (
          <AvailableBus
            gender={gender}
            key={i}
            id={i + 1}
            data={e as I_AvailableBus}
          />
        );
      })}
    </div>
  );
};

export default List;
