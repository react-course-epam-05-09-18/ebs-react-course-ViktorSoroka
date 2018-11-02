import sinon from 'sinon';

import { deleteCourseCreator } from './deleteCourse';

describe('deleteCourse', () => {
  let deleteCourse;

  const deleteCoursePayload = 'deleteCoursePayload';

  const api = {
    deleteCourse: sinon.stub(),
  };

  const deleteCourseSuccess = sinon.stub();
  const deleteCourseFail = sinon.stub();
  const dispatchMock = sinon.stub();

  beforeAll(() => {
    deleteCourse = deleteCourseCreator({
      api,
      deleteCourseSuccess,
      deleteCourseFail,
    })(deleteCoursePayload);
  });

  afterEach(() => {
    api.deleteCourse.resetHistory();
    dispatchMock.resetHistory();
  });

  describe('when response is succeeded', () => {
    beforeEach(() => {
      api.deleteCourse.resolves();

      deleteCourse(dispatchMock);
    });

    it('should call API to delete course', () => {
      expect(api.deleteCourse.calledOnce).toBe(true);
    });

    it('should call API to delete course with payload', () => {
      expect(api.deleteCourse.calledWith(deleteCoursePayload)).toBe(true);
    });

    it('should call success callback with response data', () => {
      expect(deleteCourseSuccess.calledWith(deleteCoursePayload)).toBe(true);
    });

    it('should call dispatchMock once', () => {
      expect(dispatchMock.calledOnce).toBe(true);
    });
  });

  describe('when response is errored', () => {
    beforeEach(() => {
      api.deleteCourse.rejects(new Error('Error'));

      deleteCourse(dispatchMock);
    });

    it('should call error callback', () => {
      expect(deleteCourseFail.calledOnce).toBe(true);
    });

    it('should call error callback with error message', () => {
      expect(deleteCourseFail.calledWith('Error')).toBe(true);
    });
  });
});
