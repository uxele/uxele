import { h, Component } from "preact";

import "./Main.scss";
import { Canvas } from "./Canvas";
import { PagesPreview } from "./left/PagesPreview";
import { LayerList } from "./left/LayerList";


import { RightView } from "./right/Right";
import { ToolBar } from "./ToolBar";
import { LeftView } from "./left/Left";

interface IMainState {
  // isPreview: boolean;
}
export class Main extends Component<{}, IMainState>{

  constructor() {
    super();
    this.state = {
      // isPreview: true
    }
  }
  onToggleView = (isPreview: boolean) => {
    // this.setState({ isPreview: isPreview });
  }
  render() {
    return (

      <div class="mainContainer flexColumn">
        <div class="mainContainer flexItem">
          <LeftView></LeftView>
          <main class="flexItem main">
            <div class="canvasWrapper">
              <Canvas></Canvas>
            </div>
          </main>
          <RightView />
        </div>


      </div>
    )
  }

}