<template>
  <span style="display: block; border: 2px solid transparent; text-align: center; font-weight: bold;" v-if="!contentFocused" @click="startEditing">{{ this.block.content }}</span>
  <input 
    style="font-family: inherit; width: 100%; outline: none; font-size:inherit; margin: 0; padding:0;" 
    type="text" 
    v-else 
    @blur="stopEditing" 
    v-model="content"
    ref="title"
  >
</template>

<script>
export default {
  name: "MailTitleBlock",

  props: {
    block: { type: Object, required: true },
  },

  data() {
    return {
      contentFocused: false,
      content: this.block.content,
    };
  },

  emits: [ "content-update" ],

  watch: {
    content(newValue) {
      this.$emit("content-update", this.block, newValue);
    },
  },

  methods: {
    startEditing() {
      this.contentFocused = true;
      this.$nextTick(function() {
        this.$refs.title.focus();
      });
    },

    stopEditing() {
      this.contentFocused = false;
    },
  },
};
</script>
