import { useContext } from "react";
import ThemeContext from "../../Context/ThemeContext";
const MessageSkeleton = () => {
  const skeletonMessages = Array(4).fill(null);
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className="flex-1  p-4 space-y-4 scrollbar overflow-y-auto">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className="flex items-start gap-2">
            {/* Avatar Skeleton (Only on left side) */}
            {idx % 2 === 0 && (
              <div
                className={`size-10 rounded-full ${
                  theme === "light" ? "bg-gray-300" : "bg-gray-700"
                } animate-pulse`}
              />
            )}

            <div>
              {/* Username Skeleton */}
              <div
                className={`${
                  theme === "light" ? "bg-[gray]" : "bg-gray-700"
                } animate-pulse h-4 w-16 rounded-md mb-1`}
                aria-hidden="true"
              />
              {/* Message Bubble Skeleton */}
              <div
                className={`${
                  theme === "light" ? "bg-[gray]" : "bg-gray-700"
                } animate-pulse h-16 w-[200px] rounded-lg`}
                aria-hidden="true"
              />
            </div>

            {/* Avatar Skeleton (Only on right side) */}
            {idx % 2 !== 0 && (
              <div
                className={`size-10 rounded-full ${
                  theme === "light" ? "bg-gray-300" : "bg-gray-700"
                } animate-pulse`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
