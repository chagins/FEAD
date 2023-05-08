import type { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import { TTask } from './types';

type TGetTasksListParams = {
  completed?: boolean;
};

type TGetTasksListResponse = {
  documents: TTask[];
};

export const getTasksList = (params?: TGetTasksListParams): AxiosPromise<TGetTasksListResponse> => {
  return apiInstance.post('find', {
    filter: {
      ...params,
    },
  });
};

type TApiGetTaskByIdParams = {
  id: number;
};

type TGetTaskByIdResponse = {
  document: TTask;
};

export const getTaskById = (params: TApiGetTaskByIdParams): AxiosPromise<TGetTaskByIdResponse> => {
  return apiInstance.post('findOne', {
    filter: {
      ...params,
    },
  });
};

type TUpdateTaskCompleteStatusParams = {
  id: number;
  completed: boolean;
};

type TApiUpdateTaskResponse = {
  matchedCount: number;
  modifiedCount: number;
};

export const updateTaskCompleteStatus = ({
  id,
  completed,
}: TUpdateTaskCompleteStatusParams): AxiosPromise<TApiUpdateTaskResponse> => {
  return apiInstance.post('updateOne', {
    filter: {
      id,
    },
    update: {
      $set: {
        completed,
      },
    },
  });
};
