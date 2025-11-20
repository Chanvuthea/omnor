import React, { useEffect, useState } from "react";
import BasicScreen from "./screens/basicScreen";
import GoldScreen from "./screens/goldScreen";
import axios from "axios";
import PremiumScreen from "./screens/premiumScreen";
import CreateLinkScreen from "./screens/createLinkScreen";
import KbachKhmerScreen from "./screens/kbachKhmerScreen";

//Prod
const URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const token = import.meta.env.VITE_TOKEN;

//dev
// const URL = "http://localhost:1338";
// const IMAGE_URL = "http://localhost:1338";
// const token =
//   "52b341e50262d91c67841881f3ce32b92f49063102e6b7d15185999d032728887562c2bb72a0dfaf3fa7f5147edcfe44230cc6529e90414e43e39e17a93eea90a931e39685c0aa1fa9b9aa4ab34a071a589b0c34004afbba96a2fc55523e31fee7bde5e7859ca4f2db268238ffc13aa06a9e1899227c144503cc81e44be43802";

const App: React.FC = () => {
  const splitURL = window.location.href.split("?");
  const coupleID = splitURL[splitURL.length - 1];
  const [coupleData, setCoupleData] = useState<any>();
  const [_, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAgendaData = async () => {
      const baseEndpoint = `${URL}/api/couples?filters[couple_id][$eq]=${coupleID}`;
      const populateFields = [
        "background",
        "floral_button_background",
        "fong_logo",
        "photo_booth",
        "background_sound",
      ];

      let populateQuery = populateFields
        .map((field) => `populate[${field}][fields]=url`)
        .join("&");
      const endpoint = `${baseEndpoint}&${populateQuery}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCoupleData(response?.data?.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    coupleID !== "create" && fetchAgendaData();
  }, []);
  const checkType = () => {
    switch (coupleData?.list_family_name?.type) {
      case "basic":
        return <BasicScreen coupleData={coupleData} IMAGE_URL={IMAGE_URL} />;
      case "gold":
        return <GoldScreen coupleData={coupleData} IMAGE_URL={IMAGE_URL} />;
      case "premium":
        return <PremiumScreen coupleData={coupleData} IMAGE_URL={IMAGE_URL} />;
      case "kbach_khmer":
        return (
          <KbachKhmerScreen coupleData={coupleData} IMAGE_URL={IMAGE_URL} />
        );

      default:
        return (
          <div>
            <p>Loding....</p>
          </div>
        );
    }
  };
  return coupleID === "create" ? (
    <CreateLinkScreen URL={splitURL[0]} />
  ) : (
    checkType()
  );
};

export default App;
