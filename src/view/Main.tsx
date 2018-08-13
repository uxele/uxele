import { h, Component } from "preact";

import "./Main.scss";
import { IProject } from "psdetch-core/build";
import { Canvas } from "./Canvas";
interface IMainProps {
  curProject?: IProject;
}
export class Main extends Component<IMainProps, {}>{

  constructor() {
    super();

  }
  render() {


    return (

      <div class="mainContainer flexColumn">
        <div class="mainContainer flexItem">
          <aside class="sidebar sidebarLeft">
            <h2>Left Sidebar</h2>
            <p>content</p>
            <p>content</p>
            <p>content</p>
          </aside>
          <main class="flexItem main">
            <div class="canvasWrapper">
              <Canvas></Canvas>
            </div>
          </main>

          <aside class="sidebar sidebarRight">
            <h2>Right Sidebar</h2>
            <p>content</p>
          </aside>
        </div>


      </div>
    )
  }

}