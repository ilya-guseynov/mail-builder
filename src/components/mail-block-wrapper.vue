<template>
  <mail-title-block 
    v-if="isTitleBlock" 
    :block="block"
    @content-update="handleContentUpdate"
  ></mail-title-block>
  <div v-else-if="isContentBlock">Контент</div>
</template>

<script>
import MailTitleBlock from "./mail-title-block";
import MAIL_BLOCK_TYPES from "../constants/mail-block-types";

export default {
  name: "MailBlockWrapper",

  components: { MailTitleBlock },

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
