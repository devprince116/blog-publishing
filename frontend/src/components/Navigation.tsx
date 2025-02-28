"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navigation = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: "white", color: "text.primary" }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Dev<span style={{ color: "#1976d2" }}>Blog</span>
          </Typography>

          <Box>
            {isLoggedIn && (
              <Button
                onClick={() => router.push("/create-blog")}
                color="secondary"
                variant="contained"
                sx={{ mr: 2, borderRadius: 28 }}
              >
                Create Blog
              </Button>
            )}
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/login")}
                  variant="outlined"
                  sx={{ mr: 2, borderRadius: 28 }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/signup")}
                  variant="contained"
                  sx={{ borderRadius: 28 }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
