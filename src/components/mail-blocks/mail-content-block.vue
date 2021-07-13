<template>
  <table style="background:#eeeeee; padding:32px;">
    <tbody>
      <tr>
        <td v-for="block in blocks" :key="block.id">
          <content-item-wrapper
            :block="block"
            @content-update="updateBlockContent"
          ></content-item-wrapper>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ContentItemWrapper from "../content-items/content-item-wrapper";

export default {
  name: "mail-content-block",

  components: { ContentItemWrapper },

  props: {
    block: { type: Object, required: true },
  },

  emits: [ "content-update" ],

  computed: {
    blocks() {
      return this.block.content;
    },
  },

  methods: {
    updateBlockContent(event, updateBlock, newValue) {
      this.$emit("content-update", updateBlock, newValue);
    },
  },
};
</script>
