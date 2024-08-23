import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function ThreatIntelligenceFeedDetails() {
  const { id } = useParams();
  const { fetchOnethreatintelligenceFeed, oneThreatIntelligenceFeed } =
    useContext(Context);
  const handleGetThreatIntelligenceFeed = async () => {
    await fetchOnethreatintelligenceFeed(id);
  };

  console.log(oneThreatIntelligenceFeed, "oneThreatIntelligenceFeed");

  useEffect(() => {
    handleGetThreatIntelligenceFeed();
  }, [id]);
  return <div>ThreatIntelligenceFeedDetails</div>;
}
