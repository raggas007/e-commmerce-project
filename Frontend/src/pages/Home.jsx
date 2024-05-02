import { Button, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SellerProductList from "./SellerProductList";

const Home = () => {
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();
  if (userRole === "buyer") {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Hero Banner */}
        <section style={{ textAlign: "center", padding: "50px 0" }}>
          <h1 style={{ fontSize: "50px", marginBottom: "30px" }}>
            Welcome to our Parajuli Shopping
          </h1>
          <p style={{ fontSize: "40px", color: "#666", marginBottom: "30px" }}>
            <i>
              Shop your desire item with 5% discounted price in each shopping.
            </i>
          </p>

          <Button
            variant="contained"
            color="secondary"
            sx={{ height: "100px", width: "300px" }}
            onClick={() => {
              navigate("/product");
            }}
          >
            <Typography variant="h4" color="green">
              Shop Now
            </Typography>
          </Button>
        </section>
      </div>
    );
  } else {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Hero Banner */}
        <section style={{ textAlign: "center", padding: "50px 0" }}>
          <h1 style={{ fontSize: "50px", marginBottom: "30px" }}>
            Welcome to our Parajuli Shopping
          </h1>
          <p style={{ fontSize: "40px", color: "#666", marginBottom: "30px" }}>
            <b>You are here and You have chance to sell your products.</b>
          </p>

          <Button
            variant="contained"
            color="secondary"
            sx={{ height: "100px", width: "500px" }}
            onClick={() => {
              navigate("/product/add");
            }}
          >
            <Typography variant="h4" color="Yellow">
              Add New Product
            </Typography>
          </Button>
        </section>

        {/* Featured Products Section */}
        <section style={{ textAlign: "center", padding: "50px 0" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
            Featured Products
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <Link
              to="/product"
              style={{
                marginTop: "3rem",
                textAlign: "center",
                display: "block",
              }}
            >
              <Typography
                variant="h6"
                color="secondary"
                sx={{ marginTop: "-3rem" }}
              >
                Your added product list. Go there
              </Typography>
            </Link>
          </div>
          <a
            href="#"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "16px",
              color: "#333",
              textDecoration: "none",
              marginTop: "20px",
            }}
          ></a>
        </section>
      </div>
    );
  }
};

export default Home;
