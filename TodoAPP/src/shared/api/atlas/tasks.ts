import { SERVICE_NAME, DATABASE_NAME, DATABASE_COLLECTION } from 'shared/config';
import { atlasApiInstance } from './base';
import { TTask, BSON } from './types';

export const getDataCollection = () => {
  if (!atlasApiInstance?.currentUser) {
    return null;
  }
  const mongo = atlasApiInstance.currentUser.mongoClient(SERVICE_NAME);
  const collection = mongo.db(DATABASE_NAME).collection<TTask>(DATABASE_COLLECTION);
  return collection;
};

export const getTasksList = () => {
  return getDataCollection()?.find();
};

type TApiGetTaskByIdParams = {
  id: number;
};

export const getTaskById = (params: TApiGetTaskByIdParams) => {
  return getDataCollection()?.findOne({ ...params });
};

type TApiGetTaskByOidParams = {
  _id: BSON.ObjectID;
};

export const getTaskByOid = (params: TApiGetTaskByOidParams) => {
  return getDataCollection()?.findOne({ ...params });
};

type TUpdateTaskCompleteStatusParams = {
  id: number;
  completed: boolean;
};

export const updateTaskCompleteStatus = ({ id, completed }: TUpdateTaskCompleteStatusParams) => {
  return getDataCollection()?.updateOne({ id }, { $set: { completed } });
};

type TCreateTaskParams = Pick<TTask, 'title' | 'userId'>;

export const addTask = ({ title, userId }: TCreateTaskParams) => {
  return getDataCollection()?.insertOne({
    id: -1,
    title,
    completed: false,
    userId,
  });
};

type TDeleteTaskParams = {
  id: number;
};

export const deleteTask = (params: TDeleteTaskParams) => {
  return getDataCollection()?.deleteOne({ ...params });
};
