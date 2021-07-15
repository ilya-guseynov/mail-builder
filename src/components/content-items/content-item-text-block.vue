<template>
  <table class="content-item-text-block" style="width:100%;">
    <tbody>
      <tr>
        <td v-if="editor && editing" class="content-item-text-block__editing">
          <div class="content-item-text-block__buttons-container">
            <div class="content-item-text-block__add-container">
              <div class="content-item-text-block__add-text">Выделите текст и нажмите</div>
              <button 
                class="content-item-text-block__button" 
                :class="{ 'is-active': editor.isActive('link') }"
                @click="setLink" 
              >Добавить ссылку</button>
            </div>
            <button class="content-item-text-block__button" @click="stopEditing">Сохранить</button>
          </div>
          <editor-content :editor="editor"/>
        </td>
        <td v-else @click="startEditing" v-html="contentItem.content"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";

export default {
  name: "content-item-text-block",

  components: {
    EditorContent,
  },

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      editor: null,
      editing: false,
    };
  },

  mounted() {
    const onUpdateHandler = newContent => this.emitContentUpdate(newContent);

    this.editor = new Editor({
      content: this.contentItem.content,
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Link,
      ],
      onUpdate({ editor }) {
        onUpdateHandler(editor.getHTML());
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
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
      this.$nextTick(function() {
        setTimeout(() => {
          this.editor.commands.focus();
        }, 0);
      });
    },

    /**
     * Changes editing status to hide editor and show just content.
     */
    stopEditing() {
      this.editing = false;
    },

    /**
     * Set link to a part of text.
     */
    setLink() {
      const url = window.prompt("URL");

      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },
};
</script>

<style lang="scss">
.content-item-text-block {
  &__editing {
    background: white;
  }

  &__buttons-container {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__add-container {
    display: flex;
    align-items: center;
  }

  &__add-text {
    margin-right: 10px;
  }

  &__button {}

  & p {
    word-break: break-all;
  }
}
</style>