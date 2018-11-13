module.exports = {
  beforeEach: function(browser) {
    browser
      .maximizeWindow()
      .deleteCookies()
      .changeDispatcher(100);
  },
  'Page loads with analytics': function(browser) {
    const EstimaForm = browser.page.EstimaForm();

    EstimaForm
      .navigate()
      .waitForElementVisible('body', browser.globals.pageLoadTimeout, true);
    browser.compareScreenshot();

    EstimaForm.expect.element('@wrapper').to.be.visible;
    browser.verify.ga('event', 'Estima', 'form:landed', 'from:external');
  },
  after: browser => browser.end(),
};
