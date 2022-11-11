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
          class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
          role="dialog"
          ref="modal"
          aria-modal="true"
          aria-labelledby="modal-headline"
          @click.stop=""
        >
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