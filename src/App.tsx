import { useQuery } from "@tanstack/react-query";

type Holiday = {
  name: string;
  dateString: string;
  date: string;
};

type IsHoliday = {
  isHoliday: boolean;
  date: string;
};

function formatDate(dateIsoString: string) {
  return new Date(dateIsoString).toLocaleDateString();
}

function App() {
  const { data: holidaysData, isLoading: holidaysLoading } = useQuery({
    queryKey: ["holiday"],
    queryFn: () =>
      fetch("https://holiday-api.cristianbgp.com/holidays").then(
        (res) => res.json() as Promise<Holiday[]>
      ),
  });

  const { data: isHolidayData, isLoading: isHolidayLoading } = useQuery({
    queryKey: ["is-holiday"],
    queryFn: () =>
      fetch("https://holiday-api.cristianbgp.com/is-it-holiday").then(
        (res) => res.json() as Promise<IsHoliday>
      ),
  });

  return (
    <div className="h-screen flex-col w-full bg-gray-200 gap-10 flex items-center justify-center">
      {isHolidayLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold">Is it 🇵🇪 holiday?</h1>
          <p className="font-bold text-2xl">
            {isHolidayData?.isHoliday ? "Yes ✅" : "No ❌"}
          </p>
        </div>
      )}
      {holidaysLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-2 bg-gray-400 p-4 rounded-2xl">
          <p className="font-bold text-2xl">Next holidays</p>
          <div className="flex flex-col gap-2">
            {holidaysData?.map((holiday) => (
              <p key={holiday.date} className=" text-xl">
                <span className="font-bold">{formatDate(holiday.date)}</span>{" "}
                {holiday.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
