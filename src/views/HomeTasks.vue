<template>
  <section class="flex justify-center bg-gray-100 py-10">
    <div class="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <header class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">📌 To-Do List</h2>
        <button
          @click="showModal"
          class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          + Adicionar Tarefa
        </button>
      </header>

      <ul class="space-y-4 p-2 overflow-y-auto max-h-96">
        <TasksList />
      </ul>
    </div>

    <!-- Modal -->
    <Transition name="fade">
      <Teleport to="#boxModal">
        <div
          v-show="boxModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          @click.self="closeModal"
        >
          <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h3
              id="modal-title"
              class="text-2xl font-semibold text-gray-800 mb-4"
            >
              Nova Tarefa
            </h3>

            <form @submit.prevent="sendTask">
              <div class="mb-4">
                <label
                  for="task-title"
                  class="block text-sm font-medium text-gray-700"
                  >Tarefa</label
                >
                <input
                  id="task-title"
                  v-model="newTask.title"
                  type="text"
                  placeholder="Descrição da tarefa"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  aria-required="true"
                />
              </div>

              <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    for="task-priority"
                    class="block text-sm font-medium text-gray-700"
                    >Prioridade</label
                  >
                  <select
                    id="task-priority"
                    v-model="newTask.priority"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  >
                    <option disabled value="" hidden>Selecione</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label
                    for="task-duedate"
                    class="block text-sm font-medium text-gray-700"
                    >Data de Vencimento</label
                  >
                  <input
                    id="task-duedate"
                    v-model="newTask.duedata"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label
                  for="task-description"
                  class="block text-sm font-medium text-gray-700"
                  >Descrição</label
                >
                <textarea
                  id="task-description"
                  v-model="newTask.description"
                  rows="4"
                  placeholder="Detalhes da tarefa"
                  class="w-full px-3 resize-none py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div class="flex justify-between">
                <button
                  type="submit"
                  class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  class="ml-4 w-full py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import axios from "axios";
import swal from "sweetalert";

//Components
import TasksList from "../components/TasksList.vue";

//Stores
import { useTaskStore } from "../stores/Task";
import { storeToRefs } from "pinia";
const taskStore = useTaskStore();

//Váriaveis
const { newTask, id, boxModal } = storeToRefs(taskStore);

const sendTask = async () => {
  const { title, duedata } = newTask.value;

  if (!title?.trim() || !duedata) {
    swal({
      title: "Atenção",
      text: "Título e data de vencimento são obrigatórios.",
      icon: "warning",
    });
    return;
  }

  const taskData = { ...newTask.value };
  const isUpdate = Boolean(id.value);
  const url = `http://127.0.0.1:8081/tasks${isUpdate ? `/${id.value}` : ""}`;
  const method = isUpdate ? "put" : "post";

  try {
    await axios({ method, url, data: taskData });

    swal({
      title: "Sucesso!",
      text: `Tarefa ${isUpdate ? "atualizada" : "criada"} com sucesso!`,
      icon: "success",
    });

    closeModal();
    await taskStore.getAllTasks();
    taskStore.resetForm();
  } catch (error) {
    console.error(
      `Erro ao ${isUpdate ? "atualizar" : "criar"} a tarefa:`,
      error
    );

    swal({
      title: "Erro",
      text: "Ocorreu um erro ao salvar a tarefa. Tente novamente.",
      icon: "error",
    });
  }
};

const toggleModal = (toggle: boolean) => {
  taskStore.boxModal = toggle;
  taskStore.id = null;
  if (!toggle) taskStore.resetForm();
};

const closeModal = () => toggleModal(false);
const showModal = () => toggleModal(true);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
