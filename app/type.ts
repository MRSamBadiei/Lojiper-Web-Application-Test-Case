/* sign up */
interface I_ContactInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

interface I_PerosnalInfo {
  fname: string;
  lname: string;
  gender: "Male" | "Female";
  dateOfBirth: {
    d: string;
    m: string;
    y: string;
  };
}

/* Home */
interface I_Init {
  seat: number;
  gender: "Male" | "Female";
  state?: "Empty" | "Selected";
}

interface I_SeatIcon {
  state: "Empty" | "Selected" | "Male" | "Female" | "Taken";
  size?: {
    w: number;
    h: number;
  };
}

interface I_AvailableBus {
  DepartureLocation: string;
  Destination: string;
  Date: number;
  Price: number;
  Seats: I_Init[];
}

/* City routes */
interface I_CityRoutes {
  DepartureLocation: string;
  Destination: string;
  Date: number;
  Price: number;
  Seats: {
    seat: number;
    gender: string;
  }[];
}

export type {
  I_Init,
  I_SeatIcon,
  I_AvailableBus,
  I_ContactInfo,
  I_PerosnalInfo,
  I_CityRoutes,
};
