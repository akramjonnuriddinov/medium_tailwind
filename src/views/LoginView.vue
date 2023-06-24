<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }"
              >Need an account</router-link
            >
          </p>
          <validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              :disabled="isSubmitting"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors.vue'
export default {
  name: 'LoginView',
  components: {
    ValidationErrors
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    }
  },
  methods: {
    onSubmit() {
      console.log('user logged in')
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then((user) => {
          console.log('successfull logged in', user)
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>
