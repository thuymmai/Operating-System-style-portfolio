import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";


const Text = () => {

    // get access to windows from useWindowStore
    const { windows } = useWindowStore();

    // the data comes from windows.txtfile?.data
    const data = windows.txtfile?.data;

    // if there is no data, it returns null and does not render the window
    if (!data) return null;

    // otherwise, it detructures all the properties from the data
    const { name, image, subtitle, description } = data;

    return (
        <>
            {/* render window-header and applies target "txtfile"*/}
            <div id="window-header">
                <WindowControls target="txtfile"/>
                <h2>{name}</h2>
            </div>

            <div className="p-5 space-y-6 bg-white">
                {/* check whether an image exists; if it does, it gets rendered */}
                {image ? (
                    <div className="w-full">
                        <img src={image} alt={name} className="w-full h-auto rounded"/>
                    </div>

                ) : null}

                {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}

                {Array.isArray(description) && description.length > 0 ?(
                    <div className="space-y-3 leading-relaxed text-base text-gray-800">
                        {description.map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                ) : null}
            </div>        
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;