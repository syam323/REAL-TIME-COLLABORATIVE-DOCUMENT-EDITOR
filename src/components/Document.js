import React, { useContext,useEffect ,useState} from "react";
import { StateContext } from "../context/StateContext";
import PopupComponent from "../components/PopupComponent";

// import "../styles/PopupComponent"; // Import the CSS file





  const Document = ({document}) => {
    const { selecteddocument, setselecteddocument } = useContext(StateContext);
    const { content, setcontent } = useContext(StateContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleclick = (document)=>{
    // const id = document._id;
    // const name = document.name;
    // console.log("id is ",id,name);
    setcontent(document.content)
    setselecteddocument(document);
  }
  return (
    <div >
       <li style={{
    background:
      document && selecteddocument && document._id === selecteddocument._id
        ? 'green'
        : '',
  }} onClick={() => handleclick(document)} className="document-list">
        <p>{document.name}</p>
        <button onClick={(e) => {
            e.stopPropagation();
            handleOpenPopup();
          }} id={document._id}>X</button>
       </li>

       {isPopupOpen && (
        <PopupComponent onClose={handleClosePopup} />
      )}
      

       {/* <li className="document-list"></li> */}
    </div>
  );
};

export default Document;
