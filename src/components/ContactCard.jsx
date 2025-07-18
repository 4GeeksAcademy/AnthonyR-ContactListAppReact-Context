import {
  Box,
  Card,
  Avatar,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { EditContactModal } from "./EditContactModal.jsx";

export const ContactCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name = "") {
    const nameParts = name.trim().split(" ");

    let initials = "";

    if (nameParts.length === 1) {
      initials = nameParts[0][0];
    } else if (nameParts.length >= 2) {
      initials = `${nameParts[0][0]}${nameParts[1][0]}`;
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 100,
        height: 100,
        fontSize: "2.5rem",
      },
      children: initials.toUpperCase(),
    };
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Card
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar {...stringAvatar(props.name || "Unnamed Contact")} />
          </Box>
        </CardContent>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", flexGrow: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ margin: 0 }}
            >
              {props.name}
            </Typography>
            <Box>
              <ButtonGroup
                variant="contained"
                aria-label="Loading button group"
              >
                <Button>
                  <EditIcon
                    onClick={() => {
                      handleOpenModal();
                    }}
                  />
                </Button>
                <Button onClick={props.onClickDelete}>
                  <DeleteIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <LocationOnIcon /> {props.address}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <PhoneIcon /> {props.phone}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <EmailIcon /> {props.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <EditContactModal open={isModalOpen} onClose={handleCloseModal} contact={props.contact}/>
    </Box>
  );
};
