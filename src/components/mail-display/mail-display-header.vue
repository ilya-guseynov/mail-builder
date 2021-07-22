<template>
  <table cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <td width="66px">
          <img :src="rtLogoUrl" alt="RT" align="left" style="border-radius:6px;">
        </td>
        <td style="padding-left:32px;" v-html="mailBlock.content">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RT_LOGO_IMAGE_URL } from "../../constants";

export default {
  name: "mail-display-header",

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },

  computed: {
    rtLogoUrl() {
      return RT_LOGO_IMAGE_URL;
    },
  },
};
</script>