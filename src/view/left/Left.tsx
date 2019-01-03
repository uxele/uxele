import { h, Component } from "preact";
import { ToolBar } from "../ToolBar";
import { bindStore } from "../../lib/bindStore";
import "./Left.scss";
import { PageLayerList } from "uxele-facade/build/facade/states/GeneralView";
import { PagesPreview } from "./PagesPreview";
import { LayerList } from "./LayerList";
import { PageListView } from "./PageList";
interface LeftViewState {
  display: boolean;
  pageLayerList?: PageLayerList;
}

export class LeftView extends Component<{}, LeftViewState> {
  constructor() {
    super();
    bindStore(this, {
      display: (state) => state.project.project ? true : false,
      pageLayerList: (state) => state.genearlView.pageLayerList
    })
  }
  render() {
    if (this.state.display) {
      return (
        <aside class="sidebar sidebarLeft">
          <ToolBar></ToolBar>
          {this.state.pageLayerList === "pageList"?<PageListView/>:null}
        </aside>
      )
    } else {
      return null;
    }

  }
}