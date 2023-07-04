<template>
  <div>
    <ul class="error-messages">
      <li>
        {{ errorMessages }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessages() {
      const errorType = Object.keys(this.validationErrors)
      return `${errorType} ${this.validationErrors[errorType]}`
    }
  },
  mounted() {
    console.log(this.validationErrors)
  }
}
</script>
