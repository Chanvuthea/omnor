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
const URL = "https://natural-authority-5239a4daaf.strapiapp.com";
const IMAGE_URL = "";
const token =
  "0318c3bb98b67bc1e71edbb8f84d3a054775711d69009a2a9e38755dcf6f096d46b08e59d8778d1dc310cb0523c1d5eb7a632bd32e727eef38607865c1c0d21c521fcc6e6ebeaa074e6ad92a41a4f56a297fbd17dbe41c31742abcccd4409d2a0e9c20941d5f9520b789b37e2a6952efcf545eb6dd9d662a368a5a27bf595e0d";

//dev
// const URL = "http://localhost:1337";
// const IMAGE_URL = "http://localhost:1337";
// const token =
//   "7afabdced5d1c42be3097419fe6d2be9a13065247710714fd3c934141dd67c8eb8f76af4a79493a270352a2ae22382cabf7429ad9ed87c0db4bdeeb4eb15e5b96f8fb0ed9c3e18b3f8eb3860e3e84201e47439c041ba7932b24aa0f36c1e6d6f04d83d7f7c6866107ecc78b58c531d93c97c98d55e91eeeacc4916e80596b288";

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
      const endpoint = `${URL}/api/somnehrs?filters[couple_id][$eq]=${coupleID}&populate[background][fields][0]=url&populate[floral_button_background][fields][0]=url&populate[fong_logo][fields][0]=url&populate[photo_booth][fields][0]=url&populate[background_sound][fields][0]=url`;
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
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
        ${enableSnap ? "snap-y snap-mandatory" : "snap-none"}
        `}
    >
      <Butterfly3D count={30} baseWidth={25} />
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
      <div className="section w-screen snap-start flex justify-start relative">
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
