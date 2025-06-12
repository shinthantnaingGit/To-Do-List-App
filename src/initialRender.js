import { addList } from "./handlers.js";
import { tasks } from "./list.js";

const initialRender = () => {
    console.log("I am render at app start");
    tasks.forEach((task) => {
        addList(task);
    })
};

export default initialRender;