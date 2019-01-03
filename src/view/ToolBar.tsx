import { h, Component } from "preact";
import "./ToolBar.scss";
// import { session } from "psdetch-faced";
import { facade, tools } from "uxele-facade";
import { HandTool, InspectTool, ColorTool } from "uxele-facade/build/tools";
import { bindStore } from "../lib/bindStore";
import { Pillar, PageLayerList, actionTogglePageLayerList } from "uxele-facade/build/facade/states/GeneralView";
interface ToolBarState {
  display: boolean;
  pillar: Pillar;
  pageLayerList?: PageLayerList;
}

// const faMaper: any = {
//   "tool_hand": "fas fa-hand-paper",
//   "tool_inspect":"fas fa-mouse-pointer",
//   "tool_color":"fas fa-eye-dropper"
// }
export class ToolBar extends Component<{}, ToolBarState>{
 
  constructor() {
    super();
    bindStore(this, {
      display: (state) => state.renderer.renderer ? true : false,
      pillar: (state) => state.genearlView.pillar,
      pageLayerList: (state) => state.genearlView.pageLayerList
    })
  }

  render() {
    if (this.state.display) {
      return (
        <div class="toolbar">
          {this.renderPillarTool()}
          <div class="flex1"></div>
          {this.renderGeneralTools()}
        </div>
      )
    } else {
      return null;
    }

  }
  togglePageLayerList(item: PageLayerList) {
    facade.store.dispatch(actionTogglePageLayerList(item));
  }
  renderGeneralTools() {
    return (
      tools.tools.general.map((t) => this.bindToggleTool(t))
        .concat([
          <div onClick={() => this.togglePageLayerList("pageList")} class={`toolBtn toggle ${this.state.pageLayerList === "pageList" ? 'active' : ''}`}>
            <i class="fas fa-th"></i>
          </div>,
          // <div onClick={() => this.togglePageLayerList("layerList")} class={`toolBtn toggle ${this.state.pageLayerList === "layerList" ? 'active' : ''}`}>
          //   <i class="fas fa-bars"></i>
          // </div>
        ])
    )
  }
  renderPillarTool() {
    const pillar = this.state.pillar;
    const pillarTools = tools.tools[pillar];
    return pillarTools.map((t) => this.bindExclusiveTool(t));
  }
  renderToolForInspectPillar() {
    if (this.state.pillar === "inspect") {
      return (
        [
          [
            tools.getToolInst(InspectTool),
            tools.getToolInst(ColorTool),
          ].map((t) => this.bindExclusiveTool(t))
        ]
      )
    } else {
      return null;
    }

  }
  private async setExclusiveTool(tool?: tools.BaseTool) {
    await tools.setActiveTool(tool);
    this.forceUpdate();
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
  private async toggleTool(t: tools.BaseTool) {
    await tools.toggleTool(t);
    this.forceUpdate();
  }
  private bindToggleTool(tool?: tools.BaseTool) {
    if (tool) {
      return (
        <div onClick={() => this.toggleTool(tool)} class={`toolBtn toggle ${tool.activated ? 'active' : ''}`}>
          <i class={tool.cls}></i>
        </div>
      )
    }
  }
}
