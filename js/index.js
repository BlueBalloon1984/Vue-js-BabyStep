var watchExampleVM = new Vue({
    el: '#watch-example',
    data:{
    question:' ',
    answer: 'I cannt give you ananswer until you ask a question!'
  },
  watch:{
    question:function(newQusetion){
    this.answer = 'Waitong for you to stop typing...'
    this.getAnswer()
    }
  },
  method:{
    getAnswer:  _.debounce(
      function(){
        var vm = this;
        if(this.question.indexOf('?') === -1){
          vm.answer = 'Question usually contain a question mark.'
          return
        }
        vm.answer = 'Thinking...'
        axios.get('https://yesno.wtf/api')
          .then(function (response){
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error){
            vm.answer = 'Error!Could not reach the api.'+error
          })
      },
      500
    )
  }
})
