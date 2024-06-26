import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";
import CustomAvatar from "./CustomAvatar";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Badge, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import SearchBar from "./SearchBar";

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/home",
  },
  {
    id: 2,
    name: "Product",
    path: "/product",
  },
  {
    id: 3,
    name: "About",
    path: "/about",
  },
];

const Header = (props) => {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const userRole = localStorage.getItem("userRole");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  //get cart item count
  const { isError, error, data } = useQuery({
    queryKey: ["get-cart-item-count"],
    queryFn: async () => {
      return await $axios.get("/cart/item/count");
    },
    enabled: userRole === "buyer",
  });

  const itemCount = data?.data?.itemCount;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PARAJULI SHOPPING
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "purple" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "left",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            {"PARAJULI SHOPPING"}
            <img
              src="/image/shopping-cart.png"
              alt=""
              style={{
                width: "30px",
                height: "30px",
                background: "purple",
              }}
            />
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          {userRole === "buyer" && (
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Badge badgeContent={itemCount} color="primary">
                <ShoppingCartTwoToneIcon color="white" />
              </Badge>
            </IconButton>
          )}
          <CustomAvatar />
          <LogoutConfirmationDialog />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Header;
