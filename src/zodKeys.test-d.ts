import { expectType } from 'tsd';
import { zodKeys } from './zodKeys';
import { ttest1, ttest2, ttest3, ttest4 } from './zodKeys.fixtures';

expectType<string[]>(zodKeys(ttest1));
expectType<('age' | 'login')[]>(zodKeys(ttest2));
expectType<('_id' | 'data.age' | 'data.login')[]>(zodKeys(ttest3));
expectType<
  (
    | 'data.age'
    | 'data.login'
    | 'stats'
    | 'data.sub.helpers.age'
    | 'data.sub.helpers.login'
    | 'data.sub.strs'
    | 'otherNumb'
    | '_id'
  )[]
>(zodKeys(ttest4));
