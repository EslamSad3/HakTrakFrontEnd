import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function ATODetails() {
  const { id } = useParams();
  const { fetchOneATO, oneATO } = useContext(Context);
  const handleGetOneATO = async () => {
    await fetchOneATO(id);
  };

  console.log(oneATO, "oneATO");

  useEffect(() => {
    handleGetOneATO();
  }, [id]);
  return <div>ATODetails</div>;
}
