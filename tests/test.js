var assert = chai.assert;
//var converted;
//var original;

suite('csv', function() {
	if (typeof __html__ !== 'undefined') {
              document.body.innerHTML = __html__['tests/test.html'];
              original = document.getElementById('original');
              output = document.getElementByClassName('legal').children;
          }   
	test('2, 4, "hola"', function() {
		original.value = '2, 4, "hola"';
		calculate();
		assert.deepEqual(output[0].childNodes[0], "2");
	});
	
	test('2, 4, "hola"', function() {
	original.value = '2, 4, "hola"';
		calculate();
		assert.deepEqual(output[1].childNodes[0], "4");
	});

	test('2, 4, "hola"', function() {
		original.value = '2, 4, "hola"';
		calculate();
		assert.deepEqual(output[2].childNodes[0], '"hola"');
	});
	
	
});
