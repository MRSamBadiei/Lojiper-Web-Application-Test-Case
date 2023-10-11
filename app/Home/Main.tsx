"use client";
import Header from "./Header";
import Search from "./Search";
import List from "./List";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { useEffect, useState } from "react";
import { I_CityRoutes, I_PerosnalInfo } from "../type";
import cityRoutes from "@/cityRoutes.json";

const Main: React.FC<{ email: string }> = ({ email }) => {
  const [cityRoute, setCityRoute] = useState<I_CityRoutes[]>(cityRoutes);
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
  return (
    <div>
      <Header fullName={`${userData.info.fname} ${userData.info.lname}`} />
      <Search routes={cityRoute} setRoutes={setCityRoute} />
      <List routes={cityRoute} gender={userData.info.gender} />
    </div>
  );
};

export default Main;
