import React, { useState, useEffect } from "react";
import { handleAdd } from "../utils";

//if the user is logged in function extracts all vehicles to which they are listed as owners

export function CheckStatus(props) {
  const { user, setUser } = props;
  const [addVehicle, setAddVehicle] = useState("");
  return (
    <div id="checkStatus">
      <h3>Status</h3>
      <h5>Add a vehicle</h5>
      <input
        type="text"
        value={addVehicle}
        onChange={(e) => setAddVehicle(e.target.value)}
      ></input>
      <button onClick={(event) => handleAdd(addVehicle)}>Add</button>
    </div>
  );
}
