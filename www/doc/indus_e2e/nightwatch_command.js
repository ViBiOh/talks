module.exports.command = function(selector, value) {
  const browser = this;

  const cleanInputs = [browser.Keys.END];
  browser.getValue(selector, result => {
    for (let i = 0; i < result.value.length; i += 1) {
      cleanInputs.push(browser.Keys.BACK_SPACE);
    }
  });

  browser
    .sendKeys(selector, cleanInputs).setValue(selector, value);

  return this;
};