import { h, Component } from "preact";
import { IPage, ILayer } from "psdetch-core";
import { session } from "psdetch-faced";
import { LayerItem } from "./LayerItem"



interface ILayerListState {
  layers: ILayer[];

}

export class LayerList extends Component<{}, ILayerListState> {
  private currentPage?: IPage;
  constructor() {
    super();

  }
  componentDidMount() {
    this.currentPage = session.get("curPage") as IPage;
    this.renderLayerItem();
    session.on("curPage", (p) => {
      this.renderLayerItem();
    });
  }
  async renderLayerItem() {

    if (session.get("curPage") && session.get("curPage") !== this.currentPage!) {
      this.currentPage = session.get("curPage") as IPage;
      const _layers: ILayer[] = await this.currentPage!.getLayers();
      this.setState({ layers: _layers });
    }

  }

  render() {
    const { layers } = this.state;
    return (

      <div class="layer-list">
        {layers &&
          layers.map((layer: ILayer, layerIndex: number, array: ILayer[]) => (

            <LayerItem layer={layer} />



          ))}
      </div>
    );


  }

}
