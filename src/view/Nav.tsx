import {h,Component} from "preact"
import { LogoText } from "./LogoText";
import {ToolBar} from "./ToolBar";
import "./Nav.scss";
export class Nav extends Component{
  render(){
    return (
      <nav class="navbar is-dark">
        <div class="navbar-item is-size-4 has-text-weight-bold"><LogoText></LogoText></div>
        <ToolBar></ToolBar>
      </nav>
    )
  }
}