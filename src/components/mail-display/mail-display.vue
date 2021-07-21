<template>
  <table style="width:100%; max-width:600px; padding-top:40px; padding-bottom:40px; font-family:Inter,Arial,sans-serif;">
    <tbody>
      <tr>
        <td>
          <mail-display-block v-for="mailBlock in orderedMailBlocks" :key="mailBlock.id" :mail-block="mailBlock"></mail-display-block>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import MailDisplayBlock from "./mail-display-block";

export default {
  name: "mail-display",

  components: {
    MailDisplayBlock,
  },

  props: {
    mailBlocks: {
      type: Array,
      required: false,
    },
  },

  computed: {
    /**
     * Returns mail blocks sorted by their positions.
     */
    orderedMailBlocks() {
      return [...this.mailBlocks].sort(
        (firstMailBlock, secondMailBlock) => (firstMailBlock.position - secondMailBlock.position)
      );
    },
  },
};
</script>
