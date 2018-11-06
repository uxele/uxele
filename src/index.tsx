import { h, render } from "preact";
import "./view/Base.scss";
import { App } from "./view/App";

render(<App />, document.querySelector("body")!);