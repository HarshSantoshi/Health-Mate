import React from "react";
import Cards from "../Cards/Cards.js";
import Table from "../Table/Table.js";
import "./Dash.css";

function Dash() {
  return (
    <div className="Dash">
      <h1 style={{ textAlign: "left" }}>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  )
}

export default Dash
