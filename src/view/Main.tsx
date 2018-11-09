import { h, Component } from "preact";

import "./Main.scss";
import { IProject } from "psdetch-core/build";
import { Canvas } from "./Canvas";
import {PagesPreview} from "./PagesPreview";
import {LayerList} from "./LayerList";
import {ToggleToolBar} from "./ToggleToolBar";

interface IMainProps {
  curProject?: IProject;
}
interface IMainState {
  isPreview: boolean;
}
export class Main extends Component<IMainProps, IMainState>{

  constructor() {
    super();
    this.state={
      isPreview : true
    }
  }
  onToggleView = (isPreview:boolean) =>
  {
    this.setState({isPreview:isPreview});
  } 
  render() {


    return (

      <div class="mainContainer flexColumn">
        <div class="mainContainer flexItem">
          <aside class="sidebar sidebarLeft">
          
    {!this.state.isPreview && <LayerList /> }
    {this.state.isPreview && <PagesPreview /> }

            <ToggleToolBar onToggle={this.onToggleView}/>
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