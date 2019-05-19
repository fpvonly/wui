import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';


class MenuAreaBox extends React.Component {

  constructor(props) {
    super(props);

    this.resizeGrip = null;
    this.panel = null;
    this.titleInput = null;
    this.startX = null;
    this.startY = null;
    this.startWidth = -1;
    this.dragStartX = -1;

    this.state = {
      order: this.props.order,
      pos: 1,
      size: 'span 1'
    }
  }

  static defaultProps = {
    text: '',
    order: 1,
    getContentPanelObj: () => {}
  };

  static propTypes = {
    text: PropTypes.string,
    order: PropTypes.number,
    getContentPanelObj: PropTypes.func
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
    this.startWidth = this.panel.getBoundingClientRect().width;
    this.startHeight = this.panel.getBoundingClientRect().height;
    window.addEventListener('mousemove', this.handleMouseMove, false);
    window.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseMove = (e) => {
    let curWidth = this.panel.getBoundingClientRect().width;
    let diffX = (curWidth >= 200) ? this.startX - e.pageX : curWidth;
    let newWidth = this.startWidth - diffX;

    if (curWidth >= 200) {
      this.panel.style.width = newWidth + 'px';
    }
  }

  handleMouseUp = () => {
    let endWidth = this.panel.getBoundingClientRect().width;
    let colRelation = endWidth - this.startWidth;
    let containerWidth = this.props.getContentPanelObj().getBoundingClientRect().width;
    let singleColWidth = containerWidth / 3;
    let endCols = Math.ceil(endWidth / singleColWidth);

    this.panel.style.width = 'auto';
    this.setState({
      size: (endCols > 3 ? 3 : endCols)
    });
    window.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  onMouseDown = (e) => {
    this.dragStartX = e.pageX;
    window.addEventListener('mousemove', this.handleMouseMove, false);
    window.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseMove = (e) => {
    let dist = e.pageX - this.dragStartX;
    this.panel.style.left = dist + 'px';
  }

  handleMouseUp = () => {
    this.panel.style.left = 'auto';
    this.panel.style.top = 'auto';

    window.removeEventListener('mousemove', this.handleMouseMove, false);
    window.removeEventListener('mouseup', this.handleMouseUp, false);
  }


  render() {
    let styles = {
      order: this.props.order,
      gridColumnStart: 'span ' + this.state.size
    };

    return <div className='box' ref={(c) => { this.panel = c; }} style={styles}>
      <input className='title_input' ref={(c) => { this.titleInput = c; }} type='text' defaultValue='Title' onMouseDown={this.onMouseDown} />
      {this.props.text}
      <div className='box_resize_grip' ref={(c) => { this.resizeGrip = c; }} />
    </div>;
  }

}

export default MenuAreaBox;
