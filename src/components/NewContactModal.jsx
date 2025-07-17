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

export const NewContactModal = ({ open, onClose }) => {
  const { store, dispatch } = useGlobalReducer();
  const initialForm = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const newContactFetch = async (form) => {
    const contactData = {
      name: form.fullname,
      email: form.email,
      phone: form.phone,
      address: form.address,
    };

    for (const key in contactData) {
      if (contactData[key].trim() === "") {
        Swal.fire({
          title: "ERROR!",
          text: "Incomplete data",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }

    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/tony/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Swal.fire({
          title: "Contact saved!",
          text: "Your contact has been saved successfully.",
          icon: "success",
          confirmButtonText: "Great",
        });
        dispatch({
          type: "add_contact",
          payload: data,
        });
        setForm(initialForm);
        onClose();

        return;
      }
    } catch (error) {
      console.error("Network/server error:", error);
      Swal.fire({
        title: "ERROR!",
        text: result.msg || "Server connection failed.",
        icon: "error",
        confirmButtonText: "Ok",
      });
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
          Add a New Contact
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
            onClick={() => newContactFetch(form)}
          >
            Save Contact
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
