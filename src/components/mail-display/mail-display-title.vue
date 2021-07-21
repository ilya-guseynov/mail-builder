<template>
  <table style="margin-top: 26px;" cellspacing="0" width="100%">
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
