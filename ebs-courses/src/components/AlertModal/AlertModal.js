import React from 'react';
import PropTypes from 'prop-types';

import { withModal } from '../../hoc';

const modalStyles = { display: 'block' };

function AlertModalComponent(props) {
  const { isVisible, modalTitle, onCancel } = props;

  return (
    isVisible && (
      <div role="dialog">
        <div className="fade modal-backdrop in" />
        <div className="modal fade in" style={modalStyles}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">{modalTitle}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onCancel}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

AlertModalComponent.propTypes = {
  isVisible: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCancel: PropTypes.func,
  data: PropTypes.object,
};

export const AlertModal = withModal(AlertModalComponent);
