import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";

export default function DarkWebMentionsDetails() {
  const { id } = useParams();
  const { fetchOneDarkWebMention, oneDarkWebMention } = useContext(Context);
  const handleGetOneDarkWebMention = async () => {
    await fetchOneDarkWebMention(id);
  };

  console.log(oneDarkWebMention, "oneDarkWebMention");

  useEffect(() => {
    handleGetOneDarkWebMention();
  }, [id]);
  return <div>DarkWebMentionsDetails</div>;
}
