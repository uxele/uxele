
import { h, Component } from "preact";
import "./PagePreviewImage.scss"
interface IPagePreviewComponentProps {
  image : HTMLImageElement;
  width:number;
  height:number;
  offsetX?:number;
  offsetY?:number;

}
export class PagePreviewImage extends Component<IPagePreviewComponentProps,{}> {
  
  private previewContainer?:HTMLElement;
 
  
  constructor(){
    super();
    
    
  }

  componentDidMount(){
    let _imagePreview  = new Image();
    _imagePreview = this.props.image;
    this.previewContainer!.appendChild(_imagePreview);
    
    
  }
  render() {
   
    return (
      
      <figure class="image">
      <div ref={e=>this.previewContainer=e}>
      </div>
    </figure>
    
    );
  }  
}