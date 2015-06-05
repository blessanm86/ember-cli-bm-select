## 0.1.2 (2015-06-05)
  - Added `demoURL` to package.json to enable demo listing in emberaddons.com and emberobserver.com


## 0.1.1 (2015-05-06)

Bugfixes:

  - [#7](https://github.com/blessenm/ember-cli-bm-select/pull/7) - Don't break when an event isn't passed in. ([@jkatsnelson](https://github.com/jkatsnelson))
  - [#8](https://github.com/blessenm/ember-cli-bm-select/pull/8) - Dont throw error when there is no element. ([@jkatsnelson](https://github.com/jkatsnelson))
  - Upgraded addon to ember-cli 0.2.3.

## 0.1.0 (2015-01-31)

Features:

  - [#6](https://github.com/blessenm/ember-cli-bm-select/pull/6) - Now options can be disabled by setting the `isDiabled` option to true for `bm-option`.

Documentation:
  - Added documentation relating to disabling options.

## 0.0.2 (2015-01-01)

Bugfixes:

  - Options menu now closes when clicked outside of the select box. (#5)
  - Placeholder option can now be added. (#4)

## 0.0.1 (2014-12-07)

Bugfixes:

  - Selected option is now focussed when dropdown is opened via click. (#1)
  - When there is no selected option, the first option is focussed. (#2)
  - The focus is retained when the dropdown is closed. (#3)
  - The default action is only prevented for keydown events that are handled.
  - The data is set as the same as value in bm-option when the value is specified.
  - Fixed an issue where bm-options component was using the same instance of options.

Documentation:
  - Added comments to the component files.

## 0.0.0 (2014-12-03)
  - Initial release
