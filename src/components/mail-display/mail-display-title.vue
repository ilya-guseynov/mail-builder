<template>
  <table style="width:100%; margin:0 0 26px 0;">
    <tbody>
      <tr>
        <td v-html="mailBlock.content"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "mail-display-title",

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },
};
</script>
