
<template>
  <form report-submit @submit="formSubmit">
    <button form-type="submit">
      <slot></slot>
    </button>
  </form>
</template>

<script>
  export default {
      data() {
          return {

          }
      },
      props: {},
      methods: {
        formSubmit(e) {
          console.log(e)
        }
      }
  }
</script>

<style lang="scss">
button {
  display: inline-block;
}
</style>

