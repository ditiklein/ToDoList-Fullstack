import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5080";
axios.interceptors.response.use(
  response => response,
  error => {
    if (process.env.NODE_ENV === "development") {
      console.error("Axios Response Error:", error.response ? error.response.data : error.message);
    }
    return Promise.reject(error);
  }
);


export default {
  getTasks: async () => {
    try {
      const result = await axios.get('/tasks');
      return Array.isArray(result.data) ? result.data : [];  
    } catch (error) {
      return [];
    }
  },
  addTask: async (name) => {
    try {
      const newTask = { name, isComplete: false };
      const result = await axios.post('/tasks', newTask, 
      );
      return result.data;
    } catch (error) {
      return null;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`/tasks/${id}`, { id, isComplete }
      );
      return result.data;
    } catch (error) {
      return null;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
};
