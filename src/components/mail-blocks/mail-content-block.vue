<template>
  <table class="mail-content-block" style="background: #EEEEEE;border-radius: 7px;" cellpadding="32" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td v-if="editing">
          <editor
            :apiKey="tinyApiKey"
            :init="editorInitOptions"
            v-model="editorValue"
            placeholder="Введите текст..."
          >
          </editor>
        </td>
        <td v-else v-html="content" @click="startEditing" class="mail-content-block__preview"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "mail-content-block",

  components: {
    Editor,
  },

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },

  data() {
    const localStopEditing = this.stopEditing;
    const localSetContent = this.setContent;

    return {
      editing: false,
      editorValue: this.mailBlock.content,
      editorInitOptions: {
        menubar: false,
        min_height: 500,
        image_dimensions: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor hr",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste imagetools wordcount"
        ],
        toolbar1: "link | bullist numlist | hr | image|  CustomSaveButton",
        toolbar2: "bold italic underline strikethrough | fontsizeselect | alignleft aligncenter alignright alignjustify",
        fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
        setup(editor) {
          editor.ui.registry.addButton('CustomSaveButton', {
            text: 'Сохранить',
            onAction() {
              localSetContent(editor.getContent());
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
        return this.mailBlock.content;
      },

      set(newValue) {
        const newModifiedValue = newValue
          .replaceAll("<img", "<img style='max-width:100%; height:auto;'")
          .replaceAll("<p", "<p style='font-size: 16px;color: #000000;letter-spacing: 0;line-height: 26px;margin: 0 0 26px 0;'")
          .replaceAll("<li", "<li style='font-size: 16px;color: #000000;letter-spacing: 0;line-height: 26px;margin: 0 0 26px 0;'");

        this.emitContentUpdate(newModifiedValue);
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
     * Sets to state content new data.
     */
    setContent(newContent) {
      this.content = newContent;
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
