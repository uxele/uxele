import { h, Component } from "preact";
import "./Canvas.scss";

import { facade, tools, Core } from "uxele-facade";
// import {ITool,session} from "psdetch-faced"
interface CanvasProps {
  // page?:IPage;
  // onRendererReady:(renderer:FabricRenderer)=>void;
}
interface CanvasState {
  curTool?: tools.BaseTool,
  coords?: Core.IPoint,
  zoomLevel: number
}
const zoomScales = [0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4];
export class Canvas extends Component<CanvasProps, CanvasState>{
  private canvasWrapper?: HTMLElement;
  private canvas: HTMLCanvasElement;
  private unsubscribe?: () => void;
  constructor() {
    super();
    this.canvas = document.createElement("canvas");
    this.state = {
      zoomLevel: 1
    }
  }
  get renderer() {
    return facade.store.getState().renderer.renderer;
  }
  get toolState() {
    return facade.store.getState().choseTool;
  }
  get pageState() {
    return facade.store.getState().chosePage;
  }
  onToolChange = (tool: any) => {
    const t = tool as tools.BaseTool;
    this.setState({ curTool: t });
  }
  onMouseMove = (e?: Core.IRendererEvent) => {
    if (e) {
      const coords = this.renderer!.rendererPointToRealPoint(this.renderer!.mouseEventToCoords(e));
      this.setState({ coords });
    }
  }
  componentDidMount() {

    this.canvas.width = this.canvasWrapper!.clientWidth;
    this.canvas.height = this.canvasWrapper!.clientHeight;
    this.canvasWrapper!.appendChild(this.canvas);
    const renderer = facade.bindCanvas(this.canvas);
    renderer.on("mousemove", this.onMouseMove);

    this.unsubscribe = facade.store.subscribe(() => {
      if (this.pageState.page && this.renderer!.getPage() !== this.pageState.page) {
        this.onPage(this.pageState.page);
      }
      if (this.state.curTool !== this.toolState.tool) {
        this.onToolChange(this.toolState.tool);
      }
    })
    if (this.pageState.page && this.renderer!.getPage() !== this.pageState.page) {
      this.renderer!.renderPage(this.pageState.page);
    }
  }
  componentDidUpdate(prevProps: CanvasProps) {

  }
  onPage = (page: Core.IPage) => {
    this.renderer!.renderPage(page);
  }
  componentWillUnmount() {
    this.unsubscribe!();
    this.renderer!.off("mousemove", this.onMouseMove);
    // session.off("curTool",this.onToolChange);
  }
  zoomIn() {
    const idx = zoomScales.indexOf(this.state.zoomLevel);
    const zoomLevel = zoomScales[idx + 1 >= zoomScales.length ? zoomScales.length - 1 : idx + 1];
    this.setState({ zoomLevel });
    this.renderer!.zoom(zoomLevel);
  }
  zoomOut() {
    const idx = zoomScales.indexOf(this.state.zoomLevel);
    const zoomLevel = zoomScales[idx - 1 < 0 ? 0 : idx - 1];
    this.setState({ zoomLevel });
    this.renderer!.zoom(zoomLevel);
  }
  render() {
    return (
      <div ref={e => this.canvasWrapper = e} class={`canvas ${this.state.curTool ? this.state.curTool.slug : ""}`} >
        {this.renderer ?
          <div class="tools">
            {this.state.coords ? <span class="text">X: {this.state.coords!.x}</span> : null}
            {this.state.coords ? <span class="text">Y: {this.state.coords!.y}</span> : null}
            <span class="flex1"></span>
            <span class="zoom" onClick={() => this.zoomOut()} ><i class="fas fa-search-minus"></i></span>
            <span class="text">{this.state.zoomLevel * 100}%</span>
            <span class="zoom" onClick={() => this.zoomIn()}><i class="fas fa-search-plus"></i></span>
          </div>
          : null
        }
      </div>
    );
  }
}