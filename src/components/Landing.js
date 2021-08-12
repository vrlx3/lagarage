import React from "react";

import { Body1, Body2, Body3 } from "./Body";
import { BookService } from "./BookService";

function Landing(props) {
  const { user, history } = props;
  return (
    <div id="main1">
      <BookService user={user} history={history} />
      <Body1 />
      <Body2 />
      <Body3 />
    </div>
  );
}

export default Landing;
