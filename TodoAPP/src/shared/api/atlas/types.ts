export type { ObjectId as TObjectId } from 'mongodb';

export type TTask = {
  _id: import('mongodb').ObjectId;
  id: number;
  title: string;
  // userId: number;
  userId: string;
  completed: boolean;
};

export { User as TUser } from 'realm-web';
