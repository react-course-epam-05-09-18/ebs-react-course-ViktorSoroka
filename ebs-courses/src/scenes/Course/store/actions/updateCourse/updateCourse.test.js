import sinon from 'sinon';

import { updateCourseCreator } from './updateCourse';

describe('updateCourse', () => {
  let updateCourse;

  const updateCoursePayload = 'updateCoursePayload';

  const api = {
    updateCourse: sinon.stub(),
  };

  const history = {
    push: sinon.stub(),
  };

  const updateCourseInProgress = sinon.stub();
  const updateCourseSuccess = sinon.stub();
  const updateCourseFail = sinon.stub();
  const dispatchMock = sinon.stub();

  beforeAll(() => {
    updateCourse = updateCourseCreator({
      api,
      history,
      updateCourseInProgress,
      updateCourseSuccess,
      updateCourseFail,
    })(updateCoursePayload);
  });

  afterEach(() => {
    api.updateCourse.resetHistory();
    history.push.resetHistory();
    dispatchMock.resetHistory();
  });

  describe('when response is succeeded', () => {
    beforeEach(() => {
      api.updateCourse.resolves();

      updateCourse(dispatchMock);
    });

    it('should call updateCourseInProgress', () => {
      expect(updateCourseInProgress.calledOnce).toBe(true);
    });

    it('should call updateCourse from api', () => {
      expect(api.updateCourse.calledOnce).toBe(true);
    });

    it('should call updateCourse with payload', () => {
      expect(api.updateCourse.calledWith(updateCoursePayload)).toBe(true);
    });

    it('should call updateCourseSuccess on success response', () => {
      expect(updateCourseSuccess.calledWith()).toBe(true);
    });

    it('should redirect', () => {
      expect(history.push.calledOnce).toBe(true);
    });

    it('should redirect to the courses page', () => {
      expect(history.push.calledWith('/courses')).toBe(true);
    });

    it('should call dispatchMock twice', () => {
      expect(dispatchMock.calledTwice).toBe(true);
    });
  });

  describe('when response is errored', () => {
    beforeEach(() => {
      api.updateCourse.rejects(new Error('Error'));

      updateCourse(dispatchMock);
    });

    it('should call updateCourseFail', () => {
      expect(updateCourseFail.calledOnce).toBe(true);
    });

    it('should call updateCourseFail with error message', () => {
      expect(updateCourseFail.calledWith('Error')).toBe(true);
    });
  });
});
