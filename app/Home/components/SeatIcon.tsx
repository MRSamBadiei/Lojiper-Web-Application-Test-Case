"use client";
import { I_SeatIcon } from "@/app/type";

const SeatIcon: React.FC<I_SeatIcon> = ({ state = "Empty", size }) => {
  const getColor = (): string => {
    switch (state) {
      case "Empty":
        return "white";
      case "Selected":
        return "#52b680";
      case "Female":
        return "#bd8598";
      case "Male":
        return "#50a4f3";
      default:
        return "white";
    }
  };

  return (
    <svg
      width={size?.w ?? 40}
      height={size?.h ?? 40}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0"
      style={{
        zIndex: -1,
      }}
    >
      <rect
        x="0.95"
        y="1.95"
        width="9.1"
        height="8.1"
        rx="1.05"
        fill={getColor()}
        stroke="black"
        strokeWidth="0.1"
      />
      <rect
        x="3.05"
        y="2.95"
        width="1.9"
        height="6.9"
        rx="0.95"
        transform="rotate(-90 3.05 2.95)"
        fill={getColor()}
        stroke="black"
        strokeWidth="0.1"
      />
      <rect
        x="3.05"
        y="10.95"
        width="1.9"
        height="6.9"
        rx="0.95"
        transform="rotate(-90 3.05 10.95)"
        fill={getColor()}
        stroke="black"
        strokeWidth="0.1"
      />
      <rect
        x="7.95"
        y="0.95"
        width="2.1"
        height="10.1"
        rx="1.05"
        fill={getColor()}
        stroke="black"
        strokeWidth="0.1"
      />
    </svg>
  );
};

export default SeatIcon;
