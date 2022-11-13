<template>
<teleport to='body' v-bind="$attrs">
  <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
    <div
      ref="modal-backdrop"
      @click.prevent="$emit('close')"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >  
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
      
        <div
          class="bg-blue-200 rounded-lg text-left overflow-hidden shadow-xl justify-end p-4 w-1/2"
          role="dialog"
          ref="modal"
          aria-modal="true"
          aria-labelledby="modal-headline"
          @click.stop=""
        >
        <button class="top-1 left-0 mb-1 p-1 bg-blue-200 hover:bg-blue-400 text-black rounded-lg"  @click="$emit('close')">X Close</button>
         <slot>This is a modal</slot>
                  </div>                       
               </div>                
            </div>
        </transition>
    </teleport>
</template>
<script setup>
// import {defineEmit} from 'vue';

// const emit = defineEmit(['close'])
// const close = () => {
//   emit('close');
// }
</script>