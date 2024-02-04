import React from "react";
import Cards from "../Cards/Cards.js";
import Table from "../Table/Table.js";
import "./Dash.css";

function Dash() {
  return (
    <div className="Dash">
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
      <Cards />
      <Table />
    </div>
  )
}

export default Dash
