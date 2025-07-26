import React,{useState} from "react";
import { useLocation } from "react-router-dom";

// import { DocumentProvider } from "./context/DocumentContext";
import { StateProvider } from "./context/StateContext";

import Sidebar from "./components/sidebar";
import MainContainer from "./components/MainContainer";
import RightContainer from "./components/RightContainer";
// import './index.css';





function App() {
  const location = useLocation();
  const data = location.state;
  console.log("data",data);
    const [selecteddocument, setselecteddocument] = useState(null);
  
  return (
    <StateProvider>
      <div className="app-container">
        <Sidebar data={data} />
        <MainContainer/>
        <RightContainer/>
      </div>
    </StateProvider>

  );
}

export default App;
