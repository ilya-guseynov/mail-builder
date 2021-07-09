<template>
  <span style="display: block; border: 2px solid transparent; text-align: center; font-weight: bold;" v-if="!contentFocused" @click="startEditing">{{ content }}</span>
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
  name: "mail-title-block",

  props: {
    block: { type: Object, required: true },
  },

  data() {
    return {
      contentFocused: false,
    };
  },

  computed: {
    content: {
      get() {
        return this.block.content;
      },
      set(newValue) {
        this.$emit("content-update", this.block, newValue);
      },
    },
  },

  emits: [ "content-update" ],

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
