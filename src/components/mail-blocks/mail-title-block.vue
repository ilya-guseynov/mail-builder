<template>
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
</template>

<script>
export default {
  name: "mail-title-block",

  props: {
    mailBlock: {
      type: Object,
      required: true
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
        return this.mailBlock.content;
      },

      set(newValue) {
        this.$emit("content-update", newValue);
      },
    },
  },

  methods: {
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
