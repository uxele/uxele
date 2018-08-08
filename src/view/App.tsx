import { h, Component } from "preact";
import { FileDropper } from "./FileDropper";
import {LogoText} from "./LogoText";
import "./App.scss";
export class App extends Component {
  loadFile=(file:File)=>{
    console.log(file);
  }
  render() {
    return (
      <div class="app">
        <nav class="navbar is-dark">
          <div class="navbar-item is-size-4 logo"><LogoText></LogoText></div>
        </nav>
        
        <FileDropper onFile={this.loadFile}></FileDropper>
      </div>
    );
  }

}