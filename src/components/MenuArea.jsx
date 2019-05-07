import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';


class MenuArea extends React.Component {

  constructor(props) {
    super(props);

  }

  static defaultProps = {
    menuOpen: false
  };

  static propTypes = {
    menuOpen: PropTypes.bool
  };

  componentDidMount() {

  }


  render() {
    return <div className='menu'>
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
      <div className='content_panel'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>

      </div>
      <div className='resize_grip' />
    </div>;
  }


}

export default MenuArea;
