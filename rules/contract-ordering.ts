import BaseChecker from 'solhint/lib/rules/base-checker';

const ruleId = 'contract-ordering';
const meta = {
  type: 'best-practices',
  docs: {
    description: 'Contracts members should be ordered.',
    category: 'Best Practices',
  },
  isDefault: true,
  recommended: true,
  defaultSetup: 'warn',
  schema: [],
};

export class ContractOrderingChecker extends BaseChecker implements Rule {
  constructor(reporter: any) {
    super(reporter, ruleId, meta);
  }

  ContractDefinition(node: any) {
    if (node.kind !== 'contract') return;
    const children = [];

    for (const child of node.subNodes) {
      if (child.type === 'StateVariableDeclaration') {
        children.push(...child.variables);
        continue;
      }

      // Skip nodes with no defined weight
      if (isNaN(this._nodeWeight(child))) {
        continue;
      }

      children.push(child);
    }

    for (const [index, child] of children.slice(1).entries()) {
      const prevNodeWeight = this._nodeWeight(children[index]);
      const nodeWeight = this._nodeWeight(child);
      if (nodeWeight < prevNodeWeight) {
        this.error(
          child,
          `Declaration of ${this._nodeLabel(child)} ${child.name} should go before ${this._nodeLabel(
            children[index],
          )}s definitions.`,
        );
        return;
      }
    }
  }

  _nodeWeight(node: any) {
    switch (node.type) {
      case 'VariableDeclaration':
        if (node.isDeclaredConst) {
          return 10;
        }
        if (node.isImmutable) {
          return 15;
        }
        if (node.isStateVar) {
          return 20;
        }
        // Skip local variables
        return NaN;
      case 'EventDefinition':
        return 30;
      case 'CustomErrorDefinition':
        return 40;
      case 'FunctionDefinition':
        return 50;
      case 'ModifierDefinition':
        return 60;
      default:
        return NaN;
    }
  }

  _nodeLabel(node: any) {
    switch (node.type) {
      case 'VariableDeclaration':
        if (node.isDeclaredConst) {
          return 'constant';
        }
        if (node.isImmutable) {
          return 'immutable variable';
        }
        if (node.isStateVar) {
          return 'state variable';
        }
        return 'variable';
      case 'EventDefinition':
        return 'event';
      case 'CustomErrorDefinition':
        return 'error';
      case 'FunctionDefinition':
        return 'function';
      case 'ModifierDefinition':
        return 'modifier';
      default:
        return 'unknown';
    }
  }
}
