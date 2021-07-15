<template>
  <table style="width:100%;">
    <tbody>
      <tr>
        <td>
          <span style="height: 2px; display:block; width:100%; background:black;"></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "content-item-divider",

  props: {
    contentItem: {
      type: Object,
      required: true,
    },
  },
};
</script>