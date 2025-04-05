import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Itask } from "../types";
// import swal from "sweetalert";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Itask[]>([]);
  const id = ref<number | null>(null);
  const boxModal = ref<boolean>(false);

  const newTask = ref<Itask>({
    title: "",
    description: "",
    is_favorita: false,
    priority: "Baixa",
    duedata: "",
    is_complete: false,
  });

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8081/tasks");
      tasks.value = data;
      localStorage.setItem("tasksStorage", JSON.stringify(data));
    } catch (error) {
      console.error(
        "Não foi possível carregar as tarefas. Tente novamente.",
        error
      );
    }
  };

  const findTaskById = async (
    taskId: number | undefined
  ): Promise<Itask | null> => {
    try {
      const storedTasks = localStorage.getItem("tasksStorage");

      if (storedTasks) {
        const taskList: Itask[] = JSON.parse(storedTasks);
        const foundTask = taskList.find((task) => task.task_id === taskId);

        if (foundTask) {
          Object.assign(newTask.value, foundTask);
          console.log("Tarefa encontrada no localStorage:", foundTask);
          return foundTask;
        }
      }

      const { data: dataTask } = await axios.get(
        `http://127.0.0.1:8081/tasks/${taskId}`
      );

      if (dataTask) {
        Object.assign(newTask.value, dataTask);
        console.log("Tarefa encontrada na API:", dataTask);
        return dataTask;
      } else {
        console.warn(`Nenhuma tarefa encontrada com o ID ${taskId}`);
        return null;
      }
    } catch (error) {
      console.error(`Erro ao buscar a tarefa com o ID ${taskId}:`, error);
      return null;
    }
  };

  const tasksFav = computed(() =>
    tasks.value.filter(({ is_favorita }) => is_favorita)
  );

  const resetForm = () => {
    console.log("Resetando formulário...");
    newTask.value = {
      title: "",
      description: "",
      priority: "Baixa",
      duedata: "",
    };
  };

  return {
    tasks,
    tasksFav,
    newTask,
    id,
    boxModal,
    getAllTasks,
    findTaskById,
    resetForm,
  };
});
