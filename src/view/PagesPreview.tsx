import { h, Component } from "preact";
import { IPage, IProject } from "psdetch-core/build";

import "./PagesPreview.scss";
import { session } from "../model/Session";
import { PagePreview } from "./PagePreview";




interface IPagePreviewState {
  pages: IPage[];
}


export class PagesPreview extends Component<{}, IPagePreviewState> {
  private currentProject?: IProject;
  constructor() {
    super();
    this.state = {
      pages: []
    }

  }
  private async setPages() {
    const _pages = await this.currentProject!.getPages();
    this.setState({ pages: _pages })
  }


  componentDidMount() {
      this.currentProject = session.get("curProject") as IProject;
      this.setPages();
  }

  render() {
    const { pages } = this.state;
    return (

      <section class="page-list">
        {pages &&
          pages.map((page: IPage, pageIndex: number, array: IPage[]) => (
            
              <PagePreview page={page} index={pageIndex} />
            

          ))}

      </section>

    );
  }
}
