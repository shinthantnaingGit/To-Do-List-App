import { updateDoneTotal, updateTaskTotal } from "./list.js";
import { listGroup } from "./selectors.js";

const observer = ()=>{
    console.log("I am observer");
    //Watching list group
}

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const observedJob = () => {
    console.log("list group changed");
    updateDoneTotal();
    updateTaskTotal();
}

// Create an observer instance linked to the callback function
const listGroupObserver = new MutationObserver(observedJob)

// Start observing the target node for configured mutations
listGroupObserver.observe(listGroup, config);

// Later, you can stop observing
// observer.disconnect();

export default observer;