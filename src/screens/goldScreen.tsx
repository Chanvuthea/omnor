import { useSpring, animated } from "@react-spring/web";
import { useEffect, useMemo, useState } from "react";
import Butterfly3D from "../components/butterflyAnimation";
import ImageSection from "../components/imageSection";
import AudioPlayer from "../components/AudioPlayer";
import GoldContent from "../components/gold/goldContent";
import GoldAgendaContent from "../components/gold/goldAgendaContent";
import GoldThankyouContent from "../components/gold/goldThankyouContent";

interface GoldScreenProps {
  coupleData: any;
  IMAGE_URL: string;
}

const GoldScreen: React.FC<GoldScreenProps> = ({ coupleData, IMAGE_URL }) => {
  const splitURL = window.location.href.split("&");
  const name = splitURL[splitURL.length - 1].includes("=")
    ? splitURL[splitURL.length - 1].split("=")
    : "";
  const finalName = name ? decodeURIComponent(name[splitURL.length - 1]) : "";

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatingTwo, setIsAnimatingTwo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const photoBoothUrls = useMemo(
    () =>
      coupleData?.photo_booth?.map((item: any, index: number) => ({
        id: index,
        image: `${IMAGE_URL}${item.url}`,
      })) || [],
    [coupleData, IMAGE_URL]
  );

  const bgMountainLayer = useSpring({
    transform: isAnimating ? "scale(1)" : "scale(1.4)",
    config: { duration: 1200 },
  });

  const bgTreeLayer = useSpring({
    transform: isAnimatingTwo ? "scale(1)" : "scale(0)",
    config: { duration: 1200 },
  });

  useEffect(() => {
    setIsAnimating(true);
    setIsAnimatingTwo(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    setIsAnimating(false);
    setIsOpen(true);
    setTimeout(
      () => {
        scrollToSection("section2");
      },
      isOpen ? 0 : 1200
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-green-950 font-normal">
      <animated.div
        style={bgMountainLayer}
        key={isAnimating ? "bgMountainLayer" : "not-bgMountainLayer"}
        className=" absolute inset-0 flex items-center justify-center z-0"
      >
        <img
          src={`${IMAGE_URL}${coupleData?.background?.url}`}
          alt="bgMountainLayer"
          className="w-full h-full object-cover"
        />
      </animated.div>
      <div className=" absolute z-0">
        <Butterfly3D count={30} baseWidth={30} />
      </div>
      <div
        className="overflow-auto h-screen absolute snap-y snap-mandatory"
        style={{ overflowY: isOpen ? "auto" : "hidden" }}
      >
        <div className="w-screen h-screen flex justify-center" id="section1">
          <animated.div
            style={bgTreeLayer}
            className="bg-white/80 opacity-70  w-3/4 md:w-1/2 h-fit rounded-full mt-30 md:mt-15 pb-20"
          >
            <div
              className="w-full h-full flex flex-col content-center"
              style={{ fontFamily: "'Moulpali', 'Arial', sans-serif" }}
            >
              <div className="pt-18 md:pt-24">
                <p className="  bg-clip-text font-bold text-xl md:text-3xl justify-center text-center">
                  សិរីសួស្តីអាពាហ៏ពិពាហ៏
                </p>
              </div>
              <div className="flex flex-col justify-center pt-15 md:pt-20 px-5 md:px-10">
                <p className="text-center text-xl">សូមគោរពអញ្ជើញ</p>
                <p className="text-center p-5 font-bold text-xl">{finalName}</p>
              </div>
              <p className="  bg-clip-text font-bold text-xl md:text-3xl justify-center text-center pt-10 ">
                {coupleData?.date}
              </p>
              <div
                className="justify-center items-center flex pt-10 md:pt-20"
                onClick={handleClick}
              >
                <div className="w-1/2 flex justify-center items-center relative">
                  <img
                    src={`${IMAGE_URL}${coupleData?.floral_button_background?.url}`}
                    alt="bgMountainLayer"
                    className="w-full h-full object-cover"
                  />
                  <p className="absolute  bg-clip-text font-bold text-sm md:text-lg text-center">
                    បើកធៀប
                  </p>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
        <div className="w-screen bg-white/30  font-normal" id="section2">
          <div className="w-screen justify-center  flex flex-col">
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
              {photoBoothUrls.length > 0 && (
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
      </div>
      <AudioPlayer
        src={`${IMAGE_URL}${coupleData?.background_sound?.url}`}
        isPlay={isOpen}
      />
    </div>
  );
};

export default GoldScreen;
