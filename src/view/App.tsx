import { h, Component } from "preact";
import { FileDropper } from "./FileDropper";
import { Nav } from "./Nav";
import "./App.scss";
// import { initCore, Session } from "../model/Session";
import { IProject, IFileBlob, IPage } from "psdetch-core";
import { FabricRenderer } from "psdetch-render-fabric";
import { PSDAdapter } from "psdetch-fileadapter-psd";
import { ImageAdapter } from "psdetch-fileadapter-image";
import { lang } from "../i18n/lang";
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
  // componentDidMount(){
  //   this.unsubscribe=store.subscribe(()=>{
  //     this.setState({loading:this.projectState.loading});
  //     if (this.projectState.errorReason){
  //       falert(this.projectState.errorReason);
  //     }
  //   })
  // }
  // componentWillUnmount(){
  //   this.unsubscribe!();
  // }
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
    // const adps = this.core.getAdapters();
    // const file: IFileBlob = {
    //   meta: {
    //     name: _f.name,
    //     mime: _f.type
    //   },
    //   file: _f
    // }
    // for (const adp of adps) {
    //   if (adp.checkFileMeta(file.meta)) {
    //     this.setState({loading:true});
    //     try{
    //       const proj = await adp.decodeProject(file);
    //       this.setState({loading:false });
    //       session.set("curProject",proj);
    //       const pgs=await proj.getPages();

    //       setTimeout(()=>{
    //         // this.setState({curPage:pgs[0]});  
    //         session.set("curPage", pgs[0]);
    //       },500);
    //     }catch(e){
    //       falert(e.toString());
    //       this.setState({loading:false});
    //     }
    //     return
    //   }
    // }
    // falert(lang("error_openfile_no_adapter", file.meta.name));
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