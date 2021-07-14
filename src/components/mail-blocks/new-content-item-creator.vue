<template>
  <div class="new-content-item-creator" @mouseleave="hideCreationButtonsWithDelay">
    <div class="new-content-item-creator__creation-buttons-container" v-if="creationButtonsShowed">
      <button class="new-content-item-creator__creation-button" @click="emitCreateSmallTitleContentItem">Маленький заголовок</button>
      <button class="new-content-item-creator__creation-button" @click="emitCreateImageContentItem">Картика</button>
      <button class="new-content-item-creator__creation-button" @click="emitCreateTextContentItem">Текст</button>
      <button class="new-content-item-creator__creation-button" @click="emitCreateDividerContentItem">Разделитель</button>
    </div>
    <div class="new-content-item-creator__trigger-container" v-else>
      <button class="new-content-item-creator__trigger" @click="showCreationButtons">+</button>
    </div>
  </div>
</template>

<script>
import { CONTENT_ITEM_TYPE } from '../../constants';

export default {
  name: "new-content-item-creator",

  props: {
    position: {
      type: Number,
      required: true,
    },
  },

  emits: [
    "create-content-item",
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
    emitCreateSmallTitleContentItem() {
      this.$emit("create-content-item", CONTENT_ITEM_TYPE.SMALL_TITLE_BLOCK, this.position);
    },

    /**
     * Emits to parent component, that title block must be created.
     */
    emitCreateImageContentItem() {
      this.$emit("create-content-item", CONTENT_ITEM_TYPE.IMAGE_BLOCK, this.position);
    },

    /**
     * Emits to parent component, that text content item must be created.
     */
    emitCreateTextContentItem() {
      this.$emit("create-content-item", CONTENT_ITEM_TYPE.TEXT_BLOCK, this.position);
    },

    /**
     * Emits to parent component, that divider content item must be created.
     */
    emitCreateDividerContentItem() {
      this.$emit("create-content-item", CONTENT_ITEM_TYPE.DIVIDER_BLOCK, this.position);
    },

  },
};
</script>

<style lang="scss" scoped>
.new-content-item-creator {
  height: 25px;
  background: rgb(197, 197, 197);
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
    font-size: 10px;

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
