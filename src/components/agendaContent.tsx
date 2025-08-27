import fongLogo from "../assets/fong-logo.png";

interface AgendaItem {
  time: string;
  detail: string;
}
interface AgendaContentProps {
  agendaList: AgendaItem[];
  date: string;
  khmer_date: string;
  location: string;
}

export default function AgendaContent({
  agendaList,
  date,
  khmer_date,
  location,
}: AgendaContentProps) {
  const textShadowStyle = {
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
  };

  return (
    <div
      className="m-6 w-full flex justify-center md:pt-20 md:pb-[20%] "
      style={textShadowStyle}
    >
      <div className="p-6 pt-0 py-14 border border-amber-100 bg-black/30 w-full md:w-1/2">
        <div className="flex justify-center items-center">
          <img
            src={fongLogo}
            width={120}
            height={120}
            alt="Floating logo"
            className="max-w-full h-auto"
          />
        </div>
        <div>
          <p className="text-center pb-6">
            {date}
            <br />
            {khmer_date}
          </p>

          {agendaList.map((data, index) => (
            <div className="flex  " key={index}>
              <p className="w-full text-center">{data.time}:</p>
              <p className="w-full ">{data.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-bold pt-6 text-base">{location}</p>
      </div>
    </div>
  );
}
