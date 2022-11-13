<template>
  <div class="Game h-screen">
    <Modal v-if="showModal" @close="showModal = false"
      ><div
        v-html="message"
        @click="resetGame"
        class="justify-center text-center"
      ></div
    ></Modal>
    <div class="buttons flex justify-center mt-3">
      <button
        class="border-black border-2 p-2 bg-blue-400 rounded-lg"
        @click="startGame"
      >
        Start a Game
      </button>
      <button
        class="border-black border-2 p-2 bg-blue-400 rounded-lg ml-10"
        @click="resetGame"
      >
        Reset
      </button>
    </div>
    <div class="align-middle justify-center text-center flex h-12 mt-3">
      <transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="absolute text-center border-black bg-red-500 rounded-xl w-auto p-2"
          v-show="activePlayer.playerOne.active"
        >
          <p class="text-bold">Player One's Turn</p>
        </div>
      </transition>
      <transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="text-center absolute border-black bg-blue-500 w-auto p-2"
          v-show="activePlayer.playerTwo.active"
        >
          <p class="text-bold">Player Two's Turn</p>
        </div>
      </transition>
    </div>
    <div class="board-container m-auto sm:w-3/4 sm:h-5/6 w-5/6 h-4/6">
      <transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-300 transform"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="board p-3 grid grid-cols-3 grid-rows-3 sm:h-3/4 sm:w-96 h-5/6 w-5/6 m-auto mt-10 bg-fixed"
          v-show="gameStatus.started"
          id="board"
        >
          <div
            class="cell grid grid-cols-1 grid-rows-1 border-b-4 border-r-4 w-auto h-auto align-middle justify-center border-white-900"
            @click="handleClick"
            id="0"
            data-cell
          ></div>
          <div
            class="cell flex border-b-4 border-r-4 h-auto w-auto  border-white-900 align-middle justify-center"
            @click="handleClick"
            id="1"
            data-cell
          ></div>
          <div
            class="cell flex border-b-4 h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="2"
            data-cell
          ></div>
          <div
            class="cell flex border-b-4 border-r-4 h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="3"
            data-cell
          ></div>
          <div
            class="cell flex border-b-4 border-r-4 h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="4"
            data-cell
          ></div>
          <div
            class="cell flex border-b-4 h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="5"
            data-cell
          ></div>
          <div
            class="cell flex border-r-4 h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="6"
            data-cell
          ></div>
          <div
            class="cell flex border-r-4 h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="7"
            data-cell
          ></div>
          <div
            class="cell flex h-auto w-auto border-white-900 align-middle justify-center"
            @click="handleClick"
            id="8"
            data-cell
          ></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import Modal from "./Modal.vue";

let cellElements;
let gameCells = [];
let gameStatus = reactive({ started: false });
let activePlayer = reactive({
  playerOne: {
    active: false,
    previousMove: "",
    chaseCount: 0,
  },
  playerTwo: {
    active: false,
    previousMove: "",
    chaseCount: 0,
  },
});
let showModal = ref(false);
let message = ref(null);
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
class GameCell {
  playerOnePlayed = false;
  playerTwoPlayed = false;
  constructor(id) {
    this.id = id;
  }
}

const playerToggle = () => {
  if (activePlayer.playerOne.active) {
    console.log("player two turn!");
    activePlayer.playerOne.active = false;
    activePlayer.playerTwo.active = true;
  } else {
    console.log("player one turn!");
    activePlayer.playerOne.active = true;
    activePlayer.playerTwo.active = false;
  }
};

const checkChase = (cellId) => {
  if (activePlayer.playerOne.active) {
    if (activePlayer.playerTwo.previousMove == cellId) {
      activePlayer.playerOne.chaseCount++;
      if (activePlayer.playerOne.chaseCount >= 2) {
        return true;
      } else {
        return false;
      }
    } else {
      activePlayer.playerOne.chaseCount = 0;
      return false;
    }
  } else if (activePlayer.playerTwo.active) {
    if (activePlayer.playerOne.previousMove == cellId) {
      activePlayer.playerTwo.chaseCount++;
      if (activePlayer.playerTwo.chaseCount >= 2) {
        return true;
      } else {
        return false;
      }
    } else {
      activePlayer.playerTwo.chaseCount = 0;
      return false;
    }
  }
};

