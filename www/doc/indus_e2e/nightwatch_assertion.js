exports.assertion = function(selector, count) {
  this.message = `Testing if elements ${selector} has count: ${count}`;
  this.expected = count;

  this.pass = val => val === this.expected;
  this.value = res => res.value.length;
  this.command = callback => this.api.elements(
    this.client.locateStrategy, selector, callback);
};
