import { h, Component } from "preact";
import "./ToolBar.scss";
import { HandTool } from "psdetch-tool-hand";
import { InspectTool } from "psdetch-tool-inspect";
import { ColorTool } from "psdetch-tool-color";
// import { session } from "psdetch-faced";
import { BaseTool } from "psdetch-core/build";
import { store, actionChoseTool } from "psdetch-faced/build";
interface ToolBarState {
  display: boolean
}

// const faMaper: any = {
//   "tool_hand": "fas fa-hand-paper",
//   "tool_inspect":"fas fa-mouse-pointer",
//   "tool_color":"fas fa-eye-dropper"
// }
export class ToolBar extends Component<{}, ToolBarState>{
  private handTool?: HandTool;
  private inspectTool?:InspectTool;
  private colorTool?:ColorTool;
  private unsubscribe?: () => void;
  get curTool() {
    return store.getState().choseTool.tool;
  }
  set curTool(v: BaseTool | undefined) {
    store.dispatch(actionChoseTool(v));
  }
  get renderer() {
    return store.getState().renderer;
  }
  constructor() {
    super();
    this.state = { display: false };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      if (this.state.display === false) {
        if (this.renderer.renderer) {
          this.setState({ display: true });
          this.handTool = new HandTool(this.renderer.renderer);
          this.inspectTool = new InspectTool(this.renderer.renderer);
          this.colorTool = new ColorTool(this.renderer.renderer);
          this.toggleTool(this.handTool);
          this.setExclusiveTool(this.inspectTool);
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
          {/* {this.bindToggleTool(this.handTool)} */}
          {this.bindExclusiveTool(this.inspectTool)}
          {this.bindExclusiveTool(this.colorTool)}
        </div>
      )
    } else {
      return null;
    }

  }
  private setExclusiveTool(tool?: BaseTool) {
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
  private bindExclusiveTool(tool?: BaseTool) {
    if (tool) {
      return (
        <div onClick={() => this.setExclusiveTool(tool)} class={`toolBtn ${tool.activated ? 'has-background-black-ter has-text-primary' : ''}`}>
          <i class={tool.cls}></i>
        </div>
      )
    } else {
      return null;
    }
  }
  private toggleTool(t?: BaseTool) {
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
  private bindToggleTool(tool?: BaseTool) {
    if (tool) {
      return (
        <div onClick={() => this.toggleTool(tool)} class={`toolBtn ${tool.activated ? 'has-background-black-ter has-text-primary' : ''}`}>
          <i class={tool.cls}></i>
        </div>
      )
    }
  }
}
