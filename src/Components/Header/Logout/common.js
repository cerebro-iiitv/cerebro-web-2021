import axios from "axios";
import Cookies from "js-cookie";

export const handleModal = () => {
  const modal = document?.getElementById("modal");
  const backdrop = document?.getElementById("backdrop");

  modal.classList.toggle("modal_visible");
  backdrop.classList.toggle("modal_visible");
};

export const handleLogout = async () => {
  const res = await axios(
    "https://cerebro.pythonanywhere.com/account/logout/",
    {
      headers: {
        Authorization: `token ${
          JSON.parse(localStorage.getItem("user")).access_token
        }`,
      },
    }
  );
  if (res.status === 200) {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    window.location = "/";
  }
};
