import type React from "react";
import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { useSpring, animated } from "@react-spring/web";
import ImageSection from "../components/imageSection";
import GoldThankyouContent from "../components/gold/goldThankyouContent";
import AudioPlayer from "../components/AudioPlayer";
import { CountdownTimer } from "../components/CountDownTimer";
interface KbachKhmerScreenProps {
  coupleData?: any;
  IMAGE_URL?: string;
}
interface FadeOnScrollProps {
  children: ReactNode;
}

const KbachKhmerScreen: React.FC<KbachKhmerScreenProps> = ({
  coupleData,
  IMAGE_URL,
}) => {
  const splitURL = window.location.href.split("&");
  const widthBox = window.innerWidth;
  const heightBox = window.innerHeight;
  const name = splitURL[splitURL.length - 1].includes("=")
    ? splitURL[splitURL.length - 1].split("=")
    : "";
  const finalName = name ? decodeURIComponent(name[splitURL.length - 1]) : "";
  const photoBoothUrls =
    coupleData?.photo_booth?.map((item: any, index: number) => ({
      id: index,
      image: `${IMAGE_URL}${item.url}`,
    })) || [];

  const [isOpen, setIsopen] = useState(false);
  const [isOpenMain, setIsopenMain] = useState(false);
  const [isOpenContain, setIsopenContain] = useState(false);

  const logo = useSpring({
    from: { y: 0, opacity: isOpen ? 1 : 0 },
    to: { y: isOpen ? -heightBox / 4 : 0, opacity: isOpen ? 0 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });
  const logoDown = useSpring({
    from: { y: 0, opacity: isOpen ? 1 : 0 },
    to: { y: isOpen ? heightBox / 4 : 0, opacity: isOpen ? 0 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });

  const moveLeft = useSpring({
    from: { x: 0, opacity: isOpen ? 1 : 0 },
    to: { x: isOpen ? -widthBox : 0, opacity: isOpen ? 1 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });
  const moveRight = useSpring({
    from: { x: 0, opacity: isOpen ? 1 : 0 },
    to: { x: isOpen ? widthBox : 0, opacity: isOpen ? 0 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });

  const mainAnimation = useSpring({
    from: { y: 0, opacity: isOpenMain ? 1 : 0 },
    to: { y: isOpenMain ? -heightBox / 4 : 0, opacity: isOpenMain ? 0 : 1 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });

  const contentAnimation = useSpring({
    from: { opacity: isOpenContain ? 0 : 1 },
    to: { opacity: isOpenContain ? 1 : 0 },
    config: { tension: 120, friction: 14, duration: 1000 },
  });

  const openMe = () => {
    setIsopen(!isOpen);
    setIsopenMain(true);
    setIsopenContain(!isOpenContain);
  };

  const scrollFadeIn: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const slideInLeft: any = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const FadeOnScroll = ({ children }: FadeOnScrollProps) => {
    return (
      <motion.div
        variants={scrollFadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        {children}
      </motion.div>
    );
  };

  const timelineDay1 = coupleData.content_agenda.agendaList.second_day;

  const targetDate = new Date(coupleData.content_agenda.date.countdown);
  const openMap = () => {
    window.open(coupleData.content_agenda.restaurant_location.link);
  };

  return (
    <div className="min-h-screen bg-amber-950/80 overflow-hidden">
      <div className="w-full h-full relative ">
        <div className="w-full h-full flex inset-0 fixed z-0">
          <animated.div
            className="flex-1 items-end justify-end pl-4"
            style={{
              ...moveLeft,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backgroundBlendMode: "overlay",
            }}
          >
            <img
              src={`${IMAGE_URL}${coupleData?.list_family_name?.khmerPattern}`}
              className="w-full h-full object-contain self-start"
              alt="Khmer Pattern"
            />
          </animated.div>
          <animated.div
            className="flex-1 items-start justify-start pr-4"
            style={{
              ...moveRight,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backgroundBlendMode: "overlay",
            }}
          >
            <img
              src={`${IMAGE_URL}${coupleData?.list_family_name?.khmerPattern}`}
              className="w-full h-full object-contain self-start rotate-y-180"
              alt="Khmer Pattern"
            />
          </animated.div>
        </div>

        <div className="inset-0 z-10 flex flex-col fixed">
          <div className="flex-1 flex items-start">
            <animated.div
              className="flex w-5/12 justify-end items-end content-end"
              style={moveLeft}
            >
              <img
                src={`${IMAGE_URL}${coupleData?.list_family_name?.frameGold}`}
                className="w-full md:w-[300px] h-full object-contain"
              />
            </animated.div>
            <animated.div
              className="flex w-2/12 items-center justify-center "
              style={logo}
            >
              <img
                src={`${IMAGE_URL}${coupleData?.list_family_name?.kbachKhmer}`}
                className="w-full md:w-[150px] h-full object-contain self-center"
              />
            </animated.div>
            <animated.div
              className="w-5/12 flex items-start justify-start "
              style={moveRight}
            >
              <img
                src={`${IMAGE_URL}${coupleData?.list_family_name?.frameGold}`}
                className="w-full md:w-[300px] h-full object-contain self-start rotate-y-180"
              />
            </animated.div>
          </div>
          <div className="flex-1 flex items-end">
            <animated.div
              style={moveLeft}
              className="flex w-5/12 justify-end items-end content-end"
            >
              <img
                src={`${IMAGE_URL}${coupleData?.list_family_name?.frameGold}`}
                className="w-full md:w-[300px] h-full object-contain"
              />
            </animated.div>
            <animated.div
              style={logoDown}
              className="flex w-2/12 items-center justify-center "
            >
              <img
                src={`${IMAGE_URL}${coupleData?.list_family_name?.kbachKhmer}`}
                className="w-full md:w-[150px] h-full object-contain self-center"
              />
            </animated.div>
            <animated.div
              style={moveRight}
              className="w-5/12 flex items-start justify-start "
            >
              <img
                src={`${IMAGE_URL}${coupleData?.list_family_name?.frameGold}`}
                className="w-full md:w-[300px] h-full object-contain self-start rotate-y-180"
              />
            </animated.div>
          </div>
        </div>
        <animated.div
          className="absolute inset-x-0 z-10 pt-30 md:pt-40 text-amber-200 "
          style={{
            ...mainAnimation,
            fontFamily: "Moulpali",
            display: isOpenMain ? "none" : "block",
          }}
        >
          <p
            className="text-2xl md:text-4xl text-center pb-4"
            style={{ fontFamily: "Moulpali" }}
          >
            សិរីមង្គលអាពាហ៏ពិពាហ៏
          </p>
          <div
            className="w-full flex justify-center py-8 cursor-pointer"
            onClick={openMe}
          >
            <img
              src={`${IMAGE_URL}${coupleData?.list_family_name?.logo_gold}`}
              className="object-cover w-5/12 md:w-[150px] max-w-xs"
              loading="lazy"
              alt="Logo"
            />
          </div>

          <p className="text-base md:text-2xl text-center py-2 md:py-4">
            សូមគោរពអញ្ជើញ
          </p>
          <p className="text-xl md:text-2xl text-center">{finalName}</p>

          <p className="text-2xl text-center pt-6">
            {coupleData.content_agenda.date.short_date}
          </p>
        </animated.div>

        <animated.div
          className="absolute inset-0 z-10 text-amber-200/80 overflow-y-auto w-screen h-screen overflow-x-hidden pb-30"
          style={{
            ...contentAnimation,
            display: isOpenContain ? "block" : "none",
            backgroundImage: `url(${IMAGE_URL}${coupleData?.list_family_name?.khmerPattern})`,
            backgroundSize: "contain",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backgroundBlendMode: "overlay",
          }}
        >
          <FadeOnScroll>
            <div className="flex-1 flex items-start">
              <div className="flex w-5/12 justify-end items-end content-end">
                <img
                  src={`${IMAGE_URL}${coupleData?.list_family_name?.frameGold}`}
                  className="w-full md:w-[300px] h-full object-contain"
                />
              </div>
              <div className="flex w-2/12 items-center justify-center ">
                <img
                  src={`${IMAGE_URL}${coupleData?.list_family_name?.kbachKhmer}`}
                  className="w-full md:w-[150px] h-full object-contain self-center"
                />
              </div>
              <div className="w-5/12 flex items-start justify-start ">
                <img
                  src={`${IMAGE_URL}${coupleData?.list_family_name?.frameGold}`}
                  className="w-full md:w-[300px] h-full object-contain self-start rotate-y-180"
                />
              </div>
            </div>
          </FadeOnScroll>
          <div className="px-5 pt-8">
            <FadeOnScroll>
              <p
                className="text-2xl md:text-4xl text-center "
                style={{ fontFamily: "Moul" }}
              >
                សិរីមង្គលអាពាហ៏ពិពាហ៏
              </p>
            </FadeOnScroll>

            <FadeOnScroll>
              <div
                className="flex justify-between py-4 pb-6 text-sm"
                style={{ fontFamily: "Angkor" }}
              >
                <div>
                  <p>លោក {coupleData?.list_family_name.groom_father}</p>
                  <p>លោកស្រី {coupleData?.list_family_name.groom_mother}</p>
                </div>
                <div>
                  <p>លោក {coupleData?.list_family_name.bride_father}</p>
                  <p>លោកស្រី {coupleData?.list_family_name.bride_mother}</p>
                </div>
              </div>
            </FadeOnScroll>

            <FadeOnScroll>
              <p className="text-center">សូមគោរពអញ្ជើញ</p>
            </FadeOnScroll>

            <FadeOnScroll>
              <p
                className="text-center text-xs/6 py-2 "
                style={{ fontFamily: "Moulpali" }}
              >
                {coupleData?.content_invitation}
              </p>
            </FadeOnScroll>

            <FadeOnScroll>
              <div
                className="flex justify-between text-xs pt-4 "
                style={{ fontFamily: "Moulpali" }}
              >
                <div className="flex items-center flex-col">
                  <p>កូនប្រុសនាម</p>
                  <p style={{ fontFamily: "Moul" }} className="pt-2 text-lg">
                    {coupleData.list_family_name.groom}
                  </p>
                  <img
                    src={`${IMAGE_URL}${coupleData?.list_family_name?.groomProfile}`}
                    className="object-cover pt-4 w-4/6"
                    loading="lazy"
                    alt="Logo"
                  />
                </div>
                <div className=" flex items-center flex-col">
                  <p>កូនស្រីនាម</p>
                  <p style={{ fontFamily: "Moul" }} className="pt-2 text-lg">
                    {coupleData.list_family_name.bride}
                  </p>
                  <img
                    src={`${IMAGE_URL}${coupleData?.list_family_name?.brideProfile}`}
                    className="object-cover pt-4 w-4/6"
                    loading="lazy"
                    alt="Logo"
                  />
                </div>
              </div>
            </FadeOnScroll>
            <FadeOnScroll>
              <p
                className="text-center pt-3 text-xs"
                style={{ fontFamily: "Moulpali" }}
              >
                ដែលនឹងប្រព្រឹត្តទៅនៅ
                {coupleData.content_agenda.date.full_date}
                {coupleData.content_agenda.restaurant_location.name}
              </p>
            </FadeOnScroll>

            <FadeOnScroll>
              <p
                className="text-lg text-center pt-6"
                style={{ fontFamily: "Moul" }}
              >
                កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
              </p>
            </FadeOnScroll>
            <div className="pt-4 text-sm" style={{ fontFamily: "Moulpali" }}>
              {timelineDay1.map((item: any, i: any) => (
                <motion.div
                  key={item.time}
                  variants={i % 2 === 0 ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  exit={{ opacity: 0, y: 200 }}
                  className="pt-4"
                >
                  <p className="text-center pb-2">{item.time}</p>
                  <p className="text-center pb-2">{item.detail}</p>
                </motion.div>
              ))}
            </div>
            <p
              className="text-center pt-10 text-lg"
              style={{ fontFamily: "Moul" }}
            >
              វិចិត្រសាល
            </p>
            <ImageSection imageList={photoBoothUrls} videoId={""} />
            <FadeOnScroll>
              <p
                className="text-center py-5 text-lg"
                style={{ fontFamily: "Moul" }}
              >
                ផែនទី
              </p>
              <div className="w-full bg-sky-50/10 rounded-lg">
                <img
                  src={`${IMAGE_URL}${coupleData?.list_family_name?.map}`}
                  className="object-fill w-full h-full rounded-lg"
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  className=" border p-3 px-5 rounded-lg bg-amber-50 text-amber-950"
                  style={{ fontFamily: "Moul" }}
                  onClick={openMap}
                >
                  មើល ផែនទី
                </button>
              </div>
            </FadeOnScroll>
            <FadeOnScroll>
              <div className="pt-20">
                <CountdownTimer targetDate={targetDate} />
              </div>
            </FadeOnScroll>
            <div className="pt-30 text-amber-200">
              <GoldThankyouContent data={coupleData?.content_thnakyou} />
            </div>
            <div className="text-amber-950">
              <AudioPlayer
                src={`${IMAGE_URL}${coupleData?.background_sound?.url}`}
                isPlay={isOpenMain}
              />
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default KbachKhmerScreen;
