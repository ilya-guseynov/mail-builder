<template>
  <editor
    :apiKey="tinyApiKey"
    :inline="true"
    :init="editorInitOptions"
    v-model="content"
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
      contentFocused: false,
      editorInitOptions: {
        height: 150,
        menubar: false,
        toolbar: 'formatselect | bold italic | alignleft aligncenter alignright',
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

    /**
     * Changes editing status to shows input element instead of span and focuses on this input.
     */
    startEditing() {
      this.contentFocused = true;
      this.$nextTick(function() {
        this.$refs.title.focus();
      });
    },

    /**
     * Changes editing status to show span element instead of input.
     */
    stopEditing() {
      this.contentFocused = false;
    },
  },
};
</script>
