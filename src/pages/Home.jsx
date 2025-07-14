import { Box } from "@mui/material";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const createUser = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/tony",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }
  };

  useEffect(() => {
    const getContactList = async () => {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/contact/agendas/tony/contacts"
        );
        if (response.status === 404) {
          await createUser();
          return getContactList();
        }
        const data = await response.json();
        if (data.contacts?.length) {
          dispatch({
            type: "set_contact",
            payload: data.contacts,
          });
        }
      } catch (error) {
        return console.error(error);
      }
    };

    getContactList();
  }, []);

  return (
    <div className="text-center mt-5">
      <Box></Box>
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
    </div>
  );
};
