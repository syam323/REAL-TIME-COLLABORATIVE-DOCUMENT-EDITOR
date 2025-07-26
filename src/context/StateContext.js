import React, { createContext, useState } from "react";

export const StateContext = createContext();
export const StateProvider = ({ children }) => {
  const [selecteddocument, setselecteddocument] = useState(null);
  const [content, setcontent] = useState("");
  const [detectchange, setdetectchange] = useState(false);
  const [user, setuser] = useState("");
  const [documents, setDocuments]=useState(null);

  return (
    <StateContext.Provider value={{ selecteddocument, setselecteddocument,content,setcontent,detectchange,setdetectchange,user,setuser,documents,setDocuments}}>
      {children}
    </StateContext.Provider>
  );
};
