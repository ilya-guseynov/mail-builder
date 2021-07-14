<template>
  <component 
    :is="currentMailBlockComponent"
    :mail-block="mailBlock"
    @content-update="emitUpdateBlockContent"
  ></component>
</template>

<script>
import MailTitleBlock from "./mail-title-block";
// import MailContentBlock from "./mail-content-block";
import MailUnknownBlock from './mail-unknown-block';
import { MAIL_BLOCK_TYPES } from "../../constants";

export default {
  name: "mail-block-wrapper",

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /**
     * Current component that will be rendered based on type of mail block from props.
     */
    currentMailBlockComponent() {
      if (this.mailBlock.type === MAIL_BLOCK_TYPES.TITLE_BLOCK) {
        return MailTitleBlock;
      } else {
        return MailUnknownBlock;
      }
    },
  },

  methods: {
    /**
     * Emits to parent component that content must me updated with new data.
     */
    emitUpdateBlockContent(newContent) {
      this.$emit("content-update", newContent);
    },
  },
};
</script>
