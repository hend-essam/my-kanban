"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://699e758178dda56d396a4cb8.mockapi.io/api/v1";

export const useBoardData = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(BASE_URL + "/tasks");
      return data;
    },
  });

  const addTask = useMutation({
    mutationFn: (newTask) => axios.post(`${BASE_URL}/tasks`, newTask),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateTask = useMutation({
    mutationFn: ({ id, updates }) =>
      axios.put(`${BASE_URL}/tasks/${id}`, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTask = useMutation({
    mutationFn: (id) => axios.delete(`${BASE_URL}/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(BASE_URL + "/categories");
      return data;
    },
  });

  return {
    tasks,
    categories,
    tasksLoading,
    categoriesLoading,
    addTask,
    updateTask,
    deleteTask,
  };
};
