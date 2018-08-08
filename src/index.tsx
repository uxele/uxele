import { h, render } from "preact";
import { App } from "./view/App";
import "./view/Base.scss";
render(<App />, document.querySelector("body")!);