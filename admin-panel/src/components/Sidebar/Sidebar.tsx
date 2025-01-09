import Account from "@/components/Sidebar/Account";
import { Search } from "./Search";
import Routes from "@/components/Sidebar/Routes";

export const Sidebar = () => {
  return (
      <div className="sticky top-0">
        <Account />
        <Search />
        <Routes />
    </div>
  );
};
