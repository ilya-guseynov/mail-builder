<template>
  <table class="content-item-image-block" cellpadding="32" cellspacing="0" width="100%">
    <tbody>
      <tr>
        <td style="font-size:0; padding: 0px;">
          <div class="content-item-image-block__editing-block" v-if="editing">
            <input class="content-item-image-block__editing-input" type="text" v-model="content">
            <div class="content-item-image-block__editing-buttons">
              <button class="content-item-image-block__editing-button" @click="emitContentUpdate('')">Очистить</button>
              <button class="content-item-image-block__editing-button" @click="stopEditing">Закончить</button>
            </div>
          </div>
          <img :src="content" alt="THIS IS IAMGE" style="width:100%; cursor:pointer;" @click="startEditing">
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

  data() {
    return {
      editing: false,
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
     * Changes editing status to show editor and focus on it.
     */
    startEditing() {
      this.editing = true;
    },

    /**
     * Changes editing status to hide editor and show just content.
     */
    stopEditing() {
      this.editing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-item-image-block {
  &__editing-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  &__editing-input {
    width: 100%;
    border: 0;
    padding: 0;
    margin: 0;
    outline: none;
    background: transparent;
    margin-bottom: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-bottom: 1px solid black;
  }

  &__editing-buttons {
    display: flex;
  }

  &__editing-button {
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    background: white;
    border-radius: 5px;
    padding: 10px 30px;
    transition: all .5s;

    &:hover {
      background: whitesmoke;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>