import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components/index.js";

const Resume = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target="resume"/>
        
        </div>  
    
    
    
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;