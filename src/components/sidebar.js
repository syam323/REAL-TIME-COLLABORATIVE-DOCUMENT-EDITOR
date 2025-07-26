import React, { useState,useContext, useEffect, useRef } from "react";
import "../index.css";
import DocumentListBox from "./DocumentListBox";
import { StateContext } from "../context/StateContext";



const Sidebar = ({ data }) => {
  const {documents, setDocuments} = useContext(StateContext);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef(null);
  const { detectchange, setdetectchange} = useContext(StateContext);
  const { content, setcontent} = useContext(StateContext);
  const { selecteddocument, setselecteddocument} = useContext(StateContext);
  const { user, setuser} = useContext(StateContext);


  const createDocument = async (user,documentName) => {
    try {
      console.log("creating running")
      const response = await fetch("http://localhost:5000/createdocument", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({user, name: documentName }), 
      });
  console.log("point 1");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log("Document created:", data);
      setcontent(data.document.content);
      
      setselecteddocument(data.document);
      
      setDocuments((prevDocuments) => [data.document, ...prevDocuments]);
    } catch (error) {
      console.error("Error creating document:", error.message);
    }
  };

  const handleCreateDocument = () => {
    const inputField = inputRef.current;
    if (!isCreating) {
      inputField.focus();
      inputField.placeholder = "Enter document name";
      setIsCreating(true);
    } else {
      const documentName = inputField.value;
      if (documentName.trim() === "") {
        alert("Document name cannot be empty.");
        return;
      }
      console.log("New document name:", documentName);
      createDocument(data,documentName);
  
      inputField.placeholder = "Find document";
      inputField.value = "";
      setIsCreating(false);
    }
  };

  const fetchDocuments = async (user) => {
    try {
      console.log("fetching user", user);
  
      const response = await fetch("http://localhost:5000/documents", {
        method: "POST", // Use POST to send data
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ user }), // Pass the user in the request body
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log("Fetched documents:", data);
  
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    }
  };

  useEffect(() => {
    console.log("Component has mounted!");
    // setuser(data);
    // console.log("user",data);
    fetchDocuments(data);

    return () => {
      console.log("Component will unmount!");
    };
  }, [detectchange]);

  useEffect(() => {
    // console.log("Component has mounted!");
    setuser(data);
    // console.log("user",data);
    // fetchDocuments(data);

    
  }, []);

  return (
    <div className="sidebar">
      <h1 style={{backgroundColor:"black",color:"white",margin:"2px 0px",fontSize:"20px",textAlign:"center"}}>{user.username}</h1>
      <div className="top-box">
        <input
          ref={inputRef}
          className="document-finding-input-field"
          type="text"
          placeholder="Find document"
        />
        <button
          onClick={handleCreateDocument}
          title="Create new document"
          className="document-create-btn"
        >
          {isCreating ? "Create" : "+"}
        </button>
      </div>
      <DocumentListBox />
    </div>
  );
};

export default Sidebar;
