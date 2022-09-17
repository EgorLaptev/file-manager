<template>
    <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #222;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
    width: 100%;
}

ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

a {
    color: inherit;
    text-decoration: none;
}

button {
    border-radius: 8px;
    border: 1px solid #ededed;
    height: 40px;
    padding: 8px 16px;
    color: inherit;
    font-size: 16px;
    cursor: pointer;
}

h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
}


</style>
