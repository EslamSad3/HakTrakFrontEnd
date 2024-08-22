import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function BrandReputationDetails() {
  const { id } = useParams();
  const { fetchOneBrandReputation, oneBrandReputation } = useContext(Context);
  const handleGetOneBrandReputation = async () => {
    await fetchOneBrandReputation(id);
  };

  console.log(oneBrandReputation, "oneBrandReputation");

  useEffect(() => {
    handleGetOneBrandReputation();
  }, [id]);
  return <div>BrandReputationDetails</div>;
}
