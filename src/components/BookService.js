import React, { useState, useEffect } from "react";

export function BookService(props) {
  const { user, history } = props;

  function checkStatusOnClick(event) {
    event.preventDefault();
    if (user.id) {
      console.log("status checking");
    } else {
      props.history.push("/login");
    }
  }

  return (
    <div id="bookService">
      <div onClick={checkStatusOnClick}>Check Status</div>
      <div>Book Service Visit</div>
      <div>Request PickUp</div>
    </div>
  );
}
