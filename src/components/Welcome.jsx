import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100},
    title: { min: 400, max: 900, default: 400}
};

const renderText = (text, className, baseWeight = 400) => {
    
    {/* this is an array
        [...text] is equivalent to text.split 
        then map over each individual char
        and get an index for that character
        then we return a span element for each char*/}
    return [...text].map((char, i) => (
        <span key={i} 
              className={className}
              style={{fontVariationSettings: `"wght" ${baseWeight}`}}>

                {char == " " ? "\u00A0" : char}

        </span>
    ))

};

const setupTextHover = (container, type) => {
    {/* if there is no container, we exit the function */}
    if(!container) return;

    const letters = container.querySelectorAll("span");
    const {min, max, default: base } = FONT_WEIGHTS[type];

    {/* this function animates each letter, not all of them altogether */}
    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, { 
            duration, 
            ease: 'power2.out',
            fontVariationSettings: `"wght" ${weight}`,
         });
    };

    {/* get access to the mouse position */}
    const handleMouseMove = (event) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = event.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 2000);

            animateLetter(letter, min + (max - min) * intensity);            
        });
    };

    const handleMouseLeave = () => 
        letters.forEach((letter) => animateLetter(letter, base, 0.3));

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    {/* when calling an EventListener function
        make sure to return the callback function */}
    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {

    {/* first React reference called titleRef
        then I use the useRef hook and set it to null*/}
    const titleRef = useRef(null);

    {/* second reference is called subtitleRef*/}
    const subtitleRef = useRef(null);

    {/* implement dependency array in useGSAP hook 
        this only happens at the start*/}
    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            titleCleanup();
            subtitleCleanup();        
        };
    }, []);

  return (
    <section id="welcome">
        <p ref={subtitleRef}>
            {renderText(
                "hi, i'm thuy! welcome to my", 
                "text-3xl font-georama", 
                100)}
        </p>

        <h1 ref={titleRef} className="mt-7">
            {renderText("portfolio", 
                "text-9xl italic font-georama"
            )}
        </h1>

        <div className="small-screen">
            <p>This portfolio is designed for desktop/tablet screen only.</p>
        </div>
    </section>
  );   
};

export default Welcome;