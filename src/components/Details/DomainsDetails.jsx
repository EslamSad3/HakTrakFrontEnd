import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function DomainsDetails() {
  const { id } = useParams();
  const { fetchOneDomain, oneDomain } = useContext(Context);

  const handleGetOneDomain = async () => {
    await fetchOneDomain(id);
  };

  console.log(oneDomain, "oneDomain");

  useEffect(() => {
    handleGetOneDomain();
  }, [id]);
  return <div>DomainsDetails</div>;
}
