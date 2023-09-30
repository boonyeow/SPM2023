// Keep in mind that these are the styles from flatpickr package
// See troubleshooting section in case you have problems importing the styles

import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import { Component } from "react";

class CustomDatePicker extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };

  }

  handleDateChange = ([date]) => {
    this.setState({ date });
    this.props.onDateChange(date);
  };

  render() {
    const { date } = this.state;
    return (
      <Flatpickr
  
        value={date}
        onChange={this.handleDateChange} 
      />
    );
  }
}
export default CustomDatePicker;