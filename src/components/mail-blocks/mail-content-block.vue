<template>
  <table>
    <tbody>
      <tr>
        <td>
          <table></table>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "mail-content-block",

  props: {
    block: { type: Object, required: true },
  },

  emits: [ "content-update" ],

  computed: {
    blocks() {
      return this.block.content;
    },
  },
};
</script>
