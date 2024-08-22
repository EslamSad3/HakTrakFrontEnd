import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function AptFeedDetails() {
  const { id } = useParams();
  const { fetchOneAptFeed, oneAptFeed } = useContext(Context);
  const handleGetOneAtpFeed = async () => {
    await fetchOneAptFeed(id);
  };

  console.log(oneAptFeed, "oneAptFeed");

  useEffect(() => {
    handleGetOneAtpFeed();
  }, [id]);
  return <div>AptFeedDetails</div>;
}
