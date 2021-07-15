<template>
  <div>Неизвестный тип контента {{ contentItem.type }}</div>
</template>

<script>
export default {
  name: "content-item-unknown",

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },
};
</script>
