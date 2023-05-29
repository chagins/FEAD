import { APP_ID } from 'shared/config';
import * as realm from 'realm-web';

export const atlasApiInstance = new realm.App({ id: APP_ID });
