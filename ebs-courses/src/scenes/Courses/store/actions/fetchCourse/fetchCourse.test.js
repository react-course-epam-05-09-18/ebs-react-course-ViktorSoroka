import sinon from 'sinon';

import { fetchCoursesCreator } from './fetchCourse';

describe('fetchCourse', () => {
  let fetchCourses;

  const fetchCoursesPayload = 'fetchCoursesPayload';
  const fetchCoursesData = 'fetchCoursesData';

  const api = {
    fetchCourses: sinon.stub(),
  };

  const fetchCoursesInProgress = sinon.stub();
  const fetchCoursesSuccess = sinon.stub();
  const fetchCoursesFail = sinon.stub();
  const dispatchMock = sinon.stub();

  beforeAll(() => {
    fetchCourses = fetchCoursesCreator({
      api,
      fetchCoursesInProgress,
      fetchCoursesSuccess,
      fetchCoursesFail,
    })(fetchCoursesPayload);
  });

  afterEach(() => {
    api.fetchCourses.resetHistory();
    dispatchMock.resetHistory();
  });

  describe('when response is succeeded', () => {
    beforeEach(() => {
      api.fetchCourses.resolves(fetchCoursesData);

      fetchCourses(dispatchMock);
    });

    it('should call callback to inform that request is in progress', () => {
      expect(fetchCoursesInProgress.calledOnce).toBe(true);
    });

    it('should call API to fetch courses', () => {
      expect(api.fetchCourses.calledOnce).toBe(true);
    });

    it('should call API to fetch courses with payload', () => {
      expect(api.fetchCourses.calledWith(fetchCoursesPayload)).toBe(true);
    });

    it('should call success callback with response data', () => {
      expect(fetchCoursesSuccess.calledWith(fetchCoursesData)).toBe(true);
    });

    it('should call dispatchMock once', () => {
      expect(dispatchMock.calledTwice).toBe(true);
    });
  });

  describe('when response is errored', () => {
    beforeEach(() => {
      api.fetchCourses.rejects(new Error('Error'));

      fetchCourses(dispatchMock);
    });

    it('should call error callback', () => {
      expect(fetchCoursesFail.calledOnce).toBe(true);
    });

    it('should call error callback with error message', () => {
      expect(fetchCoursesFail.calledWith('Error')).toBe(true);
    });
  });
});
