// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// fix issue with testing canvas
import 'jest-canvas-mock';

// mock out window function for testing components that require Plotly
window.URL.createObjectURL = () => {}