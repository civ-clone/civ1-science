import action from './Rules/Player/action';
import added from './Rules/Player/added';
import captured from './Rules/City/captured';
import cost from './Rules/Research/cost';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import processYield from './Rules/City/process-yield';
import requirements from './Rules/Research/requirements';
import research from './Rules/Player/research';
import researchComplete from './Rules/Player/research-complete';

ruleRegistryInstance.register(
  ...action(),
  ...added(),
  ...captured(),
  ...cost(),
  ...processYield(),
  ...requirements(),
  ...research(),
  ...researchComplete()
);