const checkWin = (cellId) => {
  let win = { ticOWin: false, chaseWin: false };
  win.chaseWin = checkChase(cellId);
  if (!win.chaseWin) {
    win.ticOWin = WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return (
          gameCells[index].playerOnePlayed && gameCells[index].playerTwoPlayed
        );
      });
    });
  }
  return win;
};

const handleClick = (e) => {
  if (gameStatus.started) {
    let win;
    const id = e.target.id;
    const cell = gameCells.filter((cell) => cell.id == id)[0];
    if (activePlayer.playerOne.active && !cell.playerOnePlayed) {
      cell.playerOnePlayed = true;
      activePlayer.playerOne.previousMove = cell.id;
      const element = document.createElement("div")
      const classes = ['absolute','border-4', 'border-red-700','place-self-center','col-span-1','sm:w-24','w-24','h-1']
      classes.forEach((el)=> element.classList.add(el));      
      document.getElementById(id).appendChild(element);
      win = checkWin(cell.id);
    } else if (activePlayer.playerTwo && !cell.playerTwoPlayed) {
      cell.playerTwoPlayed = true;
      activePlayer.playerTwo.previousMove = cell.id;
      const element =  document.createElement("div")
        const classes = ['absolute','border-4','place-self-center', 'col-span-1', 'row-span-1','border-blue-700','sm:h-24','h-24','w-1']
      classes.forEach((el)=> element.classList.add(el));      
      document.getElementById(id).appendChild(element);
      win = checkWin(cell.id);
    } else if (
      (activePlayer.playerTwo && cell.playerTwoPlayed) ||
      (activePlayer.playerOne && cell.playerOnePlayed)
    ) {
      message.value = "You have already played this square!";
      showModal.value = true;
      return;
    }
    if (win.ticOWin) {
      gameStatus.started = false;
      message.value = `<div><h1 class="text-4xl">${
        activePlayer.playerOne.active ? "Player One wins!" : "Player Two wins!"
      }</h1><br/><button @click="startGame" class="border-black bg-red-600 p-2 rounded-lg">Reset Game</button></div>`;
      showModal.value = true;
    } else if (win.chaseWin) {
      message.value = `<div><h1 class="text-4xl">${
        activePlayer.playerOne.active
          ? "Player TWO wins! NO CHASING!"
          : "Player ONE wins! NO CHASING!"
      }</h1><br/><button @click="startGame" class="border-black bg-red-600 p-2 rounded-lg" >Reset Game</button></div>`;
      showModal.value = true;
      gameStatus.started = false;
    } else if (win.ticOWin == false && win.chaseWin == false) {
      playerToggle();
      return;
    }
  } else {
    console.log("game hasn't started");
  }
};
const startGame = () => {
  console.log("start new game");
  showModal.value = false;
  resetGame();
  cellElements = document.querySelectorAll(`[data-cell]`);
  cellElements.forEach((cell) => {
    const newCell = new GameCell(cell.id);
    gameCells.push(newCell);
  });
  gameStatus.started = true;
  activePlayer.playerOne.active = true;
  activePlayer.playerTwo.active = false;
};

const resetGame = () => {
  showModal.value = false;
  gameStatus.started = false;
  gameCells.forEach((cell) => {
    document.getElementById(cell.id).innerHTML = "";
  });
  gameCells = [];
  activePlayer.playerOne.previousMove = "";
  activePlayer.playerTwo.previousMove = "";
  message.value = "";
  activePlayer.playerOne.active = false;
  activePlayer.playerTwo.active = false;
  activePlayer.playerOne.chaseCount = 0;
  activePlayer.playerTwo.chaseCount = 0;
};
</script>
