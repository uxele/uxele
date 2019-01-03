import { h, Component } from "preact";
import "./Right.scss";
import {facade} from "uxele-facade";
import { LayerView } from "./InspectTool/LayerView";
import { ColorPickedView } from "./ColorTool/ColorPickedView";

interface RightViewState{
  // curTool?:BaseTool;
}
export class RightView extends Component<{}, RightViewState>{
  // private unsubscribe?: Function;
  get curToolState(){
    return facade.store.getState().choseTool;
  }
  componentDidMount() {
    // this.unsubscribe = store.subscribe(() => {
    //   if (this.state.curTool !== this.curToolState.tool){
    //     this.setState({curTool:this.curToolState.tool});
    //   }
    // });
  }
  componentWillUnmount(){
    // this.unsubscribe!();
  }
  render() {
    return (
      <aside class="sidebar sidebarRight">
        <LayerView/>
        <ColorPickedView/>
      </aside>
    );
  }
}
