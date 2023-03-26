import type { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import { TTask } from './models';

export type TGetTasksListParams = {
  completed?: boolean;
};

export type TGetTasksListResponse = {
  documents: TTask[];
};

export const getTasksList = (params?: TGetTasksListParams): AxiosPromise<TGetTasksListResponse> => {
  return apiInstance.post('find', {
    filter: {
      ...params,
    },
  });
};

export type TApiGetTaskByIdParams = {
  id: number;
};

export type TGetTaskByIdResponse = {
  document: TTask;
};

export const getTaskById = (params: TApiGetTaskByIdParams): AxiosPromise<TGetTaskByIdResponse> => {
  return apiInstance.post('findOne', {
    filter: {
      ...params,
    },
  });
};

export type TUpdateTaskCompleteStatusParams = {
  id: number;
  completed: boolean;
};

export type TApiUpdateTaskResponse = {
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
