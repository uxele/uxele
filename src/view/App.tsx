import { h, Component } from "preact";
import { FileDropper } from "./FileDropper";
import {Nav} from "./Nav";
import "./App.scss";
// import { initCore, Session } from "../model/Session";
import { IProject, CoreProvider, IFileBlob, IPage } from "psdetch-core";
import { FabricRenderer } from "psdetch-render-fabric";
import { PSDAdapter } from "psdetch-fileadapter-psd";
import { ImageAdapter } from "psdetch-fileadapter-image";
import { lang } from "../i18n/lang";
import { Modal, falert } from "./Modal";
import {Canvas} from "./Canvas";
import { session } from "../model/Session";
interface AppState {

  // curProject?: IProject;
  // curPage?:IPage;
  loading:boolean;
}

export class App extends Component<{},AppState> {
  private core: CoreProvider<FabricRenderer> = new CoreProvider();
  constructor() {
    super();
    this.core.addAdapter(new PSDAdapter());
    this.core.addAdapter(new ImageAdapter());
    this.state = {
      loading:false
    };
  }
  loadFile = async (_f: File) => {
    const adps = this.core.getAdapters();
    const file: IFileBlob = {
      meta: {
        name: _f.name,
        mime: _f.type
      },
      file: _f
    }
    for (const adp of adps) {
      if (adp.checkFileMeta(file.meta)) {
        this.setState({loading:true});
        try{
          const proj = await adp.decodeProject(file);
          this.setState({loading:false });
          session.project=proj
          const pgs=await proj.getPages();

          setTimeout(()=>{
            // this.setState({curPage:pgs[0]});  
            session.curPage=pgs[0];
          },500);
        }catch(e){
          falert(e.toString());
          this.setState({loading:false});
        }
        return
      }
    }
    falert(lang("error_openfile_no_adapter", file.meta.name));
  }
  
  render() {
    return (
      <div class="app">
        <Nav></Nav>
        { !this.state.loading && !session.project && <FileDropper onFile={this.loadFile}></FileDropper>}
        { this.state.loading && <div class="loading is-size-4 has-text-grey"><i class="fas fa-spinner is-size-2 has-text-primary animated infinite spin"></i> Parsing... Please be patient.</div> }
        {session.project && 
        <div class="canvasWrapper">
          <Canvas></Canvas>
        </div>
        }
        <Modal></Modal>
      </div>
    );
  }

}