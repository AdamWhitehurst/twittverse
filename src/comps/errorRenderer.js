import React from "react";
import { HorizontalGroup, DisplayText } from "./TweetCardParts";

const renderError = error => (
  <HorizontalGroup>
    {/** String literal doesn't work here? */}
    <DisplayText>{"Error " + error}</DisplayText>
  </HorizontalGroup>
);

export default renderError;
