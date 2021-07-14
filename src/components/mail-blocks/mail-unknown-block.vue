<template>
  <div>Неизвестный блок типа {{ mailBlock.type }}</div>
</template>

<script>
export default {
  name: "mail-unknown-block",

  props: {
    mailBlock: {
      type: Object,
      required: true,
    },
  },
};
</script>
