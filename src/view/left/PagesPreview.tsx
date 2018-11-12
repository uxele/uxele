import { h, Component } from "preact";
import { IPage, IProject } from "psdetch-core/build";

import "./PagesPreview.scss";
// import { session } from "psdetch-faced";
import { PagePreview } from "./PagePreview";
import { store, actionChosePage } from "psdetch-faced/build";





interface IPagePreviewState {
  pages: IPage[];
  activePage?: IPage;
}


export class PagesPreview extends Component<{}, IPagePreviewState> {
  private currentProject?: IProject;
  constructor() {
    super();
    this.state = {
      pages: [],
      activePage: undefined
    }
    this.onPageSelect = this.onPageSelect.bind(this);

  }

  private onPageSelect(page:IPage){
    store.dispatch(actionChosePage(page));
    this.setState({activePage:page});
  }
  private async setPages() {
    const _pages = await this.currentProject!.getPages();
    this.setState({ pages: _pages })
    this.setState({ activePage: _pages[0] })
    //trigger event
  }


  componentDidMount() {

      // this.currentProject = session.get("curProject") as IProject;
      this.currentProject=store.getState().project.project;
      this.setPages();
  }

  render() {
    const { pages } = this.state;
    return (

      <div class="page-list">
        {pages &&
          pages.map((page: IPage, pageIndex: number, array: IPage[]) => (

            <PagePreview page={page} index={pageIndex} onPageSelect={this.onPageSelect} isActive={this.state.activePage! && this.state.activePage! === page} />



          ))}

      </div>
      

    );
  }
}
