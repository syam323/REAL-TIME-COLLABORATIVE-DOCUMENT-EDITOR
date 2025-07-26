import React, { useState,useContext, useEffect, useRef } from "react";
import { StateContext } from "../context/StateContext";
import Document from "./Document"

const DocumentListBox = () => {
    const {documents} = useContext(StateContext);
    console.log("documents",documents);
  

  return (
    <div className="document-list-box">
    {Array.isArray(documents) && documents.map((document, index) => (
      <Document key={index} document={document} />
    ))}
  </div>
  );
};

export default DocumentListBox;
