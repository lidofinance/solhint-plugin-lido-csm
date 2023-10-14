import assert from 'assert';
import { processStr } from '../utils/parsers';
import { contractWith, multiLine } from 'solhint/test/common/contract-builder';

const config = {
  rules: { 'contract-ordering': 'error' },
};

describe('Linter - contract-ordering', () => {
  it('should raise error when state var stands before a constant', () => {
    const code = contractWith('uint public a; uint constant b;');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, 'Declaration of constant b should go before state variables definitions.');
  });

  it('should raise an error when a state variable stands before an immutable', () => {
    const code = contractWith('uint public a; uint immutable b;');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(
      report.messages[0].message,
      'Declaration of immutable variable b should go before state variables definitions.',
    );
  });

  it('should raise an error when an immutable stands before a constant', () => {
    const code = contractWith('uint immutable b; uint constant c;');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(
      report.messages[0].message,
      'Declaration of constant c should go before immutable variables definitions.',
    );
  });

  it('should raise an error when an event stands before a state variable', () => {
    const code = contractWith('event MyEvent(); uint public a;');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, 'Declaration of state variable a should go before events definitions.');
  });

  it('should raise an error when a custom error stands before an event', () => {
    const code = contractWith('error SomeError(); event MyEvent();');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, 'Declaration of event MyEvent should go before errors definitions.');
  });

  it('should raise an error when a function stands before a custom error', () => {
    const code = contractWith('function foo() {} error SomeError();');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, 'Declaration of error SomeError should go before functions definitions.');
  });

  it('should raise an error when a function stands before an error', () => {
    const code = contractWith('modifier bar() {} function foo() {}');
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.equal(report.messages[0].message, 'Declaration of function foo should go before modifiers definitions.');
  });

  it('should not raise an error when contract members are in the correct order', () => {
    const code = contractWith(
      multiLine(
        'uint constant a;',
        'uint immutable c;',
        'uint public b;',
        'event MyEvent();',
        'error SomeError();',
        'function foo() {}',
        'modifier bar() {}',
      ),
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
