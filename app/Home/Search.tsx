"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { I_CityRoutes } from "../type";

const Search: React.FC<{
  routes: I_CityRoutes[];
  setRoutes: Dispatch<SetStateAction<I_CityRoutes[]>>;
}> = ({ routes, setRoutes }) => {
  const [departureLocation, setDepartureLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [searchDate, setSearchDate] = useState(dayjs(new Date()));

  const [show, setShow] = useState(false);

  const searchButton = () => {
    console.log(
      departureLocation,
      destination,
      dayjs(searchDate).toISOString().split("T")[0]
    );

    if (departureLocation == "" || destination == "") {
      setShow(true);
    } else {
      setShow(false);

      setRoutes((p) => [
        ...routes.filter((e) => {
          return (
            e.DepartureLocation == departureLocation &&
            e.Destination == destination &&
            dayjs.unix(e.Date).toISOString().split("T")[0] ==
              dayjs(searchDate).toISOString().split("T")[0]
          );
        }),
      ]);
    }
  };

  return (
    <div>
      <section id="search" className="theme-grey-color">
        <div className="container mx-auto">
          <div className="p-5 flex items-center justify-between">
            <Autocomplete
              disablePortal
              options={[
                { label: "Istanbul", id: 1 },
                { label: "Ankara", id: 2 },
                { label: "Izmir", id: 3 },
                { label: "Bursa", id: 4 },
                { label: "Adana", id: 5 },
                { label: "Samsun", id: 6 },
              ]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Departure location" />
              )}
              inputValue={departureLocation}
              onInputChange={(e, newValue) => setDepartureLocation(newValue)}
            />
            <Autocomplete
              disablePortal
              options={[
                { label: "Istanbul", id: 1 },
                { label: "Ankara", id: 2 },
                { label: "Izmir", id: 3 },
                { label: "Bursa", id: 4 },
                { label: "Adana", id: 5 },
                { label: "Samsun", id: 6 },
              ]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="destination" />
              )}
              inputValue={destination}
              onInputChange={(e, newValue) => setDestination(newValue)}
            />
            <DatePicker
              value={dayjs(searchDate)}
              onChange={(newValue) => setSearchDate(dayjs(newValue))}
              className="p-2"
              label="Date"
            />
            <button
              className="theme-bg-color rounded-md"
              onClick={searchButton}
            >
              <div className="p-2 text-white">
                <SearchIcon className="mr-1" />
                Search
              </div>
            </button>
          </div>
        </div>
      </section>
      <div className="container mx-auto mt-2">
        <div
          className={`bg-yellow-600 text-white rounded-md pl-5 py-3 mt-5 ${
            !show ? "hidden" : "block"
          }`}
        >
          <p>warning</p>
          {departureLocation === "" ? (
            <p>- Departure location field is empty</p>
          ) : (
            ""
          )}
          {destination === "" ? <p>- Destination field is empty</p> : ""}
        </div>
      </div>
    </div>
  );
};

export default Search;
