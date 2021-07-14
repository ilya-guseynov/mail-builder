<template>
  <div class="app">
    <div class="app__mail-builder-container">
      <mail-builder></mail-builder>
    </div>
  </div>
</template>

<script>
import MailBuilder from "./components/mail-builder";

export default {
  name: "app",

  components: {
    MailBuilder,
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
}

.app {
  min-height: 100vh;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__mail-builder-container {
    width: 100%;
  }
}
</style>
