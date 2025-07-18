import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditContactModal = ({ open, onClose, contact }) => {
  const { store, dispatch } = useGlobalReducer();
  const initialForm = {
    fullname: contact.name,
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const editContactFetch = async (form) => {
    const editData = {
      name: form.fullname,
      email: form.email,
      phone: form.phone,
      address: form.address,
    };

    const noChanges = Object.keys(editData).every(
      (key) =>
        String(editData[key]).trim() === String(contact[key] || "").trim()
    );

    if (noChanges) {
      Swal.fire({
        title: "ERROR!",
        text: "You did not edit any fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/tony/contacts/${contact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Contact edited!",
          text: "Your contact has been edited successfully.",
          icon: "success",
          confirmButtonText: "Great",
        });
        dispatch({
          type: "edit_contact",
          payload: data,
        });
        setForm({
          fullname: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
        onClose();

        return;
      }
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: "Server connection failed.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error("Network/server error:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 480,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, width: "fit-content", margin: "auto" }}
        >
          Edit your contact
        </Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            variant="outlined"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => editContactFetch(form)}
          >
            Save Contact
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
