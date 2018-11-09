import { h, render } from "preact";
import { App } from "./view/App";
import "./scss/base.scss";
render(<App />, document.querySelector("body")!);