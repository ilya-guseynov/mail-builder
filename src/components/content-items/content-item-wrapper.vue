<template>
  <div>Враппер контента {{ block.type }}</div>
</template>

<script>
export default {
  name: "content-item-wrapper",

  props: {
    block: { type: Object, required: true },
  },
};
</script>
