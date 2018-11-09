import { h, Component } from "preact";
import "./ToggleToolBar.scss";

interface ToggleToolBarProps {
  onToggle(isPreview:boolean):void;
}


export class ToggleToolBar extends Component<ToggleToolBarProps, {}> {

  constructor() {
    super();
 
  }
  
  
  render() {

    return (
      <div class="toggle-bar">
        <nav class="tabs">
          <ul class="-primary">
            <li onClick = {()=>this.props.onToggle(true)}>
              <a >
                <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>

              </a>
            </li>
            <li onClick = {()=>this.props.onToggle(false)}> 
              <a >
                <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>

              </a>
            </li>



          </ul>
        </nav>
      </div>
    );


  }
}
