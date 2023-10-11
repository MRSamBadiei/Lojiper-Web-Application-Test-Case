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
          <div>{id}</div>
          <div>
            {data.DepartureLocation} - {data.Destination}
          </div>
          <div>{dayjs.unix(data.Date).toISOString().split("T")[0]}</div>
          <div>{data.Price}₺</div>
          <div className="flex items-center">
            <AirlineSeatReclineNormalIcon />
            {40 - init.length}
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
        <Alert className="mt-5" variant="filled" severity="warning">
          No available bus found
        </Alert>
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
