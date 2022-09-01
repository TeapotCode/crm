import 'jest-preset-angular/setup-jest';

jest.spyOn(window.console, 'warn').mockImplementation(() => jest.fn());
jest.spyOn(window.console, 'error').mockImplementation(() => jest.fn());
