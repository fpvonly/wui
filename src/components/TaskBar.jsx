import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';



class TaskBar extends React.Component {

  constructor(props) {
    super(props);

    this.startBtn = null;
    this.state = {
      startBtnActive: false
    };
  }

  static defaultProps = {
    handleStartClick: () => {},
    menuOpen: false
  };

  static propTypes = {
    handleStartClick: PropTypes.func,
    menuOpen: PropTypes.bool
  };

  componentDidMount() {

  }

  handleStartClick = () => {
    this.props.handleStartClick();
    this.setState({startBtnActive: !this.state.startBtnActive});
  }

  render() {
    let startBtn = <div ref={(c) => { this.startBtn = c; }} className={'start_btn' + (this.state.startBtnActive === true ? ' active' : '')} onClick={this.handleStartClick}>
        <div className='start_icon' />
      </div>
    return <div className='taskbar'>
      {startBtn}
      <div className='bar' />
    </div>;
  }


}

export default TaskBar;
