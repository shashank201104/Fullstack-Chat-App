import { useContext } from "react";
import { Users } from "lucide-react";
import ThemeContext from "../../Context/ThemeContext";
const SidebarSkel = () => {
  const skeletonContacts = Array(8).fill(null);
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <aside className={`h-full w-1/6 md:w-1/5 flex flex-col ${theme === "light" ? "bg-[#4131477d] " : "bg-[#0b010ea8] "} rounded pt-2 transition-all duration-200 `}>
      {/* Header */}
      <div className="w-full p-2 sm:p-5">
        <div className="flex items-center justify-center md:justify-normal gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden md:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-scroll scrollbar w-full py-3 text-white">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full py-3 flex items-center gap-3">
            {/* Avatar Skeleton */}
            <div className="relative mx-auto lg:mx-0 overflow-clip">
              <div
                className={`${
                  theme === "light" ? "bg-gray-300" : "bg-gray-700"
                } animate-pulse rounded-full min-w-10 h-10`}
                aria-hidden="true"
              />
            </div>

            {/* User Info Skeleton - only visible on larger screens */}
            <div className="hidden lg:flex-1 lg:block text-left min-w-0">
              <div
                className={`${
                  theme === "light" ? "bg-gray-300" : "bg-gray-700"
                } animate-pulse h-4 w-32 mb-2 rounded-md`}
                aria-hidden="true"
              />
              <div
                className={`${
                  theme === "light" ? "bg-gray-300" : "bg-gray-700"
                } animate-pulse h-3 w-16 rounded-md`}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkel;
