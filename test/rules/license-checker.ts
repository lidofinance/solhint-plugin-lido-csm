import assert from 'assert';
import { processStr } from '../utils/parsers';
import { contractWith, multiLine } from 'solhint/test/common/contract-builder';

const config = {
  rules: { 'license-checker': 'error' },
};

describe('Linter - license-checker', () => {
  it('should raise error for missing SPDX-License-Identifier', () => {
    const code = contractWith('');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, 'SPDX license header is missing');
  });

  it('should not raise error is SPDX-License-Identifier exists', () => {
    const code = multiLine('/*', ' * SPDX-License-Identifier: MIT', ' */', 'contract Test {}');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
