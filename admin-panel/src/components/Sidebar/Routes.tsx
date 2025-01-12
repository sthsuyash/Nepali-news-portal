import { Paperclip, Users, Home, LogOut, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook

const Routes = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="space-y-1 ">
      <Route
        Icon={Home}
        selected={location.pathname === "/"} // Check if the current path is '/'
        title="Dashboard"
        to="/"
      />
      <Route
        Icon={Users}
        selected={location.pathname === "/users"} // Check if the current path is '/users'
        title="Users"
        to="/users"
      />
       <Route
        Icon={List}
        selected={location.pathname === "/categories"} 
        title="Categories"
        to="/categories"
      />
      <Route
        Icon={Paperclip}
        selected={location.pathname === "/posts"} // Check if the current path is '/posts'
        title="Posts"
        to="/posts"
      />
     
      <Route
        Icon={LogOut}
        selected={location.pathname === "/logout"}
        title="Logout"
        to="/logout"
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  to,
}: {
  selected: boolean;
  Icon: any;
  title: string;
  to: string; // Route path to navigate to
}) => {
  return (
    <Link to={to} className="w-full">
      <button
        className={`flex items-center justify-start gap-3 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
          }`}
      >
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};

export default Routes;
