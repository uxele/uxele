import {h, Component} from "preact";
import "./Canvas.scss";
import { IPage, BaseTool } from "psdetch-core";
import { FabricRenderer } from "psdetch-render-fabric";
import { store, actionRendererSet } from "psdetch-faced";
// import {ITool,session} from "psdetch-faced"
interface CanvasProps{
  // page?:IPage;
  // onRendererReady:(renderer:FabricRenderer)=>void;
}
interface CanvasState{
  curTool:BaseTool
}
export class Canvas extends Component<CanvasProps,CanvasState>{
  private canvasWrapper?:HTMLElement;
  private renderer?:FabricRenderer;
  private canvas:HTMLCanvasElement;
  private unsubscribe?:()=>void;
  constructor(){
    super();
    this.canvas=document.createElement("canvas");
  }
  get toolState(){
    return store.getState().choseTool;
  }
  get pageState(){
    return store.getState().chosePage;
  }
  onToolChange=(tool:any)=>{
    const t=tool as BaseTool;
    this.setState({curTool:t});
  }

  componentDidMount(){
    if (!this.renderer){
      
      this.canvas.width=this.canvasWrapper!.clientWidth;
      this.canvas.height=this.canvasWrapper!.clientHeight;
      this.canvasWrapper!.appendChild(this.canvas);
      this.renderer=new FabricRenderer(this.canvas,this.canvas.width,this.canvas.height);
    }
    store.dispatch(actionRendererSet(this.renderer));
    this.unsubscribe=store.subscribe(()=>{
      if (this.pageState.page && this.renderer!.getPage()!==this.pageState.page){
        this.onPage(this.pageState.page);
      }
      if (this.state.curTool !== this.toolState.tool){
        this.onToolChange(this.toolState.tool);
      }
    })
    if (this.pageState.page && this.renderer!.getPage()!==this.pageState.page){
      this.renderer!.renderPage(this.pageState.page);
    }
  }
  componentDidUpdate(prevProps:CanvasProps){
    
  }
  onPage=(page:IPage)=>{
    this.renderer!.renderPage(page);
  }
  componentWillUnmount(){
    this.unsubscribe!();
    // session.off("curTool",this.onToolChange);
  }
  render(){
    return (
      <div ref={e=>this.canvasWrapper=e} class={`canvas ${this.state.curTool?this.state.curTool.slug:""}`} >
      </div>
    );
  }
}