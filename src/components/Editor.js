import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import "../styles/editor.css";

const Editor = () => {
    const { selecteddocument, setselecteddocument } = useContext(StateContext);
    const { content, setcontent } = useContext(StateContext);
    const { detectchange, setdetectchange } = useContext(StateContext);
    const { user } = useContext(StateContext);


    const copylink = ()=>{
      const link = `${selecteddocument._id}/&/${user._id}`;
      console.log("link is",link);
      navigator.clipboard.writeText(link)
    .then(() => {
      console.log("Link copied to clipboard!");
      // alert("Link copied to clipboard!"); // Optional: Notify the user
    })
    .catch((error) => {
      console.error("Failed to copy the link: ", error);
    });

    }

    const savedocument = async (user,document) => {
      try {
        console.log("saving running")
        const response = await fetch("http://localhost:5000/savedocument", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ user,document}), 
        });
    console.log("point 1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        // console.log("Document created:", data);
    
  
        // setDocuments((prevDocuments) => [data.document, ...prevDocuments]);
      } catch (error) {
        console.error("Error creating document:", error.message);
      }
    };

    const handleChange = (e) => {
        const newContent = e.target.value;
        setcontent(newContent);

        // selecteddocument ko update karo
        setselecteddocument(prevDoc => ({
            ...prevDoc,
            content: newContent
        }));
    };

    // ✅ Correct: Console the updated value
    useEffect(() => {
      
      // setdetectchange(!detectchange);
      if(selecteddocument)
        {
          // console.log("Updated content:", content);
          selecteddocument.content=content;
          savedocument(user,selecteddocument);
          setdetectchange(!detectchange);

        }

    }, [content]); // Jab bhi `content` update ho tab console kare

    return (
      <div className="editor-parent">
        <div className="main-nav">
          <h5>{selecteddocument && selecteddocument.name}</h5>
          <ul>
            <button>save</button>
            <button>Download</button>
            <button onClick={(e)=>{
              e.preventDefault();
              copylink()
            }}>copy link</button>
          </ul>
          

        </div>

        <textarea
            className="editor"
            value={content}
            onChange={handleChange}
            placeholder="Start typing your document here..."
            />
      </div>
    );
};

export default Editor;
