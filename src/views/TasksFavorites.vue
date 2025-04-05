<template>
  <main class="flex justify-center bg-gray-100 py-10">
    <section class="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <header class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">📌 List Favorites</h2>
      </header>

      <ul class="space-y-4 p-2 overflow-y-auto max-h-96">
        <li
          v-if="taskStore.tasksFav.length > 0"
          v-for="task in taskStore.tasksFav"
          :key="task.task_id"
          class="p-4 rounded-lg flex flex-col gap-2 border bg-white shadow-sm mb-2 transition-all duration-300"
          :class="{ 'line-through text-gray-400 opacity-40 cursor-pointer': task.is_complete }"
        >
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ task.title }}
            </h3>
            <div class="flex items-center gap-4">
              <PencilRuler
                class="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              />
              <Trash2
                class="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-600 transition-colors"
              />
              <label class="flex items-center gap-1 text-sm text-gray-700">
                <input
                  type="checkbox"
                  v-model="task.is_complete"
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
    </section>
  </main>
</template>

<script setup lang="ts">
import axios from "axios";
import { Heart, PencilRuler, Trash2 } from "lucide-vue-next";
import { storeToRefs } from "pinia";

import { usePriorityClass } from "../composables/priorityClass";
import { useTimeMessage } from "../composables/timeMessage";

import { useTaskStore } from "../stores/Task";
const taskStore = useTaskStore();
const { newTask } = storeToRefs(taskStore);

const updateTaskFavoriteStatus = async (task_id: number | undefined) => {
  try {
    const task = await taskStore.findTaskById(task_id);

    if (!task) {
      console.error(`Tarefa com ID ${task_id} não encontrada.`);
      return;
    }

    Object.assign(newTask.value, task);

    newTask.value.is_favorita = !newTask.value.is_favorita;

    const response = await axios.put(
      `http://127.0.0.1:8081/tasks/${task_id}`,
      newTask.value
    );

    if (response.status === 200) {
      console.log("Tarefa atualizada com sucesso:", response.data);
      await taskStore.getAllTasks();
    } else {
      console.error(
        `Erro ao atualizar tarefa ${task_id}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Erro ao atualizar status favorito da tarefa:", error);
  }
};
</script>

<style scoped></style>
