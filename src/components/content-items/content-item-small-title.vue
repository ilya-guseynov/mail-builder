<template>
  <table style="width:100%;">
    <tbody>
      <tr>
        <td>
          <span
            style="display: block; border: 2px solid transparent; text-align: center; font-weight: bold;"
            v-if="!contentFocused"
            @click="startEditing"
          >{{ content }}</span>
          <input
            style="font-family: inherit; width: 100%; outline: none; font-size:inherit; margin: 0; padding:0;"
            v-else
            type="text"
            @blur="stopEditing"
            v-model="content"
            ref="title"
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "content-item-small-title",

  props: {
    contentItem: {
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
  },

  methods: {
    /**
     * Emits to parent component, that content must be updated with new data.
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
