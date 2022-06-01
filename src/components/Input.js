import styled from "styled-components/macro";

import React, { Component } from "react";

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: "",
      readOnly: false,
    };
  }
  componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({ isOpen: true });
    } else {
      document.addEventListener("mousedown", this.handleClickOutside);
    }

    ///  document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = () => {
    var str = this.state.value;
    if (str.length > 0) {
      this.setState({ isOpen: true });
    } else {
      this.setState({ isOpen: false });
    }
  };

  _onFocus = (e) => {
    this.setState({ isOpen: true });
  };

  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    this.setState({ [name]: value });

    this.setState({ value: value });
    // this.props.setState({ [name]: value });

  //  this.props.setValue({ [name]: value });
  };

  render() {
    return (
      <>
        <Formgroup>
          <label
            data-error="wrong"
            data-success="right"
            className={this.state.isOpen ? "active" : ""}
          >
            <span>{this.props.label}</span>
          </label>
          <InputType
            {...this.props}
            disabled={this.props.disabled && this.props.disabled}
            type={this.props.type}
            onFocus={this._onFocus}
            onChange={this.onChange}
            name={this.props.name}
            autoFocus={this.props.autoFocus}
            readOnly={this.props.readOnly}
            required={this.props.required}
            pattern={this.props.pattern && this.props.pattern}

            {...this.props.register(this.props.name)}
          />
          <small className="text-info">{this.props.textInfo}</small>
        </Formgroup>
      </>
    );
  }
}

const Formgroup = styled.div`
  position: relative;
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: 0.2rem;

  label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1rem;
    color: #757575;
    cursor: text;
    transition: transform 0.2s ease-out, color 0.2s ease-out;
    transform: translateY(-4px);
    transform-origin: 0 100%;
    display: inline-block;
    margin-bottom: 0rem;
    height: auto;
    padding: 0.6rem 0 0.4rem;
    margin: 0 0 0.5rem;

    &.active {
      transform: translateY(-26px) scale(0.8);
    }
  }
  .text-info {
    color: ${(p) => p.theme.cyan};
  }
`;

const InputType = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #eee;
  width: 100%;
  height: 40px;

  &:focus-visible {
    outline: none;
  }
`;
