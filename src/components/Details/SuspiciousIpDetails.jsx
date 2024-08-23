import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function SuspiciousIpDetails() {
  const { id } = useParams();
  const { fetchOneSuspiciousIp, oneSuspiciousIp } = useContext(Context);
  const handleGetSuspiciousIp = async () => {
    await fetchOneSuspiciousIp(id);
  };

  console.log(oneSuspiciousIp, "oneSuspiciousIp");

  useEffect(() => {
    handleGetSuspiciousIp();
  }, [id]);
  return <div>SuspiciousIpDetails</div>;
}
