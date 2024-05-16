import { expectType } from 'tsd';
import { zodObjectKeys } from './zodKeys';
import { ttest1, ttest2, ttest3, ttest4 } from './zodKeys.fixtures';

expectType<string[]>(zodObjectKeys(ttest1));
expectType<('age' | 'login')[]>(zodObjectKeys(ttest2));
expectType<('_id' | 'data.age' | 'data.login')[]>(zodObjectKeys(ttest3));
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
>(zodObjectKeys(ttest4));
