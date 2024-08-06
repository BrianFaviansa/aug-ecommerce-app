import React from "react";
import axios from "axios";

try {
  const response = await axios.get("/api/v1/products");
  console.log(response.data);
} catch (error) {
  console.log(error);
}

const HomeView = () => {
  return <div>HomeView</div>;
};

export default HomeView;
