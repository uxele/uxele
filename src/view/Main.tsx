import { h, Component } from "preact";

import "./Main.scss";
import { Canvas } from "./Canvas";
import { PagesPreview } from "./left/PagesPreview";
import { LayerList } from "./left/LayerList";
import { ToggleToolBar } from "./ToggleToolBar";


import { RightView } from "./right/Right";

interface IMainState {
  isPreview: boolean;
}
export class Main extends Component<{}, IMainState>{

  constructor() {
    super();
    this.state = {
      isPreview: true
    }
  }
  onToggleView = (isPreview: boolean) => {
    this.setState({ isPreview: isPreview });
  }
  render() {
    return (

      <div class="mainContainer flexColumn">
        <div class="mainContainer flexItem">
          <aside class="sidebar sidebarLeft">

            {!this.state.isPreview && <LayerList />}
            {this.state.isPreview && <PagesPreview />}

            <ToggleToolBar onToggle={this.onToggleView} />
          </aside>
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