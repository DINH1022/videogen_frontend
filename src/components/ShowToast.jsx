import { toast } from "react-toastify";

/**
 * showToast displays a toast notification with a given title and type.
 * Supports "success", "error", and "info" types. Uses react-toastify for UI.
 *
 * @param {string} title - The message to display in the toast
 * @param {string} type - The type of toast ("success", "error", or default/info)
 */
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const showToast = (title, type) => {
  console.log(99);

  // Show toast based on type
  switch (type) {
    case "success":
      toast.success(title, toastConfig);
      break;
    case "error":
      console.log(991);
      toast.error(title, toastConfig);
      break;
    default:
      toast.info(title, toastConfig);
  }
};

export default showToast;
