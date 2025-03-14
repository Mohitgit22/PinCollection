// import React, { useEffect, useState } from 'react'
// import "./createPage.css";
// import Image from '../../components/image/image';
// import useAuthStore from '../../utils/authStore';
// import { useNavigate } from 'react-router';
// import Editor from '../../components/editor/editor';

// const CreatePage = () => {

//   const { currentUser } = useAuthStore();
//   const navigate = useNavigate();

//   const [file, setFile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   const [previewImgURL, setPreviewImgURL] = useState(null);
  
//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/auth");
//     }
//   }, [navigate, currentUser]);
  
//   useEffect(() => {
//     if (file) {
//       const objectURL = URL.createObjectURL(file);
//       setPreviewImgURL(objectURL);
  
//       // Clean up the object URL to prevent memory leaks
//       return () => URL.revokeObjectURL(objectURL);
//     } else {
//       setPreviewImgURL(null);
//     }
//   }, [file]);
  

//   const handleSubmit = async () => {
//     if (isEditing) {
//       setIsEditing(false);
//     } else {
//       const formData = new FormData(formRef.current);
//       formData.append("media", file);
//       formData.append("textOptions", JSON.stringify(textOptions));
//       formData.append("canvasOptions", JSON.stringify(canvasOptions));
//       // FIXED: ADD NEW BOARD
//       formData.append("newBoard", newBoard);

//       // FIXED: CHANGE DIRECT REQUEST TO MUTATION
//       // try {
//       //   const res = await apiRequest.post("/pins", formData, {
//       //     headers: {
//       //       "Content-Type": "multipart/form-data",
//       //     },
//       //   });
//       //   navigate(`/pin/${res.data._id}`)
//       // } catch (err) {
//       //   console.log(err);
//       // }
//       mutation.mutate(formData);
//     }
//   };

//   return (
//     <div className="createPage">
//       <div className="createTop">
//         <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
//         <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
//       </div>
//       {isEditing ? (
//         <Editor  />
//       ) : (
//       <div className='createBottom'>
//         {previewImgURL ? (<div className='preview'><img src={previewImgURL} alt="" ></img> 
//         <div className='editIcon' onClick={()=>setIsEditing(true)}>
//         <Image path="/general/edit.svg" alt="" />
//         </div>
//         </div>
        
//         ):( 
//            <>
//           <label  htmlFor = "file" className='upload'>
//           <div className='uploadTitle'>
//             <Image path="/general/upload.svg" alt="" />
//             <span>Choose a file or drag and drop it here</span>
//             </div>
//           <div className='uploadInfo'>
//          We recommend using hoigh quality .jpg files less than 20 files less gthan 200 MB.
//             </div>
//           </label>
//         <input 
//           type = "file"
//           id= "file"
//           hidden
//           onChange={e=>setFile(e.target.files[0])}
//           />
//           </>
//         )
//         }


//         <form className='createForm'>
//           <div className='createFormItem'>
//             <label htmlFor='title'> Title </label>
//             <input 
//             type="text"
//             placeholder="Add a title"
//             name="title"
//             id="title"
//             />
//             </div>
//             <div className='createFormItem'>
//              <label htmlFor='Description'> Description </label>
//             <textarea
//             rows={6} 
//             type="text"
//             placeholder="Add a detailed description"
//             name="Description"
//             id="description"
//             />
//           </div>
//           <div className='createFormItem'>
//             <label htmlFor='link'> Link</label>
//             <input 
//             type="text"
//              placeholder='Add a link'
//               name='link'
//                id="link" />
//           </div>

//           <div className='createFormItem'>
//             <label htmlFor='board'> Board</label>
//             <select name='board' id='board'>
//               <option>Choose a board</option>
//               <option value="1">Board 1</option>
//               <option value="2">Board 2</option>
//               <option value="3">Board 3</option>
//             </select>
//           </div>
//           <div className='createFormItem'>
//             <label htmlFor='tags'>Tagged topics</label>
//             <input type="text" placeholder='Add taggs' name='tags' id="tags" />
//             <small>Don&apos;t worry, people wont&apos;t see your taggs</small>
//           </div>
//         </form>
//       </div>
//       )}
//     </div>
//   )
// }

// export default CreatePage








//--------------from github -------- but chal rha hai 
import "./createPage.css";
import IKImage from "../../components/image/image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import BoardForm from "./BoardForm";
import useEditorStore from "../../utils/editorStore"; // Added missing import
import Editor from "../../components/editor/editor";

// Function to add a post
const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const formRef = useRef();
  const { textOptions, canvasOptions, resetStore } = useEditorStore(); // Ensured resetStore is used

  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newBoard, setNewBoard] = useState("");
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  // Mutation for adding post
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pin/${data._id}`);
    },
  });

  // Handle form submission
  const handleSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      if (file) formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      formData.append("newBoard", newBoard);

      mutation.mutate(formData);
    }
  };

  // Fetch existing boards
  const { data: boards, isLoading, error } = useQuery({
    queryKey: ["formBoards"],
    queryFn: () => apiRequest.get("/boards").then((res) => res.data),
  });

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>

      {isEditing ? (
        <div className="editorContainer">
          <Editor previewImg={previewImg} />
        </div>
      ) : (
        <div className="createBottom">
          {previewImg.url ? (
            <div className="preview">
              <img src={previewImg.url} alt="Preview" />
              <div className="editIcon" onClick={() => setIsEditing(true)}>
                <IKImage path="/general/edit.svg" alt="Edit" />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <IKImage path="/general/upload.svg" alt="Upload" />
                  <span>Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high-quality .jpg files (≤ 20MB) or .mp4 files (≤ 200MB).
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                accept="image/jpeg, image/png, video/mp4"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}

          <form className="createForm" ref={formRef}>
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input type="text" placeholder="Add a title" name="title" id="title" required />
            </div>

            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea rows={6} placeholder="Add a detailed description" name="description" id="description" required />
            </div>

            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input type="url" placeholder="Add a link" name="link" id="link" />
            </div>

            {/* Fetch and display boards */}
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              {isLoading ? (
                <p>Loading boards...</p>
              ) : error ? (
                <p>Error fetching boards</p>
              ) : (
                <>
                  <select name="board" id="board">
                    <option value="">Choose a board</option>
                    {boards?.map((board) => (
                      <option value={board._id} key={board._id}>
                        {board.title}
                      </option>
                    ))}
                  </select>
                  <div className="newBoard">
                    {newBoard && (
                      <div className="newBoardContainer">
                        <div className="newBoardItem">{newBoard}</div>
                      </div>
                    )}
                    <div className="createBoardButton" onClick={() => setIsNewBoardOpen(!isNewBoardOpen)}>
                      Create new board
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="createFormItem">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Don&apos;t worry, people won&apos;t see your tags</small>
            </div>
          </form>

          {isNewBoardOpen && <BoardForm setIsNewBoardOpen={setIsNewBoardOpen} setNewBoard={setNewBoard} />}
        </div>
      )}
    </div>
  );
};

export default CreatePage;
