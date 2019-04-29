import React from 'react';
import {render} from 'react-dom';


import TaskBar from './TaskBar.jsx'
import MenuArea from './MenuArea.jsx'



class UI extends React.Component {

  constructor(props) {
    super(props);

    this.ui = false;

    this.state = {
      isHydrating: true,
      menuOpen: false
    }
  }

  componentDidMount() {
    this.ui.addEventListener('click', this.closeMenu, false);
  }

  componentWillUnMount() {
    this.ui.removeEventListener('click', this.closeMenu, false);
  }

  handleStartClick = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  closeMenu = (e) => {
    if (e.target.className === 'ui') {
      e.stopPropagation();
      this.setState({menuOpen: false});
    }
  }

  render() {
    let taskbar = null;
    let menu = null;
    taskbar = <TaskBar menuOpen={this.state.menuOpen} handleStartClick={this.handleStartClick} />;
    menu = (this.state.menuOpen === true) ? <MenuArea /> : null;

    return <div ref={(c) => { this.ui = c; }} className='ui'>
      {menu}
      {taskbar}
    </div>;
  }


}

export default UI;
