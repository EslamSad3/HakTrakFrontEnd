import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function PortalsDetails() {
  const { id } = useParams();
  const { fetchOnePortal, onePortal } = useContext(Context);
  const handleGetPortal = async () => {
    await fetchOnePortal(id);
  };

  console.log(onePortal, "onePortal");

  useEffect(() => {
    handleGetPortal();
  }, [id]);
  return <div>PortalsDetails</div>;
}
