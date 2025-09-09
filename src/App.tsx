import React, { useState, useEffect } from "react";
import axios from "axios";
import AgendaContent from "./components/agendaContent";
import Butterfly3D from "./components/butterflyAnimation";
import Content from "./components/content";
import ImageSection from "./components/imageSection";
import TitleOfGate from "./components/titleOfGate";
import FloatingButton from "./components/FloatingButton";
import ThankyouContent from "./components/thankyouContent";
import AudioPlayer from "./components/AudioPlayer";

//Prod
const URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
const token = import.meta.env.VITE_TOKEN;

//dev
// const URL = "http://localhost:1337";
// const IMAGE_URL = "http://localhost:1337";
// const token =
//   "93270bddc549cfbcdf6e9daec5ce5434481ddca1e2c488b885d7fa079d7faed496bb073ce468428c2a57a77f347860700fdeeb58e225a35f294fe5de9b79cba9e45a4f159a4644a475568bbfdc675897911efa0316ca2300e35c72f32ba58a872548ac9cde8ca171098d1d6668fb489729a468e77c38d1a2ac8623dcc882c21a";

const App: React.FC = () => {
  const splitURL = window.location.href.split("?");
  const coupleID = splitURL[splitURL.length - 1];

  const [enableSnap, setEnableSnap] = useState(false);
  const [coupleData, setCoupleData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sections: string[] = [
    "Title",
    "Content",
    "Agenda",
    "Image",
    "ThankyouContent",
  ];

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
    fetchAgendaData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setEnableSnap(false);
      } else {
        setEnableSnap(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate photoBoothUrls outside the JSX
  const photoBoothUrls =
    coupleData?.photo_booth?.map((item: any, index: number) => ({
      id: index,
      image: `${IMAGE_URL}${item.url}`,
    })) || [];

  return !isLoading ? (
    <div
      style={{
        backgroundImage: `url(${IMAGE_URL}${coupleData?.background?.url})`,
        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
      }}
      className={`
        text-amber-100
        full-screen-bg
        bg-cover
        bg-center
        bg-no-repeat
        bg-opacity-20
        scroll-container
        h-screen
        w-screen
        overflow-y-scroll
        ${enableSnap ? "snap-mandatory" : "snap-none"}
        `}
    >
      <Butterfly3D count={30} baseWidth={30} />
      <div className="section snap-start h-screen w-screen flex justify-center ">
        <TitleOfGate
          groomName={coupleData?.list_family_name?.groom}
          brideName={coupleData?.list_family_name?.bride}
          btnBackground={`${IMAGE_URL}${coupleData?.floral_button_background?.url}`}
          fongLogo={`${IMAGE_URL}${coupleData?.fong_logo?.url}`}
          date={coupleData?.date}
        />
      </div>
      <div className="section w-screen snap-start flex justify-start relative">
        <Content
          list_family_name={coupleData?.list_family_name}
          content_invitation={coupleData?.content_invitation}
          content_location={coupleData?.content_location}
        />
      </div>
      <div className="section w-screen snap-start flex justify-start relative">
        <AgendaContent
          agendaList={coupleData?.content_agenda?.agendaList}
          date={coupleData?.content_agenda?.date}
          khmer_date={coupleData?.content_agenda?.khmer_date}
          location={coupleData?.content_agenda?.location}
        />
      </div>
      <div className="section w-screen snap-start flex justify-start relative ">
        <ImageSection
          imageList={photoBoothUrls}
          videoId={coupleData?.youtube_id}
        />
      </div>
      <div className="section w-screen snap-start flex justify-start relative pb-60">
        <ThankyouContent data={coupleData?.content_thnakyou} />
      </div>
      <FloatingButton sections={sections} />

      <AudioPlayer src={`${IMAGE_URL}${coupleData?.background_sound?.url}`} />
    </div>
  ) : (
    <div className="h-screen w-screen">Loading...</div>
  );
};

export default App;
