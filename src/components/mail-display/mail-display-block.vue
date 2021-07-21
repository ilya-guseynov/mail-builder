<template>
  <component :is="renderComponent" :mail-block="mailBlock"></component>
</template>

<script>
import MailDisplayTitle from "./mail-display-title";
import mailDisplayContent from './mail-display-content';
import { MAIL_BLOCK_TYPES } from '../../constants';

export default {
  name: "mail-display-block",

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },

  computed: {
    renderComponent() {
      if (this.mailBlock.type === MAIL_BLOCK_TYPES.TITLE_BLOCK) {
        return MailDisplayTitle;
      } else if (this.mailBlock.type === MAIL_BLOCK_TYPES.CONTENT_BLOCK) {
        return mailDisplayContent;
      }

      return null;
    },
  },
};
</script>
