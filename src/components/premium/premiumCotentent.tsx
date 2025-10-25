import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../assets/Main.css";

import ImageSection from "../imageSection";
import GoldThankyouContent from "../gold/goldThankyouContent";
// import LeafFall from './Leaf';
// import Logo from './Logo';
// import Wish from './Wish';
// import Photo from './Photo';

// ✅ Day 1 Timeline (08 Nov 2025)
// const timelineDay1 = [
//   { time: "ម៉ោង​ ៣ ៖ ០០ ​រសៀល", detail: "ពិធីក្រុងពាលី" },
//   { time: "ម៉ោង​ ៤ ៖ ០០ ​រសៀល", detail: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត" },
//   { time: "ម៉ោង ៥ ៖ ០០ ល្ងាច", detail: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលល្ងាច" },
// ];

// ✅ Day 2 Timeline (09 Nov 2025)
// const timelineDay2 = [
//   { time: "ម៉ោង​ ៦ ៖ ៣០ ព្រឹក", detail: "ជូបជ៉ំភ្ញៀវកិត្តិយសរៀបចំពិធីហែជំនូន" },
//   { time: "ម៉ោង​ ៧ ៖ ០០ ព្រឹក", detail: "ពិធីហែជំនូន ចូលរោងជ័យ" },
//   {
//     time: "ម៉ោង​ ៧ ៖ ៣០ ព្រឹក",
//     detail: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក",
//   },
//   { time: "ម៉ោង ៨ ៖ ០០ ព្រឹក", detail: "ពិធីពិសាស្លាដកកន្សែង (រៀបរាប់ផ្លែឈើ)" },
//   { time: "ម៉ោង​ ៩ ៖ ០០ ​ព្រឹក", detail: "ពិធីជាវខាន់ស្លា" },
//   { time: "ម៉ោង​ ១០ ៖ ៣០ ​ព្រឹក", detail: "ពិធីកាត់សក់បង្កក់សិរី" },
//   {
//     time: "ម៉ោង​ ១១ ៖ ៤៥ ព្រឹក",
//     detail: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលថ្ងៃត្រង់",
//   },
// ];

// ✅ Page Entry Animation
const pageVariants: any = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  exit: { opacity: 0, y: -100, transition: { duration: 0.5, ease: "easeIn" } },
};

// ✅ Scroll Animations
const scrollFadeIn: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const slideInLeft: any = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const PremiumContent = (data: any) => {
  const IMAGE_URL = data.data.IMAGE_URL;
  const coupleData = data.data.coupleData;
  const timelineDay1 = coupleData.content_agenda.agendaList.first_day;
  const timelineDay2 = coupleData.content_agenda.agendaList.second_day;
  console.log(timelineDay2);
  const photoBoothUrls =
    coupleData?.photo_booth?.map((item: any, index: number) => ({
      id: index,
      image: `${IMAGE_URL}${item.url}`,
    })) || [];
  const checkDay = timelineDay1.length > 0 ? "day1" : "day2";
  const [selectedDay, setSelectedDay] = useState(checkDay); // default Day 1
  const currentTimeline = selectedDay === "day1" ? timelineDay1 : timelineDay2;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main-content"
        className="bg-Main"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        {/* <LeafFall /> */}

        {/* Header */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="Mono1"
        >
          <h3>សិរីមង្គលអាពាហ៍ពិពាហ៍</h3>
        </motion.div>

        {/* Parents */}

        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mom-names "
        >
          <h6>លោក {coupleData.list_family_name.groom_father}</h6>
          <h6>លោក {coupleData.list_family_name.bride_father}</h6>
        </motion.div>
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mom-names "
        >
          <h6>លោកស្រី {coupleData.list_family_name.groom_mother}</h6>
          <h6>លោកស្រី {coupleData.list_family_name.bride_mother}</h6>
        </motion.div>

        {/* Invite Text */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <h4 className="pt-4 invite">សូមគោរពអញ្ជើញ</h4>
          <h6 className="sub-invite pt-2">{coupleData.content_invitation}</h6>
        </motion.div>

        {/* Groom & Bride */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="groom-bride-tittle mt-3"
        >
          <p>កូនប្រុសនាម</p>
          <p>កូនស្រីនាម</p>
        </motion.div>
        <motion.div
          // variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="groom-bride-names"
        >
          <div className="name-pair">
            <p>{coupleData.list_family_name.groom}</p>
            <p className="ps-3">{coupleData.list_family_name.bride}</p>
          </div>
        </motion.div>

        {/* Date Info */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="dateinfo"
        >
          <h6>ដែលនឹងប្រព្រឹត្តទៅនៅ</h6>
          <h6>{coupleData.content_agenda.date.full_date}</h6>
          <h6>{coupleData.content_agenda.restaurant_location.name}</h6>
        </motion.div>

        {/* Calendar Button */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="bt"
        >
          <a
            className="calendar-button mt-2"
            href={coupleData.content_agenda.calendar_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            កត់ទុកក្នុងប្រតិទិន 🗓️
          </a>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h3 className="event mt-5">កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍</h3>

          {/* Toggle Buttons */}
          <div className="day-toggle mt-4 mb-5">
            {timelineDay1.length > 0 && (
              <button
                className={`day-btn ${selectedDay === "day1" ? "active" : ""}`}
                onClick={() => setSelectedDay("day1")}
              >
                {coupleData.content_agenda.date.first_day}
              </button>
            )}
            {timelineDay2.length > 0 && (
              <button
                className={`day-btn ${selectedDay === "day2" ? "active" : ""}`}
                onClick={() => setSelectedDay("day2")}
              >
                {coupleData.content_agenda.date.second_day}
              </button>
            )}
          </div>

          {/* Subtitle */}
          <motion.h5
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="dateinfo1 mb-4"
          >
            {selectedDay === "day1" ? "កម្មវិធីពេលរសៀល" : "កម្មវិធីពេលព្រឹក"}
          </motion.h5>
        </motion.div>

        {/* Timeline Details */}
        <AnimatePresence mode="wait">
          {currentTimeline.map((item: any, i: any) => (
            <motion.div
              key={item.time}
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <h4 className="eventDetailTime">{item.time}</h4>
              <p className="eventDetail mt-3">{item.detail}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Evening Event only for Day 2 */}
        {selectedDay === "day2" && (
          <motion.div
            key="evening-event"
            variants={scrollFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h5 className="dateinfo1 ">កម្មវិធីពេលល្ងាច </h5>
            <h4 className="eventDetailTime">៥ ៖ ០០ ល្ងាច</h4>
            <p className="eventDetail ">
              {coupleData.content_agenda.restaurant_location.name}
            </p>
          </motion.div>
        )}

        {/* Map Button */}
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="bt"
        >
          <a
            className="calendar-button  mb-5"
            href={coupleData.content_agenda.restaurant_location.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            បើកផែនទី 🗺
          </a>
        </motion.div>
        <ImageSection imageList={photoBoothUrls} videoId={"Mn_qLC7_ueA"} />
        <motion.div
          variants={scrollFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="bt"
        >
          <div className=" p-6 pb-40">
            <GoldThankyouContent data={coupleData?.content_thnakyou} />
          </div>
        </motion.div>
        {/* <Photo photolist={photolist?.photolist} /> */}
        {/*<Wish/>
        <Logo />
        <LeafFall /> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumContent;
