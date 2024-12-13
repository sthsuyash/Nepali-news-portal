import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex"
    >
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4 space-y-4">
          <Link to="/dashboard" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-200">
            प्रोफाइल जानकारी
          </Link>
          <Link to="/dashboard/edit" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-200">
            विवरण सम्पादन गर्नुहोस्
          </Link>
          <Link to="/dashboard/change-password" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-200">
            पासवर्ड परिवर्तन गर्नुहोस्
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
