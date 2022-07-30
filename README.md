[![Continuous Testing](https://github.com/Maps4HTML/mapml-extension/actions/workflows/ci-testing.yml/badge.svg)](https://github.com/Maps4HTML/mapml-extension/actions/workflows/ci-testing.yml) [![CodeQL](https://github.com/Maps4HTML/mapml-extension/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Maps4HTML/mapml-extension/actions/workflows/codeql-analysis.yml)

# mapml-extension
Source code for the MapML Browser Extension

## Installing from the source code

1. Run `grunt` from the root of this project to create a build within `/build` directory
2. Load extension in your browser:
   - In Chrome:
      1. Go to [chrome://extensions/](chrome://extensions/)
      2. On that same page, click the `Load upacked` button, navigate to the `/build/chrome` folder in the root of this repository
   - In Firefox:
      1. Go to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
      2. Click on "Load temporary addon..."
      3. Select `/build/firefox/manifest.json` file
3. Now the extension is installed and can be refreshed easily for development
