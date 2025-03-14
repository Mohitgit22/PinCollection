import Layers from "./layers";
import Options from "./Options";
import Workspace from "./Workspace";

const Editor = ({ previewImg }) => {

    console.log(previewImg);
    return (
      <div className="editor">
        {previewImg ? (
          <>
            <Layers previewImg={previewImg} />
            <Workspace previewImg={previewImg} />
            <Options previewImg={previewImg} />
          </>
        ) : (
          <p>Loading preview...</p>
        )}
      </div>
    );
  };
  

  export default Editor;