import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function IPsDetails() {
  const { id } = useParams();
  const { fetchOneIp, oneIp } = useContext(Context);
  const handleGetOneIp = async () => {
    await fetchOneIp(id);
  };

  console.log(oneIp, "oneIp");

  useEffect(() => {
    handleGetOneIp();
  }, [id]);
  return <div>IPsDetails</div>;
}
