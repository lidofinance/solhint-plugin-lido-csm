import assert from 'assert';
import { contractWith, multiLine } from 'solhint/test/common/contract-builder';

import { interfaceWith } from '../utils/interface-builder';
import { processStr } from '../utils/parsers';

const config = {
  rules: { 'vars-with-underscore': 'error' },
};

describe('Linter - vars-with-underscore', () => {
  it('should raise an error if a block variable starts with an underscore without state shadowing', () => {
    const code = contractWith('function foo() public { uint _myVar; }');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, `'_myVar' should not start with underscore`);
  });

  it('should raise an error if an argument starts with an underscore without state shadowing', () => {
    const code = contractWith('function foo(uint _myVar) public { }');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, `'_myVar' should not start with underscore`);
  });

  it('should not raise an error if a block variable starts with an underscore because of shadowing', () => {
    const code = contractWith(multiLine('bool public myVar;', 'function foo() public { uint _myVar; }'));
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should not raise an error if an argument starts with an underscore because of shadowing', () => {
    const code = contractWith(multiLine('bool public myVar;', 'function foo(bool _myVar) public { }'));
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should not raise an error if a block variable starts with an underscore because of shadowing of an argument', () => {
    const code = contractWith('function foo(uint myVar) public { uint _myVar; }');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should not raise an error if references a state variable starting with underscore', () => {
    const code = contractWith(multiLine('bool private _myVar;', 'function foo() public { uint _myVar; }'));
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should raise an error if public state variable has leading underscore', () => {
    const code = contractWith('bool public _myVar;');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, `'_myVar' should not start with underscore`);
  });

  it('should raise an error if internal state variable has no leading underscore', () => {
    const code = contractWith('bool internal myVar;');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, `'myVar' should start with underscore`);
  });

  it('should not raise an error for non-public constant or immutable variables with no leading underscore', () => {
    const code = contractWith(
      multiLine(
        'uint internal constant MY_CONST = 1;',
        'uint private constant MY_CONST = 1;',
        'uint internal immutable MY_CONST = 1;',
        'uint private immutable MY_CONST = 1;',
      ),
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });

  it('should not raise any errors inside interfaces', () => {
    const code = interfaceWith(
      'Interface',
      multiLine('bool public _publicBoolVarWithUnderscore;', 'function foo(bool _arg) external;'),
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
