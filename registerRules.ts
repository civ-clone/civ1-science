import action from './Rules/Player/action';
import added from './Rules/Player/added';
import cost from './Rules/Research/cost';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import processYield from './Rules/City/process-yield';
import requirements from './Rules/Research/requirements';
import research from './Rules/Player/research';
import researchComplete from './Rules/Player/research-complete';

ruleRegistryInstance.register(
  ...action(),
  ...added(),
  ...cost(),
  ...processYield(),
  ...requirements(),
  ...research(),
  ...researchComplete()
);
