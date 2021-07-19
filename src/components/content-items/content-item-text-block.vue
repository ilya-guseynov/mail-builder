<template>
  <table class="content-item-text-block" style="width:100%;">
    <tbody>
      <tr>
        <td v-if="editing">
          <editor
            :apiKey="tinyApiKey"
            :init="editorInitOptions"
            v-model="content"
            placeholder="Введите текст..."
          >
          </editor>
        </td>
        <td v-else v-html="content" @click="startEditing" class="content-item-text-block__preview"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "content-item-text-block",

  components: {
    Editor,
  },

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    const localStopEditing = this.stopEditing;

    return {
      editing: false,
      editorInitOptions: {
        menubar: false,
        min_height: 500,
        statusbar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste imagetools wordcount"
        ],
        toolbar1: "link | bullist numlist | CustomSaveButton",
        toolbar2: "bold italic underline strikethrough | fontsizeselect | alignleft aligncenter alignright alignjustify",
        fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
        setup(editor) {
          editor.ui.registry.addButton('CustomSaveButton', {
            text: 'Сохранить',
            onAction() {
              localStopEditing();
            }
          });
        },
      },
    };
  },

  computed: {
    content: {
      get() {
        return this.contentItem.content;
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
     */
    emitContentUpdate(newContent) {
      this.$emit("content-update", newContent);
    },

    /**
     * Changes editing status to show editor and focus on it.
     */
    startEditing() {
      this.editing = true;
    },

    /**
     * Changes editing status to hide editor and show just content.
     */
    stopEditing() {
      this.editing = false;
    },
  },
};
</script>

<style lang="scss">
.content-item-text-block {
  &__preview p {
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    line-height: 26px;
    margin: 0 0 26px 0;
  }
}
</style>