export const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: block;
  }
`);
