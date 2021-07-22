<template>
  <table cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <td width="66px">
          <img :src="rtLogoUrl" alt="RT" align="left" style="border-radius:6px;">
        </td>
        <td style="padding-left:32px;">
          <editor
            :apiKey="tinyApiKey"
            :inline="true"
            :init="editorInitOptions"
            v-model="content"
          >
          </editor>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { RT_LOGO_IMAGE_URL } from '../../constants';

export default {
  name: "mail-header-block",

  components: {
    Editor,
  },

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },

  emits: [
    "content-update",
  ],

  data() {
    return {
      editorInitOptions: {
        menubar: false,
        toolbar: false,
      },
    };
  },

  computed: {
    content: {
      get() {
        return this.mailBlock.content;
      },

      set(newValue) {
        this.emitContentUpdate(newValue); 
      },
    },

    /**
     * Returns Tiny api key from .env file.
     */
    tinyApiKey() {
      return process.env.VUE_APP_TINY_API_KEY;
    },

    rtLogoUrl() {
      return RT_LOGO_IMAGE_URL;
    },
  },

  methods: {
    /**
     * Emits to parent component, that content must be updated with new data.
     *
     * @param { string } newContent
     */
    emitContentUpdate(newContent) {
      this.$emit("content-update", newContent);
    },
  },
};
</script>
