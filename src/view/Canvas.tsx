import {h, Component} from "preact";
import "./Canvas.scss";
import { IPage } from "psdetch-core/build";
import { FabricRenderer } from "psdetch-render-fabric";
import { session, ITool } from "../model/Session";
interface CanvasProps{
  // page?:IPage;
  // onRendererReady:(renderer:FabricRenderer)=>void;
}
interface CanvasState{
  curTool:ITool
}
export class Canvas extends Component<CanvasProps,CanvasState>{
  private canvasWrapper?:HTMLElement;
  private renderer?:FabricRenderer;
  private canvas:HTMLCanvasElement;
  constructor(){
    super();
    this.canvas=document.createElement("canvas");
  }
  onToolChange=(tool:any)=>{
    const t=tool as ITool;
    this.setState({curTool:t});
  }
  componentDidMount(){
    if (!this.renderer){
      
      this.canvas.width=this.canvasWrapper!.clientWidth;
      this.canvas.height=this.canvasWrapper!.clientHeight;
      this.canvasWrapper!.appendChild(this.canvas);
      this.renderer=new FabricRenderer(this.canvas,this.canvas.width,this.canvas.height);
    }
    // this.props.onRendererReady(this.renderer);
    session.on("curTool",this.onToolChange);
    session.set("renderer",this.renderer);
    session.on("curPage",(p)=>{
      if (p){
        this.onPage(p as IPage);
      }
    });
    if (session.get("curPage") && session.get("curPage")!==this.renderer!.getPage()){
      this.renderer!.renderPage(session.get("curPage")!);
    }
  }
  componentDidUpdate(prevProps:CanvasProps){
    
  }
  onPage=(page:IPage)=>{
    this.renderer!.renderPage(page);
  }
  componentWillUnmount(){
    session.off("curTool",this.onToolChange);
  }
  render(){
    return (
      <div ref={e=>this.canvasWrapper=e} class={`canvas ${this.state.curTool?this.state.curTool.slug:""}`} >
      </div>
    );
  }
}