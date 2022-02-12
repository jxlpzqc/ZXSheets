import ReactDOM from "react-dom";
import App from "../view/App";


import { initializeIcons } from '@fluentui/font-icons-mdl2';
import React from "react";

initializeIcons();


ReactDOM.render(React.createElement(App), document.getElementById("app")!);