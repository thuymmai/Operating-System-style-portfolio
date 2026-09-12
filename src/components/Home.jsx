import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";

// if children does not exist, return empty array
const projects = locations.work?.children ?? [];
const Home = () => {

    const { setActiveLocation } = useLocationStore();

    // click on a folder and it opens
    const { openWindow } = useWindowStore();

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    };

    useGSAP(() => {
        // folder class becomes draggable
        Draggable.create(".folder");

    }, []);

  return (
    <section id="home">
        <ul>
            {/* map each individual project */}
            {projects.map((project) => (
                /* use the word folder ("group folder") to target folders with GSAP so they can be draggable */
                <li 
                key={project.id} 
                className={clsx("group folder", project.windowPosition)}
                
                // open the handleOpenProjectFinder here and pass "project"
                onClick={() => handleOpenProjectFinder(project)}
                >
                    <img src="/images/folder.png" alt={project.name}/>

                    {/* render p tag that will render the project's name */}
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  );
};

export default Home;