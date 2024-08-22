import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function IocDetails() {
  const { id } = useParams();
  const { fetchOneIoc, oneIoc } = useContext(Context);

  const handleGetoneIoc = async () => {
    await fetchOneIoc(id);
  };

  console.log(oneIoc, "oneIoc");

  useEffect(() => {
    handleGetoneIoc();
  }, [id]);
  return <div>IocDetails</div>;
}
