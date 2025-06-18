import { useQuery } from "@tanstack/react-query";
import Spinner from "./components/Spinner";
import { Skeleton } from "./components/ui/skeleton";

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
    <div className="min-h-svh p-10 flex-col w-full flex items-center justify-center">
      <div className="flex flex-col shrink-0 grow-0 flex-[2] justify-center items-center gap-2 w-full p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold">Is it 🇵🇪 holiday?</h1>
          {isHolidayLoading ? (
            <Spinner />
          ) : (
            <p className="font-bold text-2xl">
              {isHolidayData?.isHoliday ? "Yes ✅" : "No ❌"}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center gap-2 w-full p-4">
        {holidaysLoading ? (
          <Skeleton className="w-[400px] h-[400px]" />
        ) : (
          <div className="flex flex-col gap-2 p-4 rounded-2xl">
            <p className="font-bold text-2xl">Next holidays</p>
            <div className="flex flex-col gap-2">
              {holidaysData?.map((holiday) => (
                <div
                  key={holiday.date}
                  className="flex items-center gap-4"
                >
                  <p className="font-bold min-w-[100px]">{formatDate(holiday.date)}</p>
                  <p className="text-xl">{holiday.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
