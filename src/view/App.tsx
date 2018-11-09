import { h, Component } from "preact";
import { FileDropper } from "./FileDropper";
import { Nav } from "./Nav";
import "./App.scss";
// import { initCore, Session } from "../model/Session";
import { IPage } from "psdetch-core";
import { Modal, falert } from "./Modal";
// import { session } from "psdetch-faced";
import { Main } from "./Main";
import { store, faced, actionChosePage } from "psdetch-faced";

interface AppState {

  // curProject?: IProject;
  // curPage?:IPage;
  loading: boolean;
}

export class App extends Component<{}, AppState> {
  private unsubscribe?: () => void;
  get curPage(): IPage | undefined {
    return store.getState().chosePage.page;
  }
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  loadFile = (_f: File) => {
    this.setState({ loading: true });
    faced.projectOpenLocalFile(_f)
      .then(async (proj) => {
        const pgs = await proj.getPages();
        store.dispatch(actionChosePage(pgs[0]));
      }, (err: string) => {
        falert(err);
      })
      .then(() => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div class="app">
        <Nav></Nav>
        {!this.state.loading && !this.curPage && <FileDropper onFile={this.loadFile}></FileDropper>}
        {this.state.loading && <div class="loading is-size-4 has-text-grey"><i class="fas fa-spinner is-size-2 has-text-primary animated infinite spin"></i> Parsing... Please be patient.</div>}
        {this.curPage &&
          <Main></Main>
        }
        <Modal></Modal>
      </div>
    );
  }

}