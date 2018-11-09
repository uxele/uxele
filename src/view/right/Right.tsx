import { h, Component } from "preact";
import "./Right.scss";
import { store } from "psdetch-faced/build";
import { BaseTool } from "psdetch-core/build";
import { LayerView } from "./LayerView";

interface RightViewState{
  // curTool?:BaseTool;
}
export class RightView extends Component<{}, RightViewState>{
  // private unsubscribe?: Function;
  get curToolState(){
    return store.getState().choseTool;
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
      </aside>
    );
  }
}
