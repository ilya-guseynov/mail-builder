<template>
  <mail-title-block 
    v-if="isTitleBlock" 
    :block="block"
    @content-update="handleContentUpdate"
  ></mail-title-block>
  <mail-content-block 
    v-else-if="isContentBlock" 
    :block="block"
  ></mail-content-block>
</template>

<script>
import MailTitleBlock from "./mail-title-block";
import MailContentBlock from "./mail-content-block";
import MAIL_BLOCK_TYPES from "../../constants/mail-block-types";

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
    handleContentUpdate(event, updateBlock, newValue) {
      this.$emit("content-update", updateBlock, newValue);
    },
  },
};
</script>
