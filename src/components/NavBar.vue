<template>
    <div class="navbar-container grid grid-cols-3 grid-rows-2 h-1/4 text-center tex align-middle justify-center">
        <h1 class="text-4xl text-blue-100 text-bold col-start-2 ml-5 mt-5 align-middle text-center"><p>Tic-O-3</p></h1>
        <button class="text-black text-xl col-start-1 w-1/2 bg-blue-400  border-black rounded-lg border-2 mb-2 ml-2" @click="showTheThing = !showTheThing">the rules</button>
    </div>
      <transition
        enter-active-class="transition ease-out duration-300 transform "
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"> 
        <div class="fixed flex align-middle justify-center z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
        @click="showTheThing = false" v-if="showTheThing">
        <div class="bg-blue-600 rounded-lg text-left h-auto overflow-hidden shadow-xl p-6 w-3/4 sm:w-1/2">
        <div class="flex justify-end">       
        <button class="bg-blue-600 mb-10 hover:bg-blue-900 p-2 rounded-lg text-blue-200" 
        @click="showTheThing = false">X Close</button>
        </div>
        <h1 class="text-2xl bg-blue-600 text-center text-blue-200">The Rules:</h1>
        <ul class="list-disc">
        <li class="text-xl text-blue-200">This is a modified version of tic-tac-toe.</li>
        <li class="text-xl text-blue-200">Player one is the horizontal line and player two is the vertical line</li>
        <li class="text-xl text-blue-200">The Object of the game is to be the player that finises 3 crosses in a row.</li>
        <li class="text-xl text-blue-200">Each player can only play once per cell.</li>
        <li class="text-xl text-blue-200">When you play the same square immediately after the other player this is called "chasing" and is against the rules.</li>
        <li class="text-xl text-blue-200">You can play the same cell as another player immediately after them once, if you do it a second time in a row you will forfeit the game.</li>
        <li class="text-xl text-blue-200">Have Fun!</li>
        </ul>
        </div>
        </div>
        </transition>
</template>
<script setup>
import {ref} from '@vue/reactivity'

const showTheThing = ref(false);

</script>