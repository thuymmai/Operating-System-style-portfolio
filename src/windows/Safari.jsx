import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { PanelLeft } from "lucide-react";
import { ChevronLeft } from "lucide-react";

{/* exported to windows/index.js */}

const Safari = () => {
  return (
    <>
        <div id="window-header">
            <WindowControls target="safari"/>

            {/* PanelLeft is from Lucide */}
            <PanelLeft className="ml-10 icon"/>

            <div className="flex items-center gap-1 ml-5">
              <ChevronLeft></ChevronLeft>

            </div>



        </div>    
    </>

  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;