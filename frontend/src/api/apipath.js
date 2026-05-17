export const BASE_URL = process.env.REACT_APP_API_URL;

export const API_PATHS = {
    AUTH: {
        LOGIN: `${BASE_URL}/api/auth/login`,
        REGISTER: `${BASE_URL}/api/auth/register`,
    },
    TASK: {
        GET_TASKS: `${BASE_URL}/api/tasks`,
        CREATE_TASK: `${BASE_URL}/api/tasks`,
        GET_TASK_BY_ID: (taskId) => `${BASE_URL}/api/tasks/${taskId}`,
        UPDATE_TASK: (taskId) => `${BASE_URL}/api/tasks/${taskId}`,
        DELETE_TASK: (taskId) => `${BASE_URL}/api/tasks/${taskId}`,
    },
};