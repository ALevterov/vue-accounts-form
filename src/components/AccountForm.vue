<template>
  <div
    class="grid px-4 py-2 items-start gap-3 p-2"
    :class="
      local.type === 'LDAP'
        ? 'grid-cols-[20rem_8rem_20.75rem_4rem]'
        : 'grid-cols-[20rem_8rem_10rem_10rem_4rem]'
    "
  >
    <!-- Метка -->
    <div>
      <input
        v-model="labelsInput"
        @blur="parseLabels"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm p-2"
        placeholder="tag1;tag2"
        maxlength="50"
      />
    </div>

    <!-- Тип -->
    <div>
      <select
        v-model="local.type"
        @change="save"
        class="w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
      >
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </div>

    <!-- Логин -->
    <div :class="local.type === 'LDAP' ? 'col-span-1 w-full' : ''">
      <input
        v-model="local.login"
        @blur="save"
        :class="[
          'w-full rounded-md shadow-sm text-sm p-2 focus:ring',
          local.login
            ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            : 'border-red-500 focus:border-red-500 focus:ring-red-200',
        ]"
        maxlength="100"
        placeholder="Введите логин"
      />
    </div>

    <!-- Пароль -->
    <div v-if="local.type === 'Локальная'" class="relative">
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="local.password"
        @blur="save"
        :class="[
          'w-full rounded-md shadow-sm text-sm transition focus:outline-none pr-10 p-2',
          local.password
            ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            : 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200',
        ]"
        maxlength="100"
        placeholder="Введите пароль"
      />

      <!-- Кнопка-глаз -->
      <button
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
        tabindex="-1"
      >
        <svg
          v-if="!showPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.095m3.087-2.772A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.132 5.225M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
        </svg>
      </button>
    </div>

    <!-- Кнопка -->
    <div class="flex justify-center items-center h-full">
      <button
        @click="remove"
        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Account, useAccountsStore } from '../stores/accounts';

const props = defineProps<{ account: Account }>();
const accounts = useAccountsStore();

const local = reactive({ ...props.account });
const labelsInput = ref(props.account.labels.map((l) => l.text).join(';'));

function parseLabels() {
  local.labels = labelsInput.value
    .split(';')
    .map((l) => ({ text: l.trim() }))
    .filter((l) => l.text);
  save();
}

const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function save() {
  if (!local.login) return;
  if (local.type === 'Локальная' && !local.password) return;
  accounts.updateAccount(local as Account);
}

function remove() {
  accounts.removeAccount(local.id);
}
</script>

<style>
input,
select {
  outline: none;
  border-width: 1px;
}
select {
  cursor: pointer;
  height: 38px;
}
</style>
