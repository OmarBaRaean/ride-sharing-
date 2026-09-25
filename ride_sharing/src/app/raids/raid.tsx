import { faHandshakeSlash, faUsers } from "@fortawesome/free-solid-svg-icons";
import Raidsrcdec from "./raidsrcdec";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Raid } from "./riadsAPI";
import { useRouter } from "next/navigation";

export default function RaidElement({
  compatibility = 1,
  className = "",
  raid,
}: {
  compatibility?: number;
  className?: string;
  raid: Raid;
}) {
  const remainingSeats = raid.passengersNumber - raid.passengersArray.length;
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`raids/${raid.id}`)}
      className={`${className} flex flex-col w-full md:min-w-[380px] md:max-w-[30%] h-80 bg-myco0 bg-opacity-60 items-center rounded-2xl p-2 mb-4`}
    >
      <Raidsrcdec
        src={raid.src}
        des={raid.des}
        color="bg-myco3"
        boxHight="truncate"
      />
      <p className="w-full flex justify-center h-8 font-medium text-2xl">
        {`${raid.dateTime
          .getHours()
          .toString()
          .padStart(2, "0")}:${raid.dateTime
          .getMinutes()
          .toString()
          .padStart(2, "0")} `}
      </p>
      <p className="w-full flex justify-center h-8 font-medium text-2xl">
        {`${raid.dateTime.getDate()}/${
          raid.dateTime.getMonth() + 1
        }/${raid.dateTime.getFullYear()}`}
      </p>
      <div className="flex flex-row h-9 w-full mt-3  justify-around">
        <p className="w-150 h-9 bg-myco10 rounded-md flex items-center justify-around text-2xl font-medium">
          <FontAwesomeIcon className="h-8" icon={faUsers} />
          {remainingSeats}
        </p>
        <p className="w-150 h-9 bg-red-700 rounded-md flex justify-center items-center">
          <FontAwesomeIcon className=" h-8" icon={faHandshakeSlash} />
        </p>
      </div>
    </div>
  );
}
