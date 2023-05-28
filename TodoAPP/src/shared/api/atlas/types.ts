// export type { ObjectId as TObjectId } from 'mongodb';
// export type { ObjectId as TObjectId } from 'mongodb';

export { BSON } from 'realm-web';

export type TTask = {
  _id: import('realm-web').BSON.ObjectID;
  id: number;
  title: string;
  // userId: number;
  userId: string;
  completed: boolean;
};

export { User as TUser } from 'realm-web';
