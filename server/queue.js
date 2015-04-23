module.exports = function(){

  var _queue = [];
  var head = 0; 
  var tail = 0;

  var methods = {
    enqueue: function(url){
      var oldHead = head; 
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