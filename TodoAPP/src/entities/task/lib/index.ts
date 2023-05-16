export const getTaskStatus = (completed: boolean) => {
  return completed ? 'CLOSED' : 'OPENED';
};
