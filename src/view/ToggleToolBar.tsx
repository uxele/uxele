import { h, Component } from "preact";
import "./ToggleToolBar.scss";

interface IToggleToolBarProps {
  onToggle(isPreview:boolean):void;
}
interface IToggleToolBarState {
  isPreview:boolean;
}


export class ToggleToolBar extends Component<IToggleToolBarProps, IToggleToolBarState> {

  constructor() {
    super();
    this.state = {isPreview:true}
 
  }
  
  
  render() {
    const isPreview = this.state.isPreview;
    
    return (
      <div class="toggle-bar">
        <nav class="tabs">
          <ul class="-primary">
            <li className={(isPreview ? 'has-background-black-ter has-text-primary' : '')} onClick = {()=>{this.props.onToggle(true);this.setState({isPreview:true})}}>
              <a >
                <span class="icon is-small"><i class="fas fa-th" aria-hidden="true"></i></span>

              </a>
            </li>
            <li className={(!isPreview ? 'has-background-black-ter has-text-primary' : '')} onClick = {()=>{this.props.onToggle(false);this.setState({isPreview:false})}}> 
              <a >
                <span class="icon is-small"><i class="fas fa-bars" aria-hidden="true"></i></span>

              </a>
            </li>



          </ul>
        </nav>
      </div>
    );


  }
}
