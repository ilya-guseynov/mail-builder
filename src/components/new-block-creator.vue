<template>
  <div class="new-block-creator" @mouseleave="hideCreationButtonsOnMouseLeave">
    <div class="new-block-creator__creation-buttons-container" v-if="creationButtonsShowed">
      <button class="new-block-creator__creation-button" @click="createTitleBlock">Заголовок</button>
      <button class="new-block-creator__creation-button" @click="createContentBlock">Контент</button>
    </div>
    <div class="new-block-creator__trigger-container" v-else>
      <button class="new-block-creator__trigger" @click="showCreationButtons">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "new-block-creator",

  props: {
    position: { type: Number, required: true },
  },

  emits: [ "create-title-block", "create-content-block" ],

  data() {
    return {
      creationButtonsShowed: false,
    };
  },

  methods: {
    showCreationButtons() {
      this.creationButtonsShowed = true;
    },

    hideCreationButtonsOnMouseLeave() {
      setTimeout(() => {
        this.creationButtonsShowed = false;
      }, 200);
    },

    createTitleBlock() {
      this.$emit("create-title-block", this.position);
    },

    createContentBlock() {
      this.$emit("create-content-block", this.position);
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
