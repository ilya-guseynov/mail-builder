<template>
  <table style="background: #EEEEEE;border-radius: 7px;margin-top: 26px;" cellpadding="32" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td v-html="mailBlock.content"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "mail-display-content",

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },
};
</script>
