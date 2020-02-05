<template>
  <div>
    <input @input="onInput" placeholder="Search Video..."/>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onInput: function(event){
      this.$emit('termChange',event.target.value)
      
    }
    
    
  }
};

</script>

<style scoped>
  input {
    width:75%;
  }

  div {
    text-align: center;
  
  }
</style>

