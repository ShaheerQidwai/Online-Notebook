import React from "react";

const MyAlert = ({ message, type }) => {
  return (
    <div className="alert alert-danger Alertt" role="alert">
      {message}
    </div>
  );
};

export default MyAlert;
