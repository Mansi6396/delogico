import { Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const [data, setData] = useState("");
  const id = useParams();
  console.log("id", id.id);
//   API call
  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id.id}`)
      .then((res) => setData(res.data.data));
  }, []);
  return (
    <>
      <h1>Profile</h1>

      <>

        <div style={{ padding: "2% 0% 0% 5% " }}>
            {/* Details data */}
          <h1 style={{ textAlign: "center" }}>Id:{data.id}</h1>
          <h5 style={{ textAlign: "center" }}>FirstName :{data.first_name}</h5>
          <h5 style={{ textAlign: "center" }}>LastName :{data.last_name}</h5>
          <img style={{ textAlign: "center" }} src={data.avatar} />
        </div>
      </>
    </>
  );
}
