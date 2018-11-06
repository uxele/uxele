import { h, Component } from "preact";

import "./Main.scss";
import { IProject } from "psdetch-core";
import { Canvas } from "./Canvas";
import {PagesPreview} from "./PagesPreview";
import { RightView } from "psdetch-studio/src/view/right/Right";
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
          
            <PagesPreview />
            
          </aside>
          <main class="flexItem main">
            <div class="canvasWrapper">
              <Canvas></Canvas>
            </div>
          </main>
          <RightView/>
          
        </div>


      </div>
    )
  }

}