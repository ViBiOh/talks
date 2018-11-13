module.exports = {
  url: `${process.env.E2E_URL}/estimation-immobiliere/form`,
  props: {},
  commands: [],
  elements: {
    wrapper: '[data-form-wrapper]',
    submit: '[data-submit]',
    errors: '.field-error',
  },
  sections: {
    Address: {
      selector: '[data-step-address]',
      elements: {
        zip: { selector: '#zip' },
      },
    },
  },
};