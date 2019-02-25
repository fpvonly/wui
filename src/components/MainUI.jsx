import React from 'react';
import {render} from 'react-dom';


import TaskBar from './TaskBar.jsx'



class UI extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHydrating: true,
      menuOpen: false
    }
  }

  componentDidMount() {

  }


  handleStartClick = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render() {
    let taskbar = null;
    let menu = null;
    taskbar = <TaskBar menuOpen={this.state.menuOpen} handleStartClick={this.handleStartClick} />;
    menu = (this.state.menuOpen === true) ? <div className='menu'>MENU</div> : null;

    return <div className='ui'>
      {menu}
      {taskbar}    
    </div>;
  }


}

export default UI;