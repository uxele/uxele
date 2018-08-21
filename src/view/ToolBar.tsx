import { h, Component } from "preact";
import "./ToolBar.scss";
import { HandTool } from "psdetch-tool-hand";
import { session, ITool } from "psdetch-faced";
import { FabricRenderer } from "psdetch-render-fabric";
import { InspectTool } from "psdetch-tool-inspect";
interface ToolBarState {
  display: boolean
}

const faMaper: any = {
  "tool_hand": "fas fa-hand-paper",
  "tool_inspect":"fas fa-mouse-pointer"
}
export class ToolBar extends Component<{}, ToolBarState>{
  private handTool?: HandTool;
  get curTool() {
    return session.get("curTool");
  }
  set curTool(v: ITool | undefined) {
    session.set("curTool", v);
  }
  constructor() {
    super();
    session.once("renderer", (r) => {
      this.setState({ display: true });
      this.toggleTool(session.get('handtool'));
    })
    this.state = { display: false };
  }
  render() {
    if (this.state.display) {
      return (
        <div class="toolbar">
          {this.bindToggleTool(session.get('handtool'))}
          {this.bindExclusiveTool(session.get("inspectTool"))}
        </div>
      )
    } else {
      return null;
    }

  }
  private setExclusiveTool(tool?: ITool) {
    if (tool && this.curTool !== tool) {
      if (this.curTool) {
        this.curTool.deactivate();
      }
      tool.once("onActivated", () => {
        this.forceUpdate();
      })
      tool.activate();
      this.curTool = tool;

    }else if (tool && this.curTool === tool){
      tool.once("onDeactivated", () => {
        this.forceUpdate();
      })
      tool.deactivate();
      this.curTool =undefined;
    }
  }
  private bindExclusiveTool(tool?: ITool) {
    if (tool) {
      return (
        <div onClick={() => this.setExclusiveTool(tool)} class={`toolBtn ${tool.activated ? 'has-background-black-ter has-text-primary' : ''}`}>
          <i class={faMaper[tool.slug]}></i>
        </div>
      )
    } else {
      return null;
    }
  }
  private toggleTool(t?: ITool) {
    if (t) {
      if (t.activated) {
        t.deactivate()
        t.once("onDeactivated",()=>{
          this.forceUpdate();
        })
      } else {
        t.activate();
        t.once("onActivated",()=>{
          this.forceUpdate();
        })
      }
    }
  }
  private bindToggleTool(tool?: ITool) {
    if (tool) {
      return (
        <div onClick={() => this.toggleTool(tool)} class={`toolBtn ${tool.activated ? 'has-background-black-ter has-text-primary' : ''}`}>
          <i class={faMaper[tool.slug]}></i>
        </div>
      )
    }
  }
}
