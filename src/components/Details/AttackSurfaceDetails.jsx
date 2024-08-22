import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function AttackSurfaceDetails() {
  const { id } = useParams();
  const { fetchOneAttckSurface, oneAttackSurface } = useContext(Context);
  const handleGetOneAttckSurface = async () => {
    await fetchOneAttckSurface(id);
  };

  console.log(oneAttackSurface, "oneAttackSurface");

  useEffect(() => {
    handleGetOneAttckSurface();
  }, [id]);
  return <div>AttackSurfaceDetails</div>;
}
