"use client";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { I_Init } from "@/app/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SeatIcon from "./SeatIcon";

const BusLayout: React.FC<{
  gender: "Male" | "Female";
  init: I_Init[];
  price: number;
  setInit: Dispatch<SetStateAction<I_Init[]>>;
}> = ({ init, setInit, gender, price }) => {
  const addToList = (l: number, seatNumber: number) => {
    const selected = init.filter((p) => p.state === "Selected");

    const isSelectedSeat =
      init.filter((p) => p.seat === seatNumber && p.state === "Selected")
        .length === 0
        ? false
        : true;

    if (isSelectedSeat) {
      const findIndex = init.findIndex(
        (p) => p.seat === seatNumber && p.state === "Selected"
      );
      console.log(init, findIndex);

      setInit((p) => p.filter((p) => p.seat !== seatNumber));

      console.log(init, findIndex);
    } else {
      // find seat next to that one been selected
      const sideSeat = seatNumber % 2 === 0 ? seatNumber - 1 : seatNumber + 1;
      // check if seat next to is taken
      const isSideSeatTaken = init.filter((p) => p.seat === sideSeat);

      console.log(sideSeat, isSideSeatTaken.length === 0 ? false : true);
      // TEST

      if (isSideSeatTaken.length !== 0) {
        // is taken check for gender
        const sideSeatGender = isSideSeatTaken[0].gender;

        if (
          (sideSeatGender === "Female" && gender === "Male") ||
          (sideSeatGender === "Male" && gender === "Female")
        ) {
          alert(
            "According to the bus company rules, the seat you have chosen can only be sold to female passengers."
          );
        } else {
          if (l === 0) {
            if (selected.length < 5) {
              setInit((p) => [
                ...p,
                {
                  seat: seatNumber,
                  gender: gender,
                  state: "Selected",
                },
              ]);
            } else {
              alert(
                "The carrier allows a maximum of 4 seats to be sold at a time."
              );
            }
          } else {
            alert(
              "The seat you have chosen has already been purchased, please choose one of the empty (white) seats."
            );
          }
        }
      } else {
        if (l === 0) {
          if (selected.length < 5) {
            setInit((p) => [
              ...p,
              {
                seat: seatNumber,
                gender: gender,
                state: "Selected",
              },
            ]);
          } else {
            alert(
              "The carrier allows a maximum of 5 seats to be sold at a time."
            );
          }
        } else {
          alert(
            "The seat you have chosen has already been purchased, please choose one of the empty (white) seats."
          );
        }
      }
    }

    console.log("click detected", selected.length);
  };

  const EachSeatDetail: React.FC<{ e: number }> = ({ e }) => {
    const check = init.filter((p) => p.seat === e);

    return (
      <div
        onClick={() => addToList(check.length, e)}
        className={`w-10 h-10 mr-2 relative flex justify-center items-center cursor-pointer`}
        style={{
          zIndex: 0,
        }}
      >
        <div className="-z-10">
          <span className="relative font-bold">{e}</span>
          <SeatIcon
            state={
              check.length !== 0
                ? check[0].state
                  ? check[0].state
                  : check[0].gender
                : "Empty"
            }
          />
        </div>
      </div>
    );
  };

  const EachSeat: React.FC<{ nums: number[] }> = ({ nums }) => {
    return (
      <div className="flex relative z-20">
        {nums.map((e: number, i) => {
          return <EachSeatDetail e={e} key={i} />;
        })}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-zinc-100 flex flex-col p-5">
        <div className="flex">
          <div className="w-8/12 flex flex-col">
            <div className="flex justify-center items-center mx-auto relative z-0">
              <div className="flex flex-col z-10 relative">
                <EachSeat nums={[4, 8, 12, 16, 20]} />
                <EachSeat nums={[3, 7, 11, 15, 19]} />
                <div className="mb-8"></div>
                <EachSeat nums={[2, 6, 10, 14, 18]} />
                <EachSeat nums={[1, 5, 9, 13, 17]} />
              </div>
              <div className="flex flex-col z-10 relative">
                <EachSeat nums={[24, 28, 32, 36, 40]} />
                <EachSeat nums={[23, 27, 31, 35, 39]} />
                <div className="mb-8"></div>
                <EachSeat nums={[22, 26, 30, 34, 38]} />
                <EachSeat nums={[21, 25, 29, 33, 37]} />
              </div>
            </div>

            {/* bus layout footer */}
            <div className="flex mt-5">
              <div className="flex justify-between w-full">
                <div className="flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <PowerSettingsNewIcon className="theme-text-color w-5 h-5 mr-1" />
                    <p className="text-xs">
                      You can cancel your ticket online until the last 1
                      hour(s).
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <AccessTimeIcon className="theme-text-color w-5 h-5 mr-1" />
                    <p className="text-xs">
                      Departs at the connecting night Wednesday to Thursday
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <div className="flex items-center">
                      <div className="w-6 z-10 h-6 mr-1 relative flex justify-center items-center">
                        <SeatIcon state="Male" size={{ w: 24, h: 24 }} />
                      </div>
                      <p className="text-sm">Occupied - Male</p>
                    </div>
                    <div className="flex items-center mt-3">
                      <div className="w-6 z-10 h-6 mr-1 relative flex justify-center items-center">
                        <SeatIcon state="Female" size={{ w: 24, h: 24 }} />
                      </div>
                      <p className="text-sm">Occupied - Female</p>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <div className="w-6 z-10 h-6 mr-1 relative flex justify-center items-center">
                        <SeatIcon state="Empty" size={{ w: 24, h: 24 }} />
                      </div>
                      <p className="text-sm">Empty</p>
                    </div>
                    <div className="flex items-center mt-3">
                      <div className="w-6 z-10 h-6 mr-1 relative flex justify-center items-center">
                        <SeatIcon state="Selected" size={{ w: 24, h: 24 }} />
                      </div>
                      <p className="text-sm">Selected seat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          {/* other half*/}
          <div className="border-l p-2 w-4/12 flex flex-col justify-between">
            {init.filter((p) => p.state === "Selected").length === 0 ? (
              <p>Please select a seat from the left (Max 5)</p>
            ) : (
              <div>
                <p>Your selected seats (Max 5)</p>
                <div className="flex">
                  {init
                    .filter((p) => p.state === "Selected")
                    .map((e, i) => {
                      return (
                        <div className="mr-2" key={i}>
                          <div
                            className={`w-10 z-10 h-10 relative flex justify-center items-center`}
                          >
                            <span className="relative font-bold">{e.seat}</span>
                            <SeatIcon state={e.gender} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            <div className="flex">
              <p className="mr-1">Total Cost:</p>
              <span>
                {init.filter((p) => p.state === "Selected").length * price}₺
              </span>
            </div>

            <button
              disabled={init.filter((p) => p.state === "Selected").length === 0}
              className="uppercase disabled:bg-lime-200 bg-lime-500 py-2 px-4 text-white rounded-md"
            >
              confirm and continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusLayout;
