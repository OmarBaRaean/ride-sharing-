export default function LabeledQ({
  label,
  palcehold,
  margint = "mt-10",
  autoCompleteOption = "username",
  setterFunction,
}: {
  label: string;
  palcehold: string;
  autoCompleteOption?: string;
  margint?: string;
  setterFunction: (x: string) => void;
}) {
  return (
    <div className={`${margint} flex gap-x-6 gap-y-8 sm:grid-cols-6`}>
      <div className="sm:col-span-4">
        <label
          htmlFor="username"
          className="block text-sm font-bold leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <div className="flex  shadow-sm ring-1 rounded-40 ring-inset focus:outline-none ring-myco1 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-300 ">
            <input
              type="text"
              name="username"
              id="username"
              autoComplete={autoCompleteOption}
              onChange={(e) => {
                setterFunction(e.target.value);
              }}
              className="block flex-1 border-0 bg-transparent p-1.5 pl-3 rounded-40 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400   w-315 h-14 "
              placeholder={palcehold}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
