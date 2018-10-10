import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Panel } from 'react-bootstrap';
import { compose, withHandlers, withProps, withState } from 'recompose';

import {
  FormatDuration,
  FormatDate,
  ConfirmModal,
} from '../../../../components';

import './styles.css';

export const CourseCardComponent = props => {
  const {
    course: { id, name, description, duration, createDate },
    onRemove,
    modalRef,
    loading,
  } = props;

  return (
    <Panel className="ebs-course-card row">
      <div className="col-sm-10">
        <div className="row">
          <div className="col-sm-3">
            <h3>{name}</h3>
          </div>
          <div className="col-sm-3">
            <FormatDuration duration={duration}>
              {({ formattedDuration }) => formattedDuration}
            </FormatDuration>
          </div>
          <div className="col-sm-offset-4 col-sm-2 text-right">
            <FormatDate date={createDate} />
          </div>
        </div>
        <p>{description}</p>
      </div>
      <div className="col-sm-2">
        <div>
          <Button bsStyle="primary">
            <Link to={`/courses/${id}`}>Edit</Link>
          </Button>
        </div>
        <div className="m-t-sm">
          <Button bsStyle="danger" disabled={loading} onClick={onRemove}>
            Delete
          </Button>
        </div>
      </div>
      <ConfirmModal ref={modalRef} />
    </Panel>
  );
};

CourseCardComponent.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createDate: PropTypes.string.isRequired,
  }),
  onRemove: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  modalRef: PropTypes.shape({ current: PropTypes.shape({}) }).isRequired,
};

export const CourseCard = compose(
  withProps(() => ({
    modalRef: React.createRef(),
  })),
  withState('loading', 'setLoading', false),
  withHandlers({
    onRemove: props => () => {
      const {
        deleteCourse,
        modalRef,
        loading,
        setLoading,
        course: { id },
      } = props;

      modalRef.current.show({
        modalTitle: 'Are you sure want to remove the course?',
        onConfirm: () => {
          if (loading) {
            return;
          }

          setLoading(true);

          deleteCourse(id).then(deleted => {
            if (!deleted) {
              setLoading(false);
            }
          });
        },
      });
    },
  })
)(CourseCardComponent);
