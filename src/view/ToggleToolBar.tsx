import { h, Component } from "preact";
import "./ToggleToolBar.scss";

interface ToggleToolBarState {
  active: boolean
}


export class ToggleToolBar extends Component<{}, {}> {

  constructor() {
    super();
 
  }
  

  render() {

    return (
      <div class="toggle-bar">
        <nav class="tabs">
          <ul class="-primary">
            <li>
              <a >
                <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>

              </a>
            </li>
            <li>
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
