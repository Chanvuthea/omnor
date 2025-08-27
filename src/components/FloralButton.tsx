interface FloralButtonProps {
  btnBackground: string;
}

export default function FloralButton({ btnBackground }: FloralButtonProps) {
  return (
    <div className="flex justify-center relative mt-7 w-full">
      <button
        className="relative w-1/2 max-w-md !bg-transparent !border-none !cursor-pointer p-0
             transition-all duration-100 ease-in-out
             hover:opacity-90 active:opacity-80 active:scale-95 "
        onClick={() =>
          document
            .querySelectorAll(".section")[1]
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        <img
          src={btnBackground}
          alt={"btnFloralBackround"}
          className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center pb-2">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center"
            style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)" }}
          >
            បើកធៀប
          </p>
        </div>
      </button>
    </div>
  );
}
