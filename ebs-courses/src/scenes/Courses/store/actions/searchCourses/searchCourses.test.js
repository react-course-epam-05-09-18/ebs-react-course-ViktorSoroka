import sinon from 'sinon';

import { searchCoursesCreator } from './searchCourses';

describe('searchCourses', () => {
  let searchCourses;

  const searchCoursesPayload = 'searchCourses';

  const history = {
    push: sinon.stub(),
  };

  beforeEach(() => {
    searchCourses = searchCoursesCreator({
      history,
    })(searchCoursesPayload);

    searchCourses();
  });

  afterEach(() => {
    history.push.resetHistory();
  });

  it('should redirect', () => {
    expect(history.push.calledOnce).toBe(true);
  });

  it('should redirect with to the Courses page with the query search value which is provided as payload', () => {
    expect(
      history.push.calledWithExactly({
        pathname: '/courses',
        search: '?search=' + searchCoursesPayload,
      })
    ).toBe(true);
  });
});
