import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { Search } from "lucide-react";
import { locations } from "#constants/index";
import useLocationStore from "#store/location";
import { clsx } from "clsx";
import useWindowStore from "#store/window";

const Finder = () => {

  const { openWindow } = useWindowStore();

  {/* destructure the activeLocation and setActiveLocation */}
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if(item.fileType === "pdf") return openWindow("resume");
    if(item.kind === "folder") return setActiveLocation(item);
    
    // open up a new window
    // an array of fig or url
    // "&& item.href...": and if that item has an href, then return window.open and open that item in a blank page
    // in my case, have an item (capstone project) opens in another deployed page to show employers
    if(["fig", "url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
    
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  // take an array of items
  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>  
    
      {/* open a dynamic part and wrap this in a <ul> */}
      <ul>{items.map((item) => (    

    // define callback function in onClick to set the active location when a user clicks on a location
      <li key={item.id} onClick={() =>
        setActiveLocation(item)}
        className={clsx(item.id === activeLocation.id ? "active" : "not-active",)}>
          <img src={item.icon} className="w-4" alt={item.name} />
          <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ))}
      </ul>
      </div>
  );

  return (
    <>
    <div id="window-header">
        <WindowControls target="finder"/>
        <Search className="icon"/>
    </div>

    <div className="bg-white flex h-full">
      <div className="sidebar">          
          {renderList("Favorites", Object.values(locations))}        
          
          {/* map the children of locations */}
          {renderList("Work", locations.work.children)}          
      </div>

      <ul className="content">
        {activeLocation?.children.map((item) => (
          <li key={item.id} className={item.position} onClick={() => openItem(item)}>
            <img src={item.icon} alt={item.name}/>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

{/* wrap Finder component and choose "finder" key */}
const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;