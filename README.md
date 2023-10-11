# Lido Community Staking Module Solhint Plugin

[![image](https://img.shields.io/npm/v/solhint-plugin-lido-csm.svg?style=flat-square)](https://www.npmjs.org/package/solhint-plugin-lido-csm)
![Tests](https://github.com/lidofinance/solhint-plugin-lido-csm/actions/workflows/unit-tests.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/lidofinance/solhint-plugin-lido-csm/blob/main/LICENSE)

## Overview

This custom Solhint Plugin aims to contain all of the Solidity best practices and style guide of Community Staking
Module team.

## Setup

[Setup Solhint](TODO) in your Solidity project if you haven't already. Then run:

```sh
yarn add -D solhint-plugin-lido-csm
```

or

```sh
npm install --save-dev solhint-plugin-lido-csm
```

Finally, inside your `.solhint.json` configuration file, add:

```
"plugins": [..., "lido-csm"],
```

## Available Rules

| Name                                | Description                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `contract-data-order`               | Contracts storage members should be ordered: constants, immutable variables, others. |
| `enum-name-camelcase`               | Enums name should be in CamelCase.                                                   |
| `immutable-name-snakecase`          | Immutable variables names should be in capitalized SNAKE_CASE.                       |
| `import-statement-format`           | Imports should specify imported node. Example: `import {A} from 'b.sol'`             |
| `interface-member-order`            | Interfaces members should be ordered: events, errors, structs, enums, functions.     |
| `interface-starts-with-i`           | Interfaces name should start with `I`. Example: `IMyContract`.                       |
| `named-return-values`               | Functions return values should be named.                                             |
| `non-state-vars-leading-underscore` | Variables that are not in the state should start with underscore. Example: `_myVar`. |
| `struct-name-camelcase`             | Structs name should be in CamelCase.                                                 |
| `wonder-var-name-mixedcase`         | Public variables name must be in mixedCase.                                          |

## Credits

- [DeFi Wonderland](https://defi.sucks)
