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
  const collection = getDataCollection();

  if (!collection) {
    return null;
  }

  return collection.find();
};

type TApiGetTaskByIdParams = {
  id: number;
};

export const getTaskById = (params: TApiGetTaskByIdParams) => {
  const collection = getDataCollection();

  if (!collection) {
    return null;
  }

  return collection.findOne({
    filter: {
      ...params,
    },
  });
};

type TApiGetTaskByOidParams = {
  // _id: TObjectId;
  _id: BSON.ObjectID;
};

export const getTaskByOid = (params: TApiGetTaskByOidParams) => {
  const collection = getDataCollection();

  if (!collection) {
    return null;
  }

  return collection.findOne({ ...params });
};

type TUpdateTaskCompleteStatusParams = {
  id: number;
  completed: boolean;
};

export const updateTaskCompleteStatus = ({ id, completed }: TUpdateTaskCompleteStatusParams) => {
  const collection = getDataCollection();

  if (!collection) {
    return null;
  }

  return collection.updateOne({ id }, { $set: { completed } });
};

type TCreateTaskParams = Pick<TTask, 'title' | 'userId'>;

export const addTask = ({ title, userId }: TCreateTaskParams) => {
  const collection = getDataCollection();

  if (!collection) {
    return null;
  }

  return collection.insertOne({
    id: -1,
    title,
    completed: false,
    userId,
  });
};
