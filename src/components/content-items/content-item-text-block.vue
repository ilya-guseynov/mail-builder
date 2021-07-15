<template>
  <table>
    <tbody>
      <tr>
        <td>
          {{ contentItem.content }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "content-item-text-block",

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },
};
</script>