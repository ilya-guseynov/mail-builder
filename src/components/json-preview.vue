<template>
  <div class="json-preview">
    <div class="json-preview__inner">
      <pre>{{ prettyFormatedMail }}</pre>
    </div>
    <button class="json-preview__close-button" @click="emitClosePreview">X</button>
  </div>
</template>

<script>
export default {
  name: "json-preview",

  props: {
    mailBlocks: { 
      type: Array, 
      required: true, 
    },
  },

  emits: [ 
    "close-preview",
  ],

  computed: {
    /**
     * Mail blocks from props as string with 2 whitespaces formating.
     */
    prettyFormatedMail() {
      return JSON.stringify(this.mailBlocks, null, 2);
    },
  },

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
.json-preview {
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
    max-height: 90vh;
    width: 60vw;
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