import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function VulnerabilitiesIntelligencesDetails() {
  const { id } = useParams();
  const {
    fetchOneVulnerabilitiesIntelligence,
    oneVulnerabilitiesIntelligence,
  } = useContext(Context);
  const handleGetThreatIntelligenceFeed = async () => {
    await fetchOneVulnerabilitiesIntelligence(id);
  };

  console.log(oneVulnerabilitiesIntelligence, "oneVulnerabilitiesIntelligence");

  useEffect(() => {
    handleGetThreatIntelligenceFeed();
  }, [id]);
  return <div>VulnerabilitiesIntelligencesDetails</div>;
}
