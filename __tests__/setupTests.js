/* @flow */

/**
 * Validation method for array of custom objects
 * @type {Any}
 */
expect.extend({
  toBeArrayOf(received, argument) {
    const pass = received.reduce((a, b) => a && (b instanceof argument), true);
    if (pass) {
      return {
        message: () => (
          `expected ${JSON.stringify(received)} to be an array of ${argument}`
        ),
        pass: true,
      };
    } else {
      return {
        message: () => (`expected ${JSON.stringify(received)} not to be an array of ${argument}`),
        pass: false,
      };
    }
  }
});
