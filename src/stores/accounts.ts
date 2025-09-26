import { defineStore } from 'pinia';

export interface Label {
  text: string;
}

export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  id: string;
  labels: Label[];
  type: AccountType;
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'Локальная',
        login: '',
        password: '',
      });
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
    },
    updateAccount(updated: Account) {
      const idx = this.accounts.findIndex(acc => acc.id === updated.id);
      if (idx !== -1) this.accounts[idx] = updated;
    },
  },
  persist: true,
});
