import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';


class MenuArea extends React.Component {

  constructor(props) {
    super(props);

    this.resizeGrip = null;
    this.panel = null;
    this.menu = null;
    this.startX = null;
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

  handleMouseDown = (e) => {
    this.startX = e.pageX;
    this.startWidth = this.menu.getBoundingClientRect().width;
    window.addEventListener('mousemove', this.handleMouseMove, false);
    window.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseMove = (e) => {
    let diffX = (this.startX < e.pageX) ? this.startX - e.pageX : this.startX - e.pageX;
    let newWidth = (this.startWidth) - diffX;

    this.menu.style.width = newWidth + 'px';
  }

  handleMouseUp = (e) => {
    window.removeEventListener('mousemove', this.handleMouseMove, false);
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
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>

      </div>
      <div className='resize_grip' ref={(c) => { this.resizeGrip = c; }} />
    </div>;
  }


}

export default MenuArea;
