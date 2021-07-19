<template>
  <editor
    :apiKey="tinyApiKey"
    :inline="true"
    :init="editorInitOptions"
    v-model="content"
    placeholder="Введите заголовок..."
  >
  </editor>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "mail-title-block",

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
        toolbar: "formatselect | bold italic | alignleft aligncenter alignright",
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
