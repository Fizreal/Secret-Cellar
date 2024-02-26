<template>
  <div class="unauthenticated">
    <h1>You must be signed in to access this page</h1>
    <div>
      <router-link to="/register" class="secondary">Register</router-link>
      <router-link to="/login" class="primary">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnauthenticatedUser'
}
</script>

<style scoped>

  .unauthenticated {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 24px;
    border-radius: 8px;
    gap: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  h1 {
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    color: rgb(245,215,219);
    font-weight: 500;
    letter-spacing: 0.025em;
  }

  .unauthenticated div {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  a {
    width: 100px;
    text-align: center;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    background-color: #F5D7DB;
    color: #BD83B8;
  }

  .primary {
    background-color: #BD83B8;
    color: #F5D7DB;
  }

  .secondary {
    color: #F5D7DB;
    border: 1px solid #F5D7DB;
  }

</style>
