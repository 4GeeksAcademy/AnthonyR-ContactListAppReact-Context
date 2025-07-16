import { Link } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { NewContactModal } from "../components/NewContactModal";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Button
            variant="contained"
            onClick={() => {
              handleOpenModal();
            }}
          >
            Add new contact
          </Button>
        </div>
      </div>
      <NewContactModal open={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};
