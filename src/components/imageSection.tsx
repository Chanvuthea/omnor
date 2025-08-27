import SlideshowDemo from "./imageSlideShow";
import MasonryTwoColumnDemo from "./mansonryGrid";
import YouTubePlayer from "./YouTubePlayer";
interface imageData {
  id: number;
  image: string;
}
interface ImageSectionProps {
  imageList: imageData[];
  videoId: string;
}

export default function ImageSection({
  imageList,
  videoId,
}: ImageSectionProps) {
  return (
    <div className="w-full pt-6 pb-50">
      <SlideshowDemo photoBoothUrls={imageList} />
      <div className="p-6 justify-center items-center flex">
        <MasonryTwoColumnDemo photoBoothUrls={imageList} />
      </div>
      <div className="justify-center items-center flex">
        <YouTubePlayer videoId={videoId} />
      </div>
    </div>
  );
}
