import Vue from 'vue';
import { Context } from '@nuxt/types';




export type Nullable<T> = T | null;
export type Nilable<T> = T | null | undefined;
export type Newable<T> = { new (...args: any[]): T }

export type Exact<T, Shape = T> = T extends Shape ?
  (Exclude<keyof T, keyof Shape> extends never ?
    T : never): never;

declare module '@nuxt/types' {
  interface Context {
    $ctx: Context
  }
}

declare module 'vue/types/vue' {
  // 3. Declare a ampliação para Vue
  interface Vue {
    $ctx: Context
  }
}

declare global {
  var $nuxt: Vue
}