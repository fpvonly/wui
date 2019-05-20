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
    getContentPanelObj: () => {},
    updateColOrder: () => {}
  };

  static propTypes = {
    text: PropTypes.string,
    order: PropTypes.number,
    getContentPanelObj: PropTypes.func,
    updateColOrder: PropTypes.func
  };

  componentDidMount() {
    this.resizeGrip.addEventListener('mousedown', this.handleResizeColumnStart, false);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleResizeColumnMove, false);
  }

  static getDerivedStateFromProps(props, state){
    return  {
      order: props.order
    };
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
    e.dataTransfer.setData("order", this.state.order);
    this.dragStartX = e.pageX;
    window.addEventListener('drag', this.handleDragColumnMove, false);
    window.addEventListener('dragend', this.handleDragColumnEnd, false);
  }

  handleDragColumnMove = (e) => {
    let dist = e.pageX - this.dragStartX;
    this.panel.style.pointerEvents = 'none';
    this.titleInput.style.pointerEvents = 'all';
    this.panel.style.left =  dist + 'px';
  }

  handleDragColumnEnd = () => {
    this.panel.style.left = 'auto';
    this.panel.style.top = 'auto';
    this.panel.style.pointerEvents = 'all';
    window.removeEventListener('drag', this.handleDragColumnMove, false);
    window.removeEventListener('dragend', this.handleDragColumnEnd, false);
  }

  handleDrop = (e) => {
    e.preventDefault();
    let draggedIndex = e.dataTransfer.getData("order");
    let thisIndex = this.state.order;
    this.props.updateColOrder(draggedIndex, thisIndex);
  }

  handleDropOver = (e) => {
    e.preventDefault();
  }

  render() {
    let styles = {
      order: this.state.order,
      gridColumnStart: 'span ' + this.state.size
    };

    return <div className='box' ref={(c) => { this.panel = c; }} style={styles} onDrop={this.handleDrop} onDragOver={this.handleDropOver}>
      <input
      draggable='true'
        className='title_input'
        ref={(c) => { this.titleInput = c; }}
        type='text'
        defaultValue='Title'
        onDragStart={this.handleDragColumnStart}
        tabIndex={this.state.order} />
      {this.props.text + ' , ' + this.state.order}
      <div className='box_resize_grip' ref={(c) => { this.resizeGrip = c; }} />
    </div>;
  }

}

export default MenuAreaBox;
