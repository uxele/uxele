import {h, Component} from "preact";
import "./Canvas.scss";
import { IPage } from "psdetch-core";
import { FabricRenderer } from "psdetch-render-fabric";
import { session } from "../model/Session";
interface CanvasProps{
  // page?:IPage;
  // onRendererReady:(renderer:FabricRenderer)=>void;
}
export class Canvas extends Component<CanvasProps,{}>{
  private canvasWrapper?:HTMLElement;
  private renderer?:FabricRenderer;
  private canvas:HTMLCanvasElement;
  constructor(){
    super();
    this.canvas=document.createElement("canvas");
  }
  componentDidMount(){
    if (!this.renderer){
      
      this.canvas.width=this.canvasWrapper!.clientWidth;
      this.canvas.height=this.canvasWrapper!.clientHeight;
      this.canvasWrapper!.appendChild(this.canvas);
      this.renderer=new FabricRenderer(this.canvas,this.canvas.width,this.canvas.height);
    }
    // this.props.onRendererReady(this.renderer);
    session.renderer=this.renderer;
    session.on("onPage",(p)=>{
      if (p){
        this.onPage(p as IPage);
      }
    });
    if (session.curPage && session.curPage!==this.renderer!.getPage()){
      this.renderer!.renderPage(session.curPage);
    }
  }
  componentDidUpdate(prevProps:CanvasProps){
    
  }
  onPage=(page:IPage)=>{
    this.renderer!.renderPage(page);
  }
  componentWillUnmount(){

  }
  render(){
    return (
      <div ref={e=>this.canvasWrapper=e} class="canvas" >
      </div>
    );
  }
}