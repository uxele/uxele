import { h, Component } from "preact";
import { IPage, ILayer } from "psdetch-core/build";


import "./LayerList.scss";
interface ILayerListProps {
  page: IPage;
}

interface ILayerListState {
  layers: ILayer[];

}

export class LayerList extends Component<ILayerListProps, ILayerListState> {
  
  constructor() {
    super();

  }
  componentWillMount() {
    this.renderLayerItem();
  }
  async renderLayerItem() {
    const _layers: ILayer[] = await this.props.page.getLayers();
    
    this.setState({ layers: _layers });

  }
  render() {
  
    return null;


  }
}
