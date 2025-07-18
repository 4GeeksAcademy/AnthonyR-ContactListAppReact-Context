import { Box, Card, Typography } from "@mui/material";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { ContactCard } from "../components/ContactCard.jsx";
import Swal from "sweetalert2";

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

  const handleOnClickDelete = async (contact) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/tony/contacts/${contact.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 404) {
        Swal.fire({
          title: "ERROR!",
          text: "Contact not found",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
      if (response.ok) {
        Swal.fire({
          title: "Contact deleted!",
          text: "Your contact was successfully deleted.",
          icon: "success",
          confirmButtonText: "Great",
        });
        dispatch({
          type: "delete_contact",
          payload: contact,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: "Server connection failed.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return console.error(error);
    }
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Card sx={{ maxWidth: "700px", margin: "auto" }}>
        {!store?.contacts.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">No contacts</Typography>
          </Box>
        )}
        {store?.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            address={contact.address}
            phone={contact.phone}
            email={contact.email}
            onClickDelete={() => handleOnClickDelete(contact)}
            contact={contact}
          />
        ))}
      </Card>
    </Box>
  );
};
