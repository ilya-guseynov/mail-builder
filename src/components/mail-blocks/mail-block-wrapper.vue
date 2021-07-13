<template>
  <mail-title-block 
    v-if="isTitleBlock" 
    :block="block"
    @content-update="updateBlockContent"
  ></mail-title-block>
  <mail-content-block 
    v-else-if="isContentBlock" 
    :block="block"
    @content-update="updateBlockContent"
  ></mail-content-block>
  <div v-else>Блок {{ block.type }} еще не реализован</div>
</template>

<script>
import MailTitleBlock from "./mail-title-block";
import MailContentBlock from "./mail-content-block";
import { MAIL_BLOCK_TYPES } from "../../constants";

export default {
  name: "mail-block-wrapper",

  components: { MailTitleBlock, MailContentBlock },

  props: {
    block: { type: Object, required: true },
  },

  computed: {
    isTitleBlock() {
      return this.block.type === MAIL_BLOCK_TYPES.MAIL_TITLE_BLOCK;
    },

    isContentBlock() {
      return this.block.type === MAIL_BLOCK_TYPES.MAIL_CONTENT_BLOCK;
    },
  },

  methods: {
    updateBlockContent(event, updateBlock, newValue) {
      this.$emit("content-update", updateBlock, newValue);
    },
  },
};
</script>
