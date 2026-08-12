import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

{/* useWindowStore is a function block */}
const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        /* additional function */
        openWindow: ( windowKey, data = null) => 
            set((state) => {

            /* first, have access to a window */
            const win = state.windows[windowKey];

            //if the windowKey is invalid, do nothing
            if(!win) return;

            /* since user is within the open window function,
               I set win.isOpen to be true
               then I modify the index by saying when zIndex is equal to state.nextZIndex.
               Then I modify the data. When win.data = data
               Or if new data doesn't exist, I'll make it the same as the data that was already there "  */
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;

            /* then I increase the nextZIndex so 
            when somebody else opens a new window, it appears
            on top of the existing one */
            state.nextZIndex++;
            

        }),

        /* we don't need any data to close a window */
        closeWindow: ( windowKey ) => 
            set((state) => {
                const win = state.windows[windowKey];                
                if(!win) return; //if the windowKey is invalid, do nothing
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX; //I reset ZIndex to initial z index
                win.data = null;

            }),

        /* this function is for bringing a window, which is already opened, on top
           this function also does not require data */
        focusWindow: ( windowKey ) => 
            set((state) => {
                const win = state.windows[windowKey];
                win.zIndex = state.nextZIndex++; /* here I update the Z index */
            }),
    })),
);

export default useWindowStore;