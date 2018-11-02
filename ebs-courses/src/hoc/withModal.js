import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const withModal = WrappedComponent => {
  return class HOC extends Component {
    constructor(props) {
      super(props);

      this.modalContainer = document.getElementById('modal-root');
      this.state = { isVisible: false, modalTitle: '' };
    }

    onConfirmClicked = args => {
      this.onConfirm && this.onConfirm(args);
      this.onConfirm = null;
      this.data = null;
      this.hide();
    };

    show = ({ modalTitle, onConfirm, data }) => {
      this.onConfirm = onConfirm;
      this.data = data;
      this.setState({ isVisible: true, modalTitle });
    };

    hide = () => {
      this.setState({ isVisible: false, modalTitle: '' });
    };

    render() {
      const { modalTitle, isVisible } = this.state;

      const componentProps = {
        ...this.props,
        modalTitle,
        isVisible,
        data: this.data,
        onConfirm: this.onConfirmClicked,
        onCancel: this.hide,
      };

      return ReactDOM.createPortal(
        <WrappedComponent {...componentProps} />,
        this.modalContainer
      );
    }
  };
};
