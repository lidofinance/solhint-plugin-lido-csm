import BaseChecker from 'solhint/lib/rules/base-checker';
import { tokenize } from '@solidity-parser/parser';

const ruleId = 'license-checker';
const meta = {
  type: 'best-practices',
  docs: {
    description: 'License header should be included in every file',
    category: 'Style Guide Rules',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: [],
};

export class LicenseChecker extends BaseChecker implements Rule {
  comments: Token[] = [];

  constructor(reporter: any, config: any, inputStr: string) {
    super(reporter, ruleId, meta);
    // Make it once again because `tokens` are not passed to plugin rules
    const tokens = tokenize(inputStr, { loc: true });
    this.comments = this.parseComments(tokens);
  }

  'SourceUnit:exit'() {
    for (const comment of this.comments) {
      if (comment.value.includes('SPDX-License-Identifier')) return;
    }

    this.errorAt(0, 0, 'SPDX license header is missing');
  }

  parseComments(tokens: Token[]) {
    return tokens.filter((token) => token.type === 'Keyword' && /^(\/\/|\/\*)/.test(token.value));
  }
}
