import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import MenuAreaBox from './MenuAreaBox.jsx';


class MenuArea extends React.Component {

  constructor(props) {
    super(props);

    this.resizeGrip = null;
    this.panel = null;
    this.menu = null;
    this.startX = null;
    this.startY = null;
  }

  static defaultProps = {
    menuOpen: false
  };

  static propTypes = {
    menuOpen: PropTypes.bool
  };

  componentDidMount() {
    this.resizeGrip.addEventListener('mousedown', this.handleMouseDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseDown = (e) => {
    this.startX = e.pageX;
    this.startY = e.pageY;
    this.startWidth = this.menu.getBoundingClientRect().width;
    this.startHeight = this.menu.getBoundingClientRect().height;
    window.addEventListener('mousemove', this.handleMouseMove, false);
    window.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseMove = (e) => {
    let curWidth = this.menu.getBoundingClientRect().width;
    let curHeight = this.menu.getBoundingClientRect().height;
    let diffX = (curWidth >= 500) ? this.startX - e.pageX : curWidth;
    let newWidth = this.startWidth - diffX;
    let diffY = (curHeight >= 200) ? e.pageY - this.startY : curHeight;
    let newHeight = this.startHeight - diffY;

    if (curWidth >= 500) {
      this.menu.style.width = newWidth + 'px';
    }
    if (newHeight >= 200) {
      this.menu.style.height = newHeight + 'px';
    }
  }

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  getContentPanelObj = () => {
    return this.panel;
  }
  render() {


    return <div className='menu' ref={(c) => { this.menu = c; }}>
      <div className='side_panel'>
        <div className='btn'>
        Btn
        </div>
        <div className='btn'>
        Btn
        </div>
        <div className='btn'>
        Btn
        </div>
      </div>
      <div className='content_panel' ref={(c) => { this.panel = c; }}>
        <MenuAreaBox text='1' order={2} getContentPanelObj={this.getContentPanelObj} />
        <MenuAreaBox text='2' order={1} getContentPanelObj={this.getContentPanelObj} />
        <MenuAreaBox text='3' order={3} getContentPanelObj={this.getContentPanelObj} />

      </div>
      <div className='resize_grip' ref={(c) => { this.resizeGrip = c; }} />
    </div>;
  }


}

export default MenuArea;
