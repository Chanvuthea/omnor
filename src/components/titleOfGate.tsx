import { useSpringValue, animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import FloralButton from "./FloralButton";
interface TitleOfGateProps {
  groomName: string;
  brideName: string;
  btnBackground: string;
  fongLogo: string;
  date: string;
}
export default function TitleOfGate({
  groomName,
  brideName,
  btnBackground,
  fongLogo,
  date,
}: TitleOfGateProps) {
  const opacity = useSpringValue(0, {
    config: {
      mass: 2,
      friction: 100,
      tension: 100,
    },
  });

  const floatingAnimation = useSpring({
    from: { y: 0 },
    to: { y: -10 },
    config: { duration: 2000 },
    loop: { reverse: true },
  });

  useEffect(() => {
    opacity.start(1);
  }, []);

  return (
    <animated.div style={{ opacity }}>
      <div
        className="text-4xl pt-20"
        style={{ fontFamily: "'Moulpali', 'Arial', sans-serif" }}
      >
        <animated.div style={floatingAnimation}>
          <div className="flex flex-col justify-center items-center">
            <p
              className="text-2xl font-bold"
              style={{
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
              }}
            >
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </p>

            <img
              src={fongLogo}
              width={200}
              height={200}
              alt="Floating logo"
              className="max-w-full h-auto"
            />
            <div className="flex justify-between w-full max-w-xs mt-4">
              <p
                className="text-lg font-bold"
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)" }}
              >
                {groomName}
              </p>
              <p
                className="text-lg font-bold -mt-4"
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)" }}
              >
                ជាគូ
              </p>
              <p
                className="text-lg font-bold"
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)" }}
              >
                {brideName}
              </p>
            </div>
          </div>
        </animated.div>

        <FloralButton btnBackground={btnBackground} />
        <p className="text-center text-xl">{date}</p>
      </div>
    </animated.div>
  );
}
