<template>
  <div class="hello d-flex align-items-center text-light">
    <div>
      <h1>Welcome To MyBank</h1>
      <p>The Safest Money Transaction.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  padding-left: 1.5rem;
  padding-top: 1rem;
  background-image: url("../assets/wallpaperflare-cropped.jpg");
  height: 94vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.hello h1 {
  font-size: 70px;
  font-weight: bold;
  color: #f00;
}
</style>
