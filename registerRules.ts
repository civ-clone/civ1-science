import action from './Rules/Player/action';
import added from './Rules/Player/added';
import captured from './Rules/City/captured';
import complete from './Rules/Research/complete';
import cost from './Rules/Research/cost';
import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import processYield from './Rules/City/process-yield';
import requirements from './Rules/Research/requirements';
import started from './Rules/Research/started';

ruleRegistryInstance.register(
  ...action(),
  ...added(),
  ...captured(),
  ...complete(),
  ...cost(),
  ...processYield(),
  ...requirements(),
  ...started()
);
