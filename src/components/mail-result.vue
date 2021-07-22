<template>
  <div class="mail-result">
    <div class="mail-result__inner">
      <mail-display :mail-blocks="mailBlocks"></mail-display>
    </div>
    <button class="mail-result__close-button" @click="emitClosePreview">X</button>
  </div>
</template>

<script>
import MailDisplay from "./mail-display/mail-display";

export default {
  name: "mail-result",

  components: {
    MailDisplay,
  },

  props: {
    mailBlocks: {
      type: Array,
      required: true,
    },
  },

  emits: [ "close-preview" ],

  methods: {
    /**
     * Emits to parent component, that current preview must be closed.
     */
    emitClosePreview() {
      this.$emit("close-preview");
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-result {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0, .5);

  &__inner {
    background: white;
    width: 900px;
    max-height: 90vh;
    display: flex;
    justify-content: center;
    overflow: scroll;
  }

  &__close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all .5s;

    &:hover {
      opacity: .8;
    }
  }
}
</style>