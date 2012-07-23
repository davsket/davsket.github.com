// function TodoCtrl($scope) {
// 	$scope.todos = [
// 		{text:'learn angular', done:true},
// 		{text:'build an angular app', done:false}];
 
// 	$scope.addTodo = function() {
// 		$scope.todos.push({text:$scope.todoText, done:false});
// 		$scope.todoText = '';
// 	};
 
// 	$scope.remaining = function() {
// 		var count = 0;
// 		angular.forEach($scope.todos, function(todo) {
// 			count += todo.done ? 0 : 1;
// 		});
// 		return count;
// 	};
 
// 	$scope.start = function() {
// 		var oldTodos = $scope.todos;
// 		$scope.todos = [];
// 		angular.forEach(oldTodos, function(todo) {
// 			if (!todo.done) $scope.todos.push(todo);
// 		});
// 	};
// }
var audios = [],
	intervals = [],
	count, 
	counterElem = document.getElementById('counter')

function ring(times){
	if(times && times>0){
		ring(times-1)
	}
	audios[times||0].play()
}
function start(times, reset, messages){
	var elem, iterations = 0

	count = 0
	message.innerHTML = messages[0]

	for(var i=0; i<times.length; i++){
		elem = document.createElement('audio')
		elem.src = 'audio/beep.mp3'
		audios.push(elem)
	}
	times.forEach(function(time, i){
		intervals.push(setInterval(function(){
			ring(i)
		}, time))
	})
	setInterval(function(){
		for(var i=0; i<intervals.length;i++)
			clearInterval(intervals[i])
		intervals = []
		times.forEach(function(time, i){
			intervals.push(setInterval(function(){
				ring(i)
			}, time))
		})
		count = 0
		iterations += 1
		message.innerHTML = messages[iterations%messages.length]
	}, reset)
	setInterval(function(){
		counterElem.innerHTML = ++count
	}, 1000)
}