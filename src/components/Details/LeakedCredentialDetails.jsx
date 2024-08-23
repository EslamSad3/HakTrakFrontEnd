import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function LeakedCredentialDetails() {
  const { id } = useParams();
  const { fetchOneLeakedCredentials, oneLeakedCredential } =
    useContext(Context);
  const handleGetLeakedCredential = async () => {
    await fetchOneLeakedCredentials(id);
  };

  console.log(oneLeakedCredential, "oneLeakedCredential");

  useEffect(() => {
    handleGetLeakedCredential();
  }, [id]);
  return <div>LeakedCredentialDetails</div>;
}
