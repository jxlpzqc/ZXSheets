import ReactDOM from "react-dom";
import App from "../view/App";


import { initializeIcons } from '@fluentui/font-icons-mdl2';
import React from "react";

initializeIcons();

console.log(require('../view/libs/ribbon/assets/back.png'));
console.log(require('../view/libs/ribbon/assets/dropdown.png'));
console.log(require('../view/libs/ribbon/assets/more.png'));


ReactDOM.render(React.createElement(App), document.getElementById("app")!);