import React, {useState,useContext,useEffect} from "react";
import { StateContext } from "../context/StateContext";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");


const RightContainer = () => {
  const [linkedocument,setlinkedocument] = useState([]);
  const [changesocket,setchangesocket] = useState(false);
      const { user } = useContext(StateContext);
  
  const [status,setstatus] = useState("This is status bar");

  const handlegetpermission = (e)=>{
    const data = JSON.parse(e.target.dataset.document)
    console.log("tergetdata",data);
    
    
    socket.emit("get-permission",data);
    
    
  }
  // console.log("user is ",user);

  useEffect(()=>{

    socket.on("send-permission-request",(data)=>{
      console.log("emiting works")
      console.log(data.userid ," ",user._id)
      if(data.userid === user._id)
      {
        console.log("message arived");
      }
  
    })
  },[])

  
  
  




 const getusersdocument = async ()=>{
  const link = document.getElementById("link-input-field").value;
  console.log("link is ",link);


  try {
    console.log("usersdocument taking running")
    const response = await fetch("http://localhost:5000/getusersdocument", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({link}), 
    });
console.log("point 1");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setstatus(result.message);
    document.getElementById("link-input-field").value="";
    setlinkedocument((prevDocuments) => [result.data, ...prevDocuments]);    
    // console.log("Document created:", data);
 
  } catch (error) {
    console.error("Error creating document:", error.message);
  }
};

  return (
    <div className="right-container">
      {/* Status Bar */}
      <div className="status-bar">
        <p>{status}</p>
      </div>

      {/* Top Fields */}
      <div className="top-fields">
        <input id="link-input-field" type="text" placeholder="Enter the link" />
        <button
          onClick={(e) => {
            e.preventDefault();
            getusersdocument();
          }}
        >
          Find
        </button>
      </div>

      {/* Linked Documents */}
      <div className="linked-document-list-box">
        {linkedocument.map((data, index) => (
          <div key={index}  className="real-time-box">
            <h4>
              {data.username} <span title="no member now">members</span>
            </h4>
            <p>{data.document.name}</p>
            <div key={data} className="right-bar-button-box">
              <button >Leave</button>
              <button data-document={JSON.stringify(data)} onClick={(e)=>{
               e.preventDefault();
               handlegetpermission(e);
              }} >Take Permission</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightContainer;
