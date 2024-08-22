import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function EdrXdrDetails() {
  const { id } = useParams();
  const { fetchOneEdrXdr, oneEdrXDR } = useContext(Context);

  const handleGetoneEdrXDR = async () => {
    await fetchOneEdrXdr(id);
  };

  console.log(oneEdrXDR, "oneEdrXDR");

  useEffect(() => {
    handleGetoneEdrXDR();
  }, [id]);
  return <div>EdrXdrDetails</div>;
}
