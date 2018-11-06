import {h, Component} from "preact";
import "./LayerExport.scss";
import { ILayer } from "psdetch-core/build";
interface LayerExportViewProps{
  layer:ILayer;
}
export class LayerExportView extends Component<LayerExportViewProps,any>{
  render(){
    return (
      <div class="card layerExportView">
        <div class="title has-background-grey-dark has-text-white-ter">EXPORT</div>
        <div class="cardBody">
         
        </div>

      </div>
    )
  }
}