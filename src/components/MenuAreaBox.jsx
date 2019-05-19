import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';


class MenuAreaBox extends React.Component {

  constructor(props) {
    super(props);

    this.resizeGrip = null;
    this.panel = null;
    this.titleInput = null;

    this.resizeSstartX = null;
    this.resizeStartWidth = -1;
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
    this.resizeGrip.addEventListener('mousedown', this.handleResizeColumnStart, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleResizeColumnMove, false);
  }

  // resize column

  handleResizeColumnStart = (e) => {
    e.stopPropagation();
    this.resizeSstartX = e.pageX;
    this.resizeStartWidth = this.panel.getBoundingClientRect().width;
    window.addEventListener('mousemove', this.handleResizeColumnMove, false);
    window.addEventListener('mouseup', this.handleResizeColumnEnd, false);

  }

  handleResizeColumnMove = (e) => {
    let curWidth = this.panel.getBoundingClientRect().width;
    let diffX = (curWidth >= 200) ? this.resizeSstartX - e.pageX : curWidth;
    let newWidth = this.resizeStartWidth - diffX;

    if (curWidth >= 200) {
      this.panel.style.width = newWidth + 'px';
    }
  }

  handleResizeColumnEnd = () => {
    let endWidth = this.panel.getBoundingClientRect().width;
    let colRelation = endWidth - this.resizeStartWidth;
    let containerWidth = this.props.getContentPanelObj().getBoundingClientRect().width;
    let singleColWidth = containerWidth / 3;
    let endCols = Math.ceil(endWidth / singleColWidth);

    this.panel.style.width = 'auto';
    this.setState({
      size: (endCols > 3 ? 3 : endCols)
    });
    window.removeEventListener('mousemove', this.handleResizeColumnMove, false);
  }

  // Drag column

  handleDragColumnStart = (e) => {
    e.stopPropagation();
    this.dragStartX = e.pageX;
    window.addEventListener('mousemove', this.handleDragColumnMove, false);
    window.addEventListener('mouseup', this.handleDragColumnEnd, false);
  }

  handleDragColumnMove = (e) => {
    let dist = e.pageX - this.dragStartX;
    this.panel.style.left = dist + 'px';
  }

  handleDragColumnEnd = () => {
    this.panel.style.left = 'auto';
    this.panel.style.top = 'auto';
    window.removeEventListener('mousemove', this.handleDragColumnMove, false);
    window.removeEventListener('mouseup', this.handleDragColumnEnd, false);
  }


  render() {
    let styles = {
      order: this.props.order,
      gridColumnStart: 'span ' + this.state.size
    };

    return <div className='box' ref={(c) => { this.panel = c; }} style={styles}>
      <input className='title_input' ref={(c) => { this.titleInput = c; }} type='text' defaultValue='Title' onMouseDown={this.handleDragColumnStart} />
      {this.props.text}
      <div className='box_resize_grip' ref={(c) => { this.resizeGrip = c; }} />
    </div>;
  }

}

export default MenuAreaBox;
