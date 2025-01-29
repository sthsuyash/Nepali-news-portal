import {
  Paperclip,
  Users,
  Home,
  LogOut,
  List,
  CirclePlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Routes = () => {
  const location = useLocation();

  return (
    <div className="space-y-1">
      <Route
        Icon={Home}
        selected={location.pathname === "/"}
        title="Dashboard"
        to="/"
      />
      <Route
        Icon={Users}
        selected={location.pathname.startsWith("/users")}
        title="Users"
        to="/users"
        children={[
          { title: "List Users", to: "/users" },
        ]}
      />
      <Route
        Icon={List}
        selected={location.pathname.startsWith("/categories")}
        title="Categories"
        to="/categories"
        children={[
          { title: "List Categories", to: "/categories" },
        ]}
      />
      <Route
        Icon={Paperclip}
        selected={location.pathname.startsWith("/posts")}
        title="Posts"
        to="/posts"
        children={[
          { title: "List Posts", to: "/posts" },
          { title: "Create Post", to: "/posts/add" },
        ]}
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
  children,
  isLogout = false,
}: {
  selected: boolean;
  Icon: any;
  title: string;
  to: string;
  children?: { title: string; to: string }[];
  isLogout?: boolean;
}) => {
  const location = useLocation();
  const [isSidebarSubmenuOpen, setIsSidebarSubmenuOpen] = useState(
    children?.some((child) => location.pathname === child.to) || false
  );

  useEffect(() => {
    if (children) {
      setIsSidebarSubmenuOpen(children.some((child) => location.pathname === child.to));
    }
  }, [location.pathname, children]);

  return (
    <div>
      <Link to={to} className="w-full">
        <button
          className={`z-50 flex items-center justify-between w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] duration-200 ${selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
            }`}
          onClick={(e) => {
            if (children) {
              e.preventDefault();
              setIsSidebarSubmenuOpen(!isSidebarSubmenuOpen);
            }
          }}
        >
          <div className="flex items-center gap-3">
            <Icon className={selected ? "text-primary" : ""} />
            <span>{title}</span>
          </div>
          {children && (
            <span>
              {isSidebarSubmenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          )}
        </button>
      </Link>

      {isSidebarSubmenuOpen && children && (
        <div className="pl-6 space-y-1 mt-1">
          {children.map((child) => (
            <Link to={child.to} key={child.to}>
              <button
                className={`flex items-center justify-start gap-3 w-full rounded px-2 py-1.5 text-sm transition-colors ${location.pathname === child.to
                  ? "bg-primary/50 text-gray-800"
                  : "hover:bg-stone-200 text-stone-500"
                  }`}
              >
                <CirclePlus size={16} />
                <span>{child.title}</span>
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Routes;
