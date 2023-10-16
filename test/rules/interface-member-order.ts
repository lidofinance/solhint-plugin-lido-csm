import assert from 'assert';
import { processStr } from '../utils/parsers';
import { interfaceWith } from '../utils/interface-builder';

const config = {
  rules: { 'interface-member-order': 'error' },
};

const interfaceName = 'ITest';
const errorMessage = `The order of members in the interface ${interfaceName} interfaces should be: Events, Errors, Enums, Structs, Functions`;

describe('Linter - interface-member-order', () => {
  it('should raise error when errors first than events', () => {
    const code = interfaceWith(
      interfaceName,
      `
        error TestError(); error TestError2(); 
        event TestEvent(); event TestEvent2();
      `,
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == errorMessage);
  });

  it('should raise error when structs first than errors', () => {
    const code = interfaceWith(
      interfaceName,
      `
        struct TestStruct { uint256 data; } struct TestStruct2 { uint256 data; }
        error Error(); error Error2();
      `,
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == errorMessage);
  });

  it('should raise error when structs first than enums', () => {
    const code = interfaceWith(
      interfaceName,
      `
        struct TestStruct { uint256 data; } struct TestStruct2 { uint256 data; }
        enum TestEnum { A, B } enum TestEnum2 { A, B }
      `,
    );
    const report = processStr(code, config);
    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == errorMessage);
  });

  it('should raise error when functions first than structs', () => {
    const code = interfaceWith(
      interfaceName,
      `
        function testFunction(){} function testFunction2(){}
        struct TestStruct { uint256 data; } struct TestStruct2 { uint256 data; }
      `,
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == errorMessage);
  });

  it('should raise an error when function first than enums', () => {
    const code = interfaceWith(
      interfaceName,
      `
        function testFunction(){} function testFunction2(){} 
        enum TestEnum { A, B } enum TestEnum2 { A, B }
      `,
    );
    const report = processStr(code, config);
    assert.equal(report.errorCount, 1);
    assert.ok(report.messages[0].message == errorMessage);
  });

  it('should not raise error for interface member order events, errors, enums, structs, and functions', () => {
    const code = interfaceWith(
      interfaceName,
      `
        event TestEvent(); event TestEvent2();
        error TestError(); error TestError2();
        enum TestEnum { A, B } enum TestEnum2 { A, B }
        struct TestStruct { uint256 data; } struct TestStruct2 { uint256 data; }
        function testFunction(){} function testFunction2(){}
      `,
    );
    const report = processStr(code, config);

    assert.equal(report.errorCount, 0);
  });
});
