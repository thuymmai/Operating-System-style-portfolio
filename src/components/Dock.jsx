import gsap from "gsap";
import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";

import { useRef } from "react";
import { Tooltip } from "react-tooltip";

const Dock = () => {

  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;

    {/* if there is no dock, exit out of the function */}
    if(!dock) return;

    {/* if there is a dock, then user gets access to the icons I want to animate, 
        here I get all classes of dock-icon*/}
    const icons = dock.querySelectorAll(".dock-icon");

    {/* below is the function that animates these icons */}
    const animateIcons = (mouseX) => {
        const { left } = dock.getBoundingClientRect();

        icons.forEach((icon) => {

            {/* this is the start of position of the icon */}
            const { left: iconLeft, width } = icon.getBoundingClientRect();
            const center = iconLeft - left + width / 2;
            const distance = Math.abs(mouseX - center);


            const intensity = Math.exp(-(distance ** 2.5) / 2000);

            gsap.to( icon, {
                scale: 1 + 0.25 * intensity,
                y: -15 * intensity,
                duration: 0.2,
                ease: "power1.out",
            }); 
        });
    };

    {/* function that handles mouse movement */}
    const handleMouseMove = (e) => {
        const { left } = dock.getBoundingClientRect();

        {/* call animateIcons function 
            clientX is current position of mouse
            left is left position of the dock*/}
        animateIcons(e.clientX - left); 
    };

    const resetIcons = () => 
        icons.forEach((icon) => 
            gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power1.out",
            }),
        );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    
    return () => {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  

  const toggleApp = (app) => {
    //implement Open Window Logic

  };
    
  return (
    <section id="dock">
        <div ref={dockRef} className="dock-container">
            {dockApps.map(({id, name, icon, canOpen}) => (
                <div key={id} className="relative flex justify-center">
                    <button 
                    type="button" 
                    className="dock-icon" 
                    aria-label={name}
                    data-tooltip-id = "dock-tooltip"
                    data-tooltip-content={name}
                    data-tooltip-delay-show={150}
                    disabled={!canOpen}
                    onClick={() => toggleApp({id, canOpen})}
                    >
                        <img 
                        src={`/images/${icon}`} 
                        alt={name}
                        loading="lazy"
                        className={canOpen ? '' : "opacity-60"} />
                    </button>
                </div>
            ))}

            {/* when hovering over apps (in the dock)
            user can see the title of each app at the top */}
            <Tooltip id="dock-tooltip" place="top" className="tooltip"/>
        </div>
    </section>
  );
};



export default Dock;