# Lido Community Staking Module solhint Plugin

![Tests](https://github.com/lidofinance/solhint-plugin-lido-csm/actions/workflows/unit-tests.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/lidofinance/solhint-plugin-lido-csm/blob/main/LICENSE)

## Overview

This custom solhint Plugin aims to contain all the Solidity best practices and style guide of Community Staking
Module team.

## Setup

[Setup solhint](https://protofire.github.io/solhint/#installation) in your Solidity project if you haven't already. Then run:

```sh
yarn add -D https://github.com/lidofinance/solhint-plugin-lido-csm#main
```

or

```sh
npm install --save-dev https://github.com/lidofinance/solhint-plugin-lido-csm#main
```

Finally, inside your `.solhint.json` configuration file, add:

```
"plugins": [..., "lido-csm"],
```

## Available Rules

| Name                      | Description                                                                      |
| ------------------------- | -------------------------------------------------------------------------------- |
| `contract-ordering`       | Contracts storage members should be ordered.                                     |
| `enum-name-camelcase`     | Enums name should be in CamelCase.                                               |
| `interface-member-order`  | Interfaces members should be ordered: events, errors, structs, enums, functions. |
| `interface-starts-with-i` | Interfaces name should start with `I`. Example: `IMyContract`.                   |
| `struct-name-camelcase`   | Structs name should be in CamelCase.                                             |
| `vars-with-underscore`    | Set of rules to check underscored variables                                      |
| `license-checker`         | Checks that SPDX-License-Identifier is included                                  |

## Credits

- [DeFi Wonderland](https://defi.sucks)
