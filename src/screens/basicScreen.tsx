import React, { useState, useEffect } from "react";

import AgendaContent from "../components/agendaContent";
import Butterfly3D from "../components/butterflyAnimation";
import Content from "../components/content";
import ImageSection from "../components/imageSection";
import TitleOfGate from "../components/titleOfGate";
import FloatingButton from "../components/FloatingButton";
import ThankyouContent from "../components/thankyouContent";
import AudioPlayer from "../components/AudioPlayer";
import CherryBlossom from "../components/effect/CherryBloossom";

interface BasicScreenProps {
  coupleData: any;
  IMAGE_URL: string;
}

const BasicScreen: React.FC<BasicScreenProps> = ({ coupleData, IMAGE_URL }) => {
  const [enableSnap, setEnableSnap] = useState(false);
  const sections: string[] = [
    "Title",
    "Content",
    "Agenda",
    "Image",
    "ThankyouContent",
  ];

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

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGE_URL}${coupleData?.background?.url})`,
        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
        fontFamily: "unset",
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
      <CherryBlossom />
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
          fong_logo={`${IMAGE_URL}${coupleData?.fong_logo?.url}`}
        />
      </div>
      <div className="section w-screen snap-start flex justify-start relative">
        <AgendaContent
          agendaList={coupleData?.content_agenda?.agendaList}
          date={coupleData?.content_agenda?.date}
          khmer_date={coupleData?.content_agenda?.khmer_date}
          event_location={coupleData?.content_agenda?.event_location}
          restaurant_location={coupleData?.content_agenda?.restaurant_location}
          fong_logo={`${IMAGE_URL}${coupleData?.fong_logo?.url}`}
        />
      </div>
      <div className="section w-screen snap-start flex justify-start relative ">
        {photoBoothUrls.length > 0 && (
          <ImageSection
            imageList={photoBoothUrls}
            videoId={coupleData?.youtube_id}
          />
        )}
      </div>
      <div className="section w-screen snap-start flex justify-start relative pb-60">
        <ThankyouContent data={coupleData?.content_thnakyou} />
      </div>
      <FloatingButton sections={sections} />

      <AudioPlayer src={`${IMAGE_URL}${coupleData?.background_sound?.url}`} />
    </div>
  );
};

export default BasicScreen;
