import { h, Component } from "preact";
import "./ToolBar.scss";
// import { session } from "psdetch-faced";
import { facade,tools } from "uxele-facade";
import { HandTool, InspectTool } from "uxele-facade/build/tools";
interface ToolBarState {
  display: boolean
}

// const faMaper: any = {
//   "tool_hand": "fas fa-hand-paper",
//   "tool_inspect":"fas fa-mouse-pointer",
//   "tool_color":"fas fa-eye-dropper"
// }
export class ToolBar extends Component<{}, ToolBarState>{
  private unsubscribe?: () => void;
  get curTool() {
    return facade.store.getState().choseTool.tool;
  }
  set curTool(v: tools.BaseTool | undefined) {
    facade.store.dispatch(facade.actionChoseTool(v));
  }
  get renderer() {
    return facade.store.getState().renderer;
  }
  constructor() {
    super();
    this.state = { display: false };
  }
  componentDidMount() {
    this.unsubscribe = facade.store.subscribe(() => {
      if (this.state.display === false) {
        if (this.renderer.renderer) {
          this.setState({ display: true });
          this.toggleTool(tools.getToolInst(HandTool));
          this.setExclusiveTool(tools.getToolInst(InspectTool));
        }
      }
    })
  }
  componentWillUnmount() {
    this.unsubscribe!();
  }
  render() {
    if (this.state.display) {
      return (
        <div class="toolbar">
            {tools.getTools().filter((t)=>!(t instanceof tools.HandTool)).map((t)=>this.bindExclusiveTool(t))}
        </div>
      )
    } else {
      return null;
    }

  }
  private setExclusiveTool(tool?: tools.BaseTool) {
    if (tool && this.curTool !== tool) {
      if (this.curTool) {
        this.curTool.deactivate();
      }

      tool.activate()
        .then(() => {
          this.curTool = tool;
          this.forceUpdate();
        })

    } else if (tool && this.curTool === tool) {


      tool.deactivate()
        .then(() => {
          this.curTool = undefined;
          this.forceUpdate();
        });

    }
  }
  private bindExclusiveTool(tool?: tools.BaseTool) {
    if (tool) {
      return (
        <div onClick={() => this.setExclusiveTool(tool)} class={`toolBtn ${tool.activated ? 'active' : ''}`}>
          <i class={tool.cls}></i>
        </div>
      )
    } else {
      return null;
    }
  }
  private toggleTool(t?: tools.BaseTool) {
    if (t) {
      if (t.activated) {
        t.deactivate()
          .then(() => {
            this.forceUpdate();
          })

      } else {
        t.activate()
          .then(() => {
            this.forceUpdate();
          })

      }
    }

  }
  private bindToggleTool(tool?: tools.BaseTool) {
    if (tool) {
      return (
        <div onClick={() => this.toggleTool(tool)} class={`toolBtn ${tool.activated ? 'active' : ''}`}>
          <i class={tool.cls}></i>
        </div>
      )
    }
  }
}
