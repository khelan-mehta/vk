// import React from "react";
// import { IoMdClose } from "react-icons/io";
// import { BiErrorCircle } from "react-icons/bi";

// interface ErrorAlertProps {
//   error: string | Error | null;
//   onClose?: () => void;
//   title?: string;
//   className?: string;
// }

// const ErrorAlert: React.FC<ErrorAlertProps> = ({
//   error,
//   onClose,
//   title = "Error",
//   className = "",
// }) => {
//   if (!error) return null;

//   return (
//     <div
//       role="alert"
//       className={`relative  rounded-lg border border-red p-4 ${className}`}
//     >
//       <div className="flex items-start">
//         <div className="flex-shrink-0">
//           <BiErrorCircle className="text-red-500 h-5 w-5" />
//         </div>

//         <div className="ml-3 w-full">
//           <h3 className="text-red-800 text-sm font-medium">{title}</h3>

//           <div className="text-red-700 mt-2 text-sm">
//             {typeof error === "string"
//               ? error
//               : error?.message || "An unexpected error occurred"}
//           </div>
//         </div>

//         {onClose && (
//           <button
//             onClick={onClose}
//             className="xrounded-md ml-auto flex-shrink-0 p-1.5 text-red hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
//             aria-label="Close error message"
//           >
//             <IoMdClose className="h-5 w-5" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ErrorAlert;

import React from "react";
import { IoMdClose } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { useState, useEffect } from "react";

interface ErrorAlertProps {
  error: string | Error | null;
  onClose?: () => void;
  title?: string;
  className?: string;
  autoHideDuration?: number;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onClose,
  title = "Error",
  className = "",
  autoHideDuration = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);

      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    }
  }, [error, autoHideDuration, onClose]);

  if (!error) return null;

  return (
    <div
      role="alert"
      className={`
        fixed bottom-4 right-4 z-50 max-w-sm
        transform transition-all duration-300 ease-in-out
        ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }
        bg-white rounded-lg border border-red-800 shadow-lg
        ${className}
      `}
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          <BiErrorCircle className="h-5 w-5 text-red-800" />
        </div>

        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>

          <div className="mt-2 text-sm text-red-800">
            {typeof error === "string"
              ? error
              : error?.message || "An unexpected error occurred"}
          </div>
        </div>

        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-auto flex-shrink-0 rounded-md p-1.5 text-red-800 hover:text-red-100
              hover:bg-red-800 focus:outline-none focus:ring-2
              focus:ring-red focus:ring-offset-2"
            aria-label="Close error message"
          >
            <IoMdClose className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
