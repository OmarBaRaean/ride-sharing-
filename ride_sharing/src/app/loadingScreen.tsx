export default function LoadingScreen({ hideLoadingDes = true }) {
  return (
    <div
      className={`${
        hideLoadingDes && "hidden"
      } fixed bg-gray-300 bg-opacity-50 flex justify-center items-center z-[1000] backdrop-blur-sm top-0 left-0  h-full w-full`}
    >
      <div className="size-16 border-4 border-myco3 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
