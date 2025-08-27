import fongLogo from "../assets/fong-logo.png";

interface ContentProps {
  list_family_name: {
    groom_father: string;
    groom_mother: string;
    groom: string;
    bride_father: string;
    bride_mother: string;
    bride: string;
  };
  content_invitation: string;
  content_location: string;
}

export default function Content({
  list_family_name,
  content_invitation,
  content_location,
}: ContentProps) {
  const textShadowStyle = {
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
  };
  return (
    <div
      className="m-6 w-full flex justify-center md:pt-20"
      style={textShadowStyle}
    >
      <div className="px-6 py-10 border border-amber-100 bg-black/30 w-full md:w-1/2">
        <div className="flex justify-center items-center">
          <p className="text-2xl font-bold">សិរីសួស្តីអាពាហ៍ពិពាហ៍មង្គល</p>
        </div>
        <div className="flex justify-between pt-6 pb-6 text-base font-bold ">
          <div>
            <p>{`លោក ${list_family_name.groom_father}`}</p>
            <p>{`លោកស្រី ${list_family_name.groom_mother}`}</p>
          </div>
          <div>
            <p>{`លោក ${list_family_name.bride_father}`}</p>
            <p>{`លោកស្រី ${list_family_name.bride_mother}`}</p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full ">
          <p className="text-2xl font-bold">សូមគោរពអញ្ជើញ</p>
        </div>
        <div className="flex w-full pt-2 justify-center">
          <p className="text-base text-center">{content_invitation}</p>
        </div>

        <div className="flex justify-between items-start text-base w-full font-bold">
          <div className="flex-1 flex flex-col justify-start text-center pt-6">
            <p>កូនប្រុសនាម</p>
            <p>{list_family_name.groom}</p>
          </div>
          <div className="flex-1 flex justify-center items-start ">
            <img
              src={fongLogo}
              width={120}
              height={120}
              alt="Floating logo"
              className="max-w-full h-auto"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center pt-6">
            <p>កូនស្រីនាម</p>
            <p>{list_family_name.bride}</p>
          </div>
        </div>
        <div className="flex w-full pt-2 justify-center ">
          <p className="text-base text-center ">{content_location}</p>
        </div>
      </div>
    </div>
  );
}
