import { h, Component } from "preact";
import { IPage, ILayer } from "psdetch-core";

import { LayerItem } from "./LayerItem"
import { store } from "psdetch-faced/build";

import "./LayerList.scss";
interface ILayerListState {
  layers: ILayer[];

}

export class LayerList extends Component<{}, ILayerListState> {
  private currentPage?: IPage;
  private unsubscribe?:()=>void;
  constructor() {
    super();

  }
  get pageState(){
    debugger;
    return store.getState().chosePage;
  }
  componentWillUnmount(){
    this.unsubscribe!();
  }
  componentDidMount() {
    debugger;
   // this.currentPage = this.pageState.page;
    
    this.renderLayerItem();
    this.unsubscribe=store.subscribe(()=>{
      alert(" fsf")
      if (this.pageState.page && this.pageState.page !== this.currentPage){
      alert("pagechange")
      this.renderLayerItem();
      }
      
    })
 
  }
  async renderLayerItem() {

    //if (session.get("curPage") && session.get("curPage") !== this.currentPage!) {
     // if (this.pageState.page && this.pageState.page !== this.currentPage){
        
      this.currentPage = this.pageState.page;
      const _layers: ILayer[] = await this.currentPage!.getLayers();
      this.setState({ layers: _layers });
   // }

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
