<template>
  <main class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-5xl mx-auto px-4">
      <!-- Заголовок и кнопка -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Учетные записи</h1>
        <button
          @click="accounts.addAccount"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm font-medium"
        >
          + Добавить
        </button>
      </div>

      <p
        class="flex items-center text-xs p-1 text-gray-500 mt-4 mb-4 font-medium text-md bg-slate-200 rounded-md"
      >
        <!-- Значок вопроса -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-gray-400"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          />
          <path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" />
          <path d="M12 18.01L12.01 17.9989" />
        </svg>

        <span class="pl-1"
          >Для указания нескольких меток для одной пары логин/пароль используйте разделитель
          «;»</span
        >
      </p>

      <!-- Таблица -->
      <div class="bg-white border rounded-lg shadow-sm overflow-hidden">
        <!-- Заголовки колонок -->
        <div
          class="grid grid-cols-[20rem_8rem_10rem_10rem_4rem] gap-3 bg-gray-100 border-b px-4 py-2 text-xs font-medium text-gray-600"
        >
          <div>Метка</div>
          <div>Тип</div>
          <div>Логин</div>
          <div>Пароль</div>
          <div class="text-center">Удалить</div>
        </div>

        <!-- Строки с аккаунтами -->
        <div v-if="accounts.accounts.length" class="divide-y">
          <AccountForm v-for="acc in accounts.accounts" :key="acc.id" :account="acc" />
        </div>

        <!-- Пустое состояние -->
        <div v-else class="p-6 text-center text-gray-500 text-sm">
          Пока нет учетных записей. Нажмите <b>+ Добавить</b>, чтобы создать первую.
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAccountsStore } from './stores/accounts';
import AccountForm from './components/AccountForm.vue';

const accounts = useAccountsStore();
</script>
