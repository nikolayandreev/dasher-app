<template>
  <div id="main">
    <div class="container">
      <h3>Example using .container</h3>
      <div class="row">
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
      </div>
      <div class="row">
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
      </div>
      <div class="row">
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-3">col-md-3</div>
      </div>
      <div class="row">
        <div class="col-md-4">col-md-4</div>
        <div class="col-md-4">col-md-4</div>
        <div class="col-md-4">col-md-4</div>
      </div>
      <div class="row">
        <div class="col-md-5">col-md-5</div>
        <div class="col-md-5">col-md-5</div>
        <div class="col-md-2">col-md-2</div>
      </div>
      <div class="row">
        <div class="col-md-6">col-md-6</div>
        <div class="col-md-6">col-md-6</div>
      </div>
      <div class="row">
        <div class="col-md-7">col-md-7</div>
        <div class="col-md-5">col-md-5</div>
      </div>
      <div class="row">
        <div class="col-md-8">col-md-8</div>
        <div class="col-md-4">col-md-4</div>
      </div>
      <div class="row">
        <div class="col-md-9">col-md-9</div>
        <div class="col-md-3">col-md-3</div>
      </div>
      <div class="row">
        <div class="col-md-10">col-md-10</div>
        <div class="col-md-2">col-md-2</div>
      </div>
      <div class="row">
        <div class="col-md-11">col-md-11</div>
        <div class="col-md-1">col-md-1</div>
      </div>
    </div>
    <div class="container-fluid">
      <h3>Example using .container-fluid</h3>
      <div class="row">
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
        <div class="col-md-1">col-md-1</div>
      </div>
      <div class="row">
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
        <div class="col-md-2">col-md-2</div>
      </div>
      <div class="row">
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-3">col-md-3</div>
        <div class="col-md-3">col-md-3</div>
      </div>
      <div class="row">
        <div class="col-md-4">col-md-4</div>
        <div class="col-md-4">col-md-4</div>
        <div class="col-md-4">col-md-4</div>
      </div>
      <div class="row">
        <div class="col-md-5">col-md-5</div>
        <div class="col-md-5">col-md-5</div>
        <div class="col-md-2">col-md-2</div>
      </div>
      <div class="row">
        <div class="col-md-6">col-md-6</div>
        <div class="col-md-6">col-md-6</div>
      </div>
      <div class="row">
        <div class="col-md-7">col-md-7</div>
        <div class="col-md-5">col-md-5</div>
      </div>
      <div class="row">
        <div class="col-md-8">col-md-8</div>
        <div class="col-md-4">col-md-4</div>
      </div>
      <div class="row">
        <div class="col-md-9">col-md-9</div>
        <div class="col-md-3">col-md-3</div>
      </div>
      <div class="row">
        <div class="col-md-10">col-md-10</div>
        <div class="col-md-2">col-md-2</div>
      </div>
      <div class="row">
        <div class="col-md-11">col-md-11</div>
        <div class="col-md-1">col-md-1</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .row {
    border: 1px solid red;
    padding: 10px;
    margin: 3px 0;
    [class^="col-md-"],
    [class*=" col-md-"] {
      border: 1px solid green;
      padding: 30px 10px;
    }
  }
</style>