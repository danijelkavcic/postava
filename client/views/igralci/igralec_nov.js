Template.igralecNov.events(okCancelEvents('#nov-igralec', {
  ok: function(text, event){
    Igralci.insert({ime: text});
    event.target.value = "";
  }
}));