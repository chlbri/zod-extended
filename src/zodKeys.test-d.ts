import { expectType } from 'tsd';
import { zodObjectKeys } from './zodKeys';
import { ttest1, ttest2, ttest3, ttest4 } from './zodKeys.fixtures';

expectType<[]>(zodObjectKeys(ttest1));
expectType<['age', 'login']>(zodObjectKeys(ttest2));
expectType<['_id', 'data.age', 'data.login']>(zodObjectKeys(ttest3));
expectType<
  [
    '_id',
    'data.age',
    'data.login',
    'stats',
    'otherNumb',
    'data.sub.helpers.age',
    'data.sub.helpers.login',
    'data.sub.strs',
  ]
>(zodObjectKeys(ttest4));
