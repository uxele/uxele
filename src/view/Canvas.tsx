import { h, Component } from "preact";
import "./Canvas.scss";

import { facade, tools, Core } from "uxele-facade";
import { bindStore } from "../lib/bindStore";
import { BaseTool } from "uxele-facade/build/tools";
// import {ITool,session} from "psdetch-faced"
interface CanvasProps {
  // page?:IPage;
  // onRendererReady:(renderer:FabricRenderer)=>void;
}
interface CanvasState {
  curTool?:BaseTool;
  coords?: Core.IPoint;
  zoomLevel?: number;
  renderer?:Core.IRenderer;
}
export class Canvas extends Component<CanvasProps, CanvasState>{
  private canvasWrapper?: HTMLElement;
  constructor() {
    super();
    bindStore<CanvasState>(this, {
        coords: (state) => state.canvasStatus.coords,
        zoomLevel: (state) => state.canvasStatus.zoomLevel,
        curTool:(state)=>state.choseTool.tool,
        renderer:(state)=>state.renderer.renderer
      })
  }
  componentDidMount() {
    facade.bindCanvas(this.canvasWrapper!);
  }
  componentWillUnmount() {
    // session.off("curTool",this.onToolChange);
  }
  zoomIn() {
    facade.zoomIn();
  }
  zoomOut() {
    facade.zoomOut();
  }
  render() {
    return (
      <div ref={e => this.canvasWrapper = e} class={`canvas ${this.state.curTool ? this.state.curTool.slug : ""}`} >
        {this.state.renderer ?
          <div class="tools">
            {this.state.coords ? <span class="text">X: {this.state.coords!.x}</span> : null}
            {this.state.coords ? <span class="text">Y: {this.state.coords!.y}</span> : null}
            <span class="flex1"></span>
            <span class="zoom" onClick={() => this.zoomOut()} ><i class="fas fa-search-minus"></i></span>
            <span class="text">{(this.state.zoomLevel || 1) * 100}%</span>
            <span class="zoom" onClick={() => this.zoomIn()}><i class="fas fa-search-plus"></i></span>
          </div>
          : null
        }
      </div>
    );
  }
}