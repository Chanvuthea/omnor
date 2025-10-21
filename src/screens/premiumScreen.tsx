import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";
import ButterflyField from "../components/butterflyAnimation";

import CherryBlossom from "../components/effect/CherryBloossom";
import GoldContent from "../components/gold/goldContent";
import GoldAgendaContent from "../components/gold/goldAgendaContent";
import ImageSection from "../components/imageSection";
import GoldThankyouContent from "../components/gold/goldThankyouContent";
import AudioPlayer from "../components/AudioPlayer";

interface PremiumScreenProps {
  coupleData?: any;
  IMAGE_URL?: string;
}

const PremiumScreen: React.FC<PremiumScreenProps> = ({
  coupleData,
  IMAGE_URL,
}) => {
  const splitURL = window.location.href.split("&");
  const name = splitURL[splitURL.length - 1].includes("=")
    ? splitURL[splitURL.length - 1].split("=")
    : "";
  const finalName = name ? decodeURIComponent(name[splitURL.length - 1]) : "";
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinish, setisFinish] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const widthBox = window.innerWidth;
  const getScale = () => {
    if (widthBox < 768) {
      // iPad portrait or smaller
      return { scale: isOpen ? 1 : 2 };
    } else if (widthBox < 1024) {
      // iPad landscape or medium tablets
      return { scale: isOpen ? 1 : 2 };
    } else {
      // Larger screens
      return { scale: isOpen ? 1 : 2 };
    }
  };

  const leftHalfAnimation = useSpring({
    transform: isOpen
      ? `perspective(${widthBox}px) rotateY(-180deg) scale(0.98)`
      : `perspective(${widthBox}px) rotateY(0deg) scale(1)`,
    opacity: isOpen ? 0.9 : 1,
    transformOrigin: "center left",
    config: {
      tension: 170,
      friction: 260,
      mass: 1,
      easing: (t) => t * (2 - t),
    },
  });

  const rightHalfAnimation = useSpring({
    transform: isOpen
      ? `perspective(${widthBox}px) rotateY(180deg) scale(0.98)`
      : `perspective(${widthBox}px) rotateY(0deg) scale(1)`,
    opacity: isOpen ? 0.9 : 1,
    transformOrigin: "center right",
    config: {
      tension: 170,
      friction: 260,
      mass: 1,
      easing: (t) => t * (2 - t),
    },
  });

  const photoBoothUrls =
    coupleData?.photo_booth?.map((item: any, index: number) => ({
      id: index,
      image: `${IMAGE_URL}${item.url}`,
    })) || [];

  const bgMountainLayer = useSpring({
    ...getScale(),
    config: { duration: 2000 },
  });

  const logo = useSpring({
    from: { y: 200, opacity: isAnimating ? 1 : 0 },
    to: { y: isAnimating ? 1000 : 200, opacity: isAnimating ? 0 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });

  console.log(coupleData?.list_family_name);

  const onOpen = () => {
    setIsAnimating(!isAnimating);
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 1000);
    setTimeout(() => {
      setisFinish(!isFinish);
      setOpenImage(true);
    }, 2000);
  };

  return (
    <div className="relative w-full h-screen font-normal overflow-x-hidden">
      {!isFinish && (
        <div
          style={{ display: "flex", width: widthBox }}
          className="h-screen absolute z-20"
        >
          <animated.div
            style={{
              width: `${widthBox / 2}%`,
              height: "100%",
              border: "2px solid #000",
              transformStyle: "preserve-3d",
              ...leftHalfAnimation,
              backgroundImage: `url(${coupleData?.list_family_name?.left_door})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <animated.div
            style={{
              width: `${widthBox / 2}%`,
              height: "100%",

              border: "2px solid #000",
              transformStyle: "preserve-3d",
              backgroundImage: `url(${coupleData?.list_family_name?.right_door})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              ...rightHalfAnimation,
            }}
          />

          <animated.div
            className={" absolute justify-center flex w-screen"}
            style={{ ...logo, fontFamily: "'Moulpali', 'Arial', sans-serif" }}
            onClick={onOpen}
          >
            <img
              src={`${IMAGE_URL}${coupleData?.floral_button_background?.url}`}
              className=" w-2/4 md:w-2/6 h-full object-cover"
            ></img>
            <p className=" text-center text-base md:text-2xl text-amber-100 absolute top-1/2 -mt-4">
              បើកធៀប
            </p>
          </animated.div>
          <animated.div
            className={
              " absolute justify-center flex w-screen flex-col top-3/6 "
            }
            style={{ ...logo, fontFamily: "'Moulpali', 'Arial', sans-serif" }}
          >
            <p className=" text-center text-3xl md:text-5xl text-amber-100 ">
              សិរីមង្គលអាពាហ៏ពិពាហ៏
            </p>
            <p className=" text-center text-base md:text-2xl text-amber-100 p-5">
              សូមគោរពអញ្ជើញ
            </p>
            <p className=" text-center text-xl  md:text-4xl text-amber-100">
              {finalName}
            </p>
          </animated.div>
        </div>
      )}

      <div className="w-screen absolute snap-y snap-mandatory overflow-y-auto z-0 overflow-x-hidden">
        <div className=" absolute z-0">
          <ButterflyField count={30} baseWidth={30} />
          <CherryBlossom />
        </div>

        <div className="w-screen flex snap-start" id="section1">
          <animated.div style={bgMountainLayer} className="w-screen h-screen">
            <div className="absolute w-screen pt-40">
              <p
                style={{
                  fontFamily: "'Moulpali', 'Arial', sans-serif",
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.9)",
                }}
                className="text-3xl md:text-5xl text-center text-amber-100"
              >
                ១១.១១.២០២៥
              </p>
            </div>
            <img
              src={`${coupleData?.list_family_name?.background}`}
              className="w-screen h-screen object-cover"
            ></img>
          </animated.div>
        </div>
        <div
          className="w-screen flex flex-col bg-contain"
          id="section2"
          style={{
            backgroundImage: `url(${coupleData?.list_family_name?.frame_flower})`,
            backgroundRepeat: "repeat-y",
          }}
        >
          <div className="w-screen flex flex-col justify-center pt-10 z-10 text-green-950">
            <GoldContent
              list_family_name={coupleData?.list_family_name}
              content_invitation={coupleData?.content_invitation}
              content_location={coupleData?.content_location}
              fong_logo={`${IMAGE_URL}${coupleData?.fong_logo?.url}`}
            />
            <div className="w-screen flex justify-center pt-30">
              <GoldAgendaContent
                agendaList={coupleData?.content_agenda?.agendaList}
                date={coupleData?.content_agenda?.date}
                khmer_date={coupleData?.content_agenda?.khmer_date}
                event_location={coupleData?.content_agenda?.event_location}
                restaurant_location={
                  coupleData?.content_agenda?.restaurant_location
                }
                fong_logo={`${IMAGE_URL}${coupleData?.fong_logo?.url}`}
              />
            </div>

            <div className="w-screen flex justify-center ">
              {photoBoothUrls.length > 0 && openImage && (
                <ImageSection
                  imageList={photoBoothUrls}
                  videoId={coupleData?.youtube_id}
                />
              )}
            </div>
            <div className="w-screen flex justify-center pb-20">
              <GoldThankyouContent data={coupleData?.content_thnakyou} />
            </div>
          </div>
        </div>
        <AudioPlayer
          src={`${IMAGE_URL}${coupleData?.background_sound?.url}`}
          isPlay={isOpen}
        />
      </div>
    </div>
  );
};

export default PremiumScreen;
