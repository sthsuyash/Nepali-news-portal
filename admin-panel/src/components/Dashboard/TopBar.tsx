import { useAuthStore } from "@/store/authStore";
import { Calendar } from "../ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar1Icon } from "lucide-react";
import useDate from "@/hooks/useDates";

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  if (currentHour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const TopBar = () => {
  const { user } = useAuthStore();
  const { currentDateNonFormatted, currentDate, nepaliDate } = useDate();

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-lg font-semibold block">🚀 {getGreeting()}, {user.name}!</span>
          <span className="text-sm text-stone-500 block">
            {nepaliDate}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
              <Calendar1Icon />
              <span>{currentDate}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Calendar
              mode="single"
              selected={currentDateNonFormatted}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
