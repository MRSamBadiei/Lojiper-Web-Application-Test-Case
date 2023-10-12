"use client";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { I_Init } from "@/app/type";
import { Dispatch, SetStateAction } from "react";
import SeatIcon from "./SeatIcon";
import { setData } from "@/app/features/data/userSelection";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/features/hook";

const Wheel = () => {
  return (
    <svg
      width="100"
      height="200"
      viewBox="0 0 299 621"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-6"
    >
      <path
        d="M136.5 532.5V434.5L146 431.5C156.008 463.874 167.931 472.646 199.5 473V490.5C165.865 493.591 154.128 503.157 146 534.5L136.5 532.5Z"
        stroke="#5E5E5E"
      />
      <path
        d="M257 359V492.5L221 620C221 620 168.467 616.188 130 611.5M4.99995 492.5V531C9.02826 570.993 25.8685 590.629 130 611.5M4.99995 492.5C-0.323782 352.692 -0.436916 274.308 4.99995 134.5M4.99995 492.5L44.5 504.5M4.99995 134.5C3.24621 62.0256 22.9679 33.1171 122.5 18M4.99995 134.5L44.5 122.5M122.5 18V36.5C65.8809 40.7338 47.5206 58.125 44.5 122.5M122.5 18L298.5 1.5V8.5L276 31.5L221 34M44.5 122.5C37.0405 272.64 37.7366 356.189 44.5 504.5M44.5 504.5C49.4283 568.639 66.3859 587.809 122.5 591.5C122.5 591.5 118.5 606 130 611.5M221 34L219 14M221 34L151 38.5L144.5 18"
        stroke="black"
      />
      <path
        d="M200 483.5C200 511.97 177.587 535 150 535C122.413 535 100 511.97 100 483.5C100 455.03 122.413 432 150 432C177.587 432 200 455.03 200 483.5Z"
        stroke="#5E5E5E"
        strokeWidth="2"
      />
      <path
        d="M210.4 484C210.4 518.269 183.42 546 150.2 546C116.98 546 90 518.269 90 484C90 449.731 116.98 422 150.2 422C183.42 422 210.4 449.731 210.4 484Z"
        stroke="#5E5E5E"
        strokeWidth="2"
      />
      <circle cx="154" cy="484" r="7.5" stroke="#5E5E5E" />
    </svg>
  );
};

const BusLayout: React.FC<{
  departureLocation: string;
  destination: string;
  date: number;
  gender: "Male" | "Female";
  init: I_Init[];
  price: number;
  setInit: Dispatch<SetStateAction<I_Init[]>>;
}> = ({
  init,
  setInit,
  gender,
  price,
  departureLocation,
  date,
  destination,
}) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const setAndPay = () => {
    dispatch(
      setData({
        DepartureLocation: departureLocation,
        Date: date,
        Destination: destination,
        price: init.filter((e) => e.state === "Selected").length * price,
        seats: [
          ...init.filter((e) => e.state === "Selected").map((e) => e.seat),
        ] as unknown[] as number[],
      })
    );

    router.push("/Payment");
  };

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
              <div className="self-end mb-5 mr-5">
                <Wheel />
              </div>
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
              onClick={setAndPay}
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
