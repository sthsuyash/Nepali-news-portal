import Account from "@/components/Sidebar/Account";
import Routes from "@/components/Sidebar/Routes";

export const Sidebar = () => {
  return (
    <div className="sticky top-0">
      <Account />
      <Routes />
    </div>
  );
};
