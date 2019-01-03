import { h, Component } from "preact";
import { FileDropper } from "./FileDropper";
import { Nav } from "./Nav";
import "./App.scss";
// import { initCore, Session } from "../model/Session";
import { Modal, falert } from "./Modal";
// import { session } from "psdetch-faced";
import { Main } from "./Main";
import { facade} from "uxele-facade";

interface AppState {

  // curProject?: IProject;
  // curPage?:IPage;
  loading: boolean;
}

export class App extends Component<{}, AppState> {
  private unsubscribe?: () => void;
  get curProject(){
    return facade.store.getState().project.project;
  }
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  loadFile = (_f: File) => {
    this.setState({ loading: true });
    facade.projectOpenLocalFile(_f)
      .then(async () => {
        // const pgs = await proj.getPages();
        // facade.store.dispatch(facade.actionChosePage(pgs[0]));
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
        {!this.state.loading && !this.curProject && <FileDropper onFile={this.loadFile}></FileDropper>}
        {this.state.loading && <div class="loading is-size-4 has-text-grey"><i class="fas fa-spinner is-size-2 has-text-primary animated infinite spin"></i> Parsing... Please be patient.</div>}
        {this.curProject &&
          <Main></Main>
        }
        <Modal></Modal>
      </div>
    );
  }

}