import { ContractOrderingChecker } from './contract-ordering';
import { EnumNameCamelCaseChecker } from './enum-name-camelcase';
import { InterfaceMemberOrderChecker } from './interface-member-order';
import { InterfaceStartsWithIChecker } from './interface-starts-with-i';
import { StructNameCamelCaseChecker } from './struct-name-camelcase';
import { VarsWithUnderscoreChecker } from './vars-with-underscore';
import { LicenseChecker } from './license-checker';

const rules: typeof Rule[] = [
  EnumNameCamelCaseChecker,
  InterfaceMemberOrderChecker,
  InterfaceStartsWithIChecker,
  VarsWithUnderscoreChecker,
  StructNameCamelCaseChecker,
  ContractOrderingChecker,
  LicenseChecker,
];

export = rules;
