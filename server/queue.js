module.exports = function(start){

  var _queue = [];
  var head = start; 
  var tail = start;

  var methods = {
    enqueue: function(url){
      var oldHead = head;
      console.log('current head',head); 
      _queue[head++]=url;
      return oldHead;
    }, 
    dequeue: function(){
      var url = {url: _queue[tail], id: tail};
      delete _queue[tail++];
      return url;
    }, 
    size: function(){
      return head - tail;
    }
  }  

  return methods; 
};