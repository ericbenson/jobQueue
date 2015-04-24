module.exports = function(start){

  var _queue = [];
  var head = start; 
  var tail = start;

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
    }, 
    getHead: function(){
      return head;
    }
  }  

  return methods; 
};