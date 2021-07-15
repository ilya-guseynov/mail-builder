<template>
  <div class="mail-preview__preview-triggers">
    <button 
      class="mail-preview__preview-trigger" 
      @click="setJsonPreviewStatus(true)"
    >Посмотреть JSON</button>
  </div>
  <json-preview 
    v-if="jsonPreviewActive" 
    :mail-blocks="mailBlocks" 
    @close-preview="setJsonPreviewStatus(false)"
  ></json-preview>
</template>

<script>
import JsonPreview from "./json-preview";

export default {
  name: "mail-preview",

  components: {
    JsonPreview,
  },

  props: {
    mailBlocks: { 
      type: Array, 
      required: true, 
    },
  },

  data() {
    return {
      jsonPreviewActive: false,
    };
  },

  methods: {
    /**
     * Set new Json Preview show status.
     * 
     * @param { boolean } newActiveStatus
     */
    setJsonPreviewStatus(newActiveStatus) {
      this.jsonPreviewActive = newActiveStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-preview {
  &__preview-triggers {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
  }

  &__preview-trigger {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    transition: all .5s;
    border-bottom: 1px solid transparent;
    padding-bottom: 5px;
    font-size: 14px;

    &:hover {
      border-bottom: 1px solid gray;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>