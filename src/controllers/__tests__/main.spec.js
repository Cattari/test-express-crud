const { healthCheck } = require('../main');

describe('Main Controller', () => {
  describe('healtCheck', () => {
    const spy = jest.fn();

    healthCheck({}, { json: spy });

    it('should return health check response', () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
