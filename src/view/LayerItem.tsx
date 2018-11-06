import {h, Component } from "preact";
import { ILayer } from "psdetch-core/build";


import "./LayerItem.scss";



interface ILayerItemProps {
  layer: ILayer;
  indent?: number;

}



export class LayerItem extends Component<ILayerItemProps, {}> {

  constructor() {
    super();

  }


  render() {
    const layer = this.props.layer;
    return (
      <div class="layer"> {layer.name}</div>
    )


  }
}
