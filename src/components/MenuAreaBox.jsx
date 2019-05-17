import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';


class MenuAreaBox extends React.Component {

  constructor(props) {
    super(props);

    this.resizeGrip = null;
    this.panel = null;
    this.menu = null;
    this.startX = null;
    this.startY = null;

    this.state = {
      order: this.props.order
    }
  }

  static defaultProps = {
    text: '',
    order: 1
  };

  static propTypes = {
    text: PropTypes.string,
    order: PropTypes.number
  };

  componentDidMount() {
    //this.resizeGrip.addEventListener('mousedown', this.handleMouseDown, false);
  }

  componentWillUnmount() {
  //  window.removeEventListener('mousemove', this.handleMouseMove, false);
  }


  handleMouseUp = () => {
  //  window.removeEventListener('mousemove', this.handleMouseMove, false);
  }


  render() {
    let styles = {
      order: this.props.order
    };
    return <div className='box' style={styles}>{this.props.text}</div>;
  }

}

export default MenuAreaBox;
