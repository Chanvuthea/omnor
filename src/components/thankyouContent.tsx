interface ThankyouContentType {
  thankyou: string;
  wish: string;
  speech: string;
  last_speech: string;
}
interface dataProps {
  data: ThankyouContentType;
}
export default function ThankyouContent({ data }: dataProps) {
  const textShadowStyle = {
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
  };
  return (
    <div
      className="m-6 w-full flex justify-center md:pt-20"
      style={textShadowStyle}
    >
      <div className="p-6 py-14 border border-amber-100 bg-black/30 w-full md:w-1/2">
        <p className=" text-center text-2xl font-bold">សេចក្តីថ្លែងអំណរគុណ</p>
        <p className=" text-center pt-6">{data.thankyou}</p>
        <p className=" text-center pt-4">{data.wish}</p>
        <p className=" text-center text-2xl font-bold pt-6">
          សេចក្តីសូមអភ័យទោស
        </p>
        <p className=" text-center pt-6">{data.speech}</p>
        <p className=" text-center pt-4">{data.last_speech}</p>
      </div>
    </div>
  );
}
