<template>
  <div>
    <ul class="error-messages">
      <li v-for="errorMessage in errorMessages" :key="errorMessage">
        {{ errorMessage }}
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
      return Object.keys(this.validationErrors).map((name) => {
        const message = this.validationErrors[name].join('')
        return `${name} ${message}`
      })
    }
  }
}
</script>
