import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function NdrDetails() {
  const { id } = useParams();
  const { fetchOneNdr, oneNdr } = useContext(Context);
  const handleGetNdr = async () => {
    await fetchOneNdr(id);
  };

  console.log(oneNdr, "oneNdr");

  useEffect(() => {
    handleGetNdr();
  }, [id]);
  return <div>NdrDetails</div>;
}
