<template>
  <ul>
    <div v-if="taskStore.tasks.length > 0">
      <li
        v-for="task in taskStore.tasks"
        :key="task.task_id"
        class="cursor-pointer p-4 rounded-lg flex flex-col gap-2 border bg-white shadow-sm mb-2 transition-all duration-300"
        :class="{ 'line-through text-gray-400 opacity-40': task.is_complete }"
      >
        <!-- Podemos usar o "pointer-events-none" para desabilitar tudo -->
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900 truncate">
            {{ task.title }}
          </h3>
          <div class="flex items-center gap-4">
            <PencilRuler
              @click="updateTaskHandler(task.task_id)"
              class="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            />
            <Trash2
              @click="deleteTask(task.task_id)"
              class="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-600 transition-colors"
            />

            <label class="flex items-center gap-1 text-sm text-gray-700">
              <input
                type="checkbox"
                :checked="task.is_complete"
                @click="updateTaskComplete(task.task_id)"
                class="h-4 w-4 cursor-pointer border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              Concluída?
            </label>

            <div class="flex gap-1">
              <Heart
                @click="updateTaskFavoriteStatus(task.task_id)"
                :class="[
                  task.is_favorita
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-400 hover:text-red-500',
                ]"
                class="w-6 h-6 cursor-pointer transition-transform hover:scale-110"
              />
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-600 mt-2">{{ task.description }}</p>

        <div class="flex items-center justify-between mt-2">
          <span
            class="text-xs px-2 py-1 rounded-full font-medium"
            :class="usePriorityClass(task.priority)"
          >
            {{ task.priority }}
          </span>
          <p class="text-xs text-gray-500">
            {{ useTimeMessage(task.duedata) }}
          </p>
        </div>
      </li>
    </div>

    <p
      v-else
      class="flex flex-col items-center gap-4 text-gray-500 text-center p-6"
    >
      <img
        src="../assets/question.png"
        alt="Nenhuma tarefa encontrada"
        class="w-40 h-auto opacity-80"
      />
      <span class="text-lg font-medium">Nenhuma tarefa encontrada.</span>
    </p>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { Heart, PencilRuler, Trash2 } from "lucide-vue-next";

//Composables
import { usePriorityClass } from "../composables/priorityClass";
import { useTimeMessage } from "../composables/timeMessage";

//Store
import { useTaskStore } from "../stores/Task";
const taskStore = useTaskStore();
const { id, boxModal } = storeToRefs(taskStore);

const updateTaskHandler = async (task_id: number | undefined) => {
  const task = await taskStore.findTaskById(task_id);

  if (!task) {
    console.error(`Tarefa com ID ${task_id} não encontrada.`);
    return;
  }

  id.value = task_id || null;
  boxModal.value = true;
};

const updateTaskField = async (
  task_id: number | undefined,
  field: "is_complete" | "is_favorita"
) => {
  try {
    if (!task_id) {
      console.error("ID da tarefa inválido.");
      return;
    }

    const task = await taskStore.findTaskById(task_id);
    if (!task) {
      console.error(`Tarefa com ID ${task_id} não encontrada.`);
      return;
    }

    const updatedTask = structuredClone(task);
    updatedTask[field] = !updatedTask[field];

    const { data, status, statusText } = await axios.put(
      `http://127.0.0.1:8081/tasks/${task_id}`,
      updatedTask
    );

    taskStore.resetForm();

    if (status === 200) {
      console.log(`Tarefa ${task_id} atualizada com sucesso:`, data);
      await taskStore.getAllTasks();
    } else {
      console.error(`Erro ao atualizar tarefa ${task_id}: ${statusText}`);
    }
  } catch (error) {
    console.error(`Erro ao atualizar ${field} da tarefa:`, error);
  }
};

const deleteTask = async (task_id: number | undefined) => {
  try {
    const { status, statusText } = await axios.delete(
      `http://127.0.0.1:8081/tasks/${task_id}`
    );

    if (status === 200) {
      console.log(`Tarefa com ID ${task_id} excluída com sucesso.`);
      await taskStore.getAllTasks();
    } else {
      console.error(
        `Erro ao excluir a tarefa com ID ${task_id}: ${statusText}`
      );
    }
  } catch (error) {
    console.error(`Erro ao excluir a tarefa com ID ${task_id}:`, error);
  }
};

const updateTaskComplete = async (task_id: number | undefined) =>
  updateTaskField(task_id, "is_complete");

const updateTaskFavoriteStatus = async (task_id: number | undefined) =>
  updateTaskField(task_id, "is_favorita");

onMounted(async () => {
  await taskStore.getAllTasks();
});
</script>

<style scoped></style>
