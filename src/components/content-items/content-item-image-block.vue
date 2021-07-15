<template>
  <table style="width:100%;">
    <tbody>
      <tr>
        <td>
          <img :src="contentItem.content" style="width:100%" alt="content-item-image">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "content-item-image-block",

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },
}
</script>
