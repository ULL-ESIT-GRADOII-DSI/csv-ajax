var assert = chai.assert;
//var converted;
//var original;

suite('csv', function() {
  setup(function(){
    if (typeof __html__ !== 'undefined') {
        document.body.innerHTML = __html__['tests/karmatest.html'];
        original = document.getElementById('original');
        finaltable = document.getElementById('finaltable');
    }
  });
	test('2, 4, "hola"', function() {
		original.value = '2, 4, "hola"';
		$("#tableButton").trigger("click")
		setTimeout(function () { assert.deepEqual(finaltable.children[0].children[0].children[0].children[0].children[0].childNodes[0].data, "2"); }, 10000);

	});

	test('2, 4, "hola"', function() {
		original.value = '2, 4, "hola"';
		$("#tableButton").trigger("click")
		setTimeout(function () { assert.deepEqual(finaltable.children[0].children[0].children[0].children[0].children[1].childNodes[0].data, " 4"); }, 10000);
	});

	test('2, 4, "hola"', function() {
		original.value = '2, 4, "hola"';
		$("#tableButton").trigger("click")
		setTimeout(function () { assert.deepEqual(finaltable.children[0].children[0].children[0].children[0].children[2].childNodes[0].data, "hola"); }, 10000);
	});


});
