import { atlasApiInstance } from './base';
import { TTask, TObjectId } from './types';

export const getDataCollection = () => {
  if (!atlasApiInstance?.currentUser) {
    return null;
  }
  const mongo = atlasApiInstance.currentUser.mongoClient('DBCluster0');
  const collection = mongo.db('TodoApp').collection<TTask>('Tasks');
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
  _id: TObjectId;
};

export const getTaskByOid = (params: TApiGetTaskByOidParams) => {
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

export const createTask = ({ title, userId }: TCreateTaskParams) => {
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
