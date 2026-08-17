import dayjs from "dayjs";

import { navIcons, navLinks } from "#constants/index.js";
import useWindowStore from "#store/window";



const Navbar = () => {

    {/* openWindow functionality here */}
    const { openWindow } = useWindowStore();

  return (
    <nav>
        <div>
            {/* icon from lucide react */}
            <img src="/images/ghost.svg" alt="logo"/>
            <p className="font-bold">thuyOS</p>

            <ul>                
                {/* type comes from constants/index.js/navLinks */}
                {navLinks.map(({ id, name, type }) => (
                    <li key={id} onClick={() => openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map(({ id, img }) => (
                    <li key={id}>
                        <img src={img} className="icon-hover" alt={`icon-${id}`} />
                    </li>
                ))}
            </ul>

            <time>{dayjs().format('ddd, MMM D, h:mm A')}</time>
        </div>
    </nav>
  );
};

export default Navbar;