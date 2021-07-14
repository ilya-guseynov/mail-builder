<template>
  <div class="new-block-creator" @mouseleave="hideCreationButtonsWithDelay">
    <div class="new-block-creator__creation-buttons-container" v-if="creationButtonsShowed">
      <button class="new-block-creator__creation-button" @click="emitCreateTitleBlock">Заголовок</button>
      <button class="new-block-creator__creation-button" @click="emitCreateContentBlock">Контент</button>
    </div>
    <div class="new-block-creator__trigger-container" v-else>
      <button class="new-block-creator__trigger" @click="showCreationButtons">+</button>
    </div>
  </div>
</template>

<script>
import { MAIL_BLOCK_TYPES } from '../constants';
export default {
  name: "new-block-creator",

  props: {
    position: {
      type: Number,
      required: true,
    },
  },

  emits: [
    "create-mail-block",
  ],

  data() {
    return {
      creationButtonsShowed: false,
    };
  },

  methods: {
    /**
     * Show creation buttons.
     */
    showCreationButtons() {
      this.creationButtonsShowed = true;
    },

    /**
     * Hide creation buttons after time, that equals to hover transition of opacity.
     */
    hideCreationButtonsWithDelay() {
      setTimeout(() => {
        this.creationButtonsShowed = false;
      }, 200);
    },

    /**
     * Emits to parent component, that title block must be created.
     */
    emitCreateTitleBlock() {
      this.$emit("create-mail-block", MAIL_BLOCK_TYPES.TITLE_BLOCK, this.position);
    },

    /**
     * Emits to parent component, that content block must be created.
     */
    emitCreateContentBlock() {
      this.$emit("create-mail-block", MAIL_BLOCK_TYPES.CONTENT_BLOCK, this.position);
    },
  },
};
</script>

<style lang="scss" scoped>
.new-block-creator {
  height: 25px;
  background: rgb(236, 236, 236);
  opacity: 0;
  transition: all .2s;

  &:hover {
    opacity: 1;
  }

  &__creation-buttons-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__creation-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    transition: all .2s;

    &:hover {
      background: rgb(216, 216, 216);
    }
  }

  &__trigger-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__trigger {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
  }
}
</style>
