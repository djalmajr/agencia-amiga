import _ from 'lodash';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Input } from 'semantic-ui-react';

class CustomInput extends Input {
  focus() {
    this.el.focus();
  }

  componentDidMount() {
    const input = this.el.querySelector('input');
    const label = this.el.querySelector('.label');

    if (label) {
      input.style.width = `calc(100% - ${getComputedStyle(label).width})`;
    }
  }

  render() {
    const { inputContainerStyle, ...props } = this.props;
    const style = _.merge({ width: '100%' }, inputContainerStyle);

    return (
      <div ref={el => (this.el = el)} style={style}>
        <Input {...props} />
      </div>
    );
  }
}

const InputDate = ({ value, className, placeholder, onChange, ...props }) => (
  <DatePicker
    fixedHeight
    locale="pt-br"
    dateFormat="DD/MM/YYYY"
    className={className}
    placeholder={typeof placeholder !== 'undefined' ? placeholder : 'dd/mm/aaaa'}
    customInput={<CustomInput {...props} />}
    selected={value}
    onChange={onChange}
  />
);

InputDate.propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

export default InputDate;
