
/*
	utility.js - contains all the interactions between client and 
	server side. This file maintains all the functions which are going to
	request from server side. The main motive to write this file to adapt
	modularity in terms of code structure.

 */

function Utility() {
	this.getUniqueListOfYears = function() {
		$('select[name="years"]').empty();
		$.get('/options?col=year', function(response) {
			response = JSON.parse(response);
			$.each(response, function(index, value) {
				var option = '<option value="' + value + '">' + value + '</option>';
				$('select[name="year"]').append(option);
			})
		});
	}

	this.getUniqueListOfBrands = function(industry = 'all') {
		$('select[name="brand"]').empty();
		$.get('/options?col=brand&industry=' + industry, function(response) {
			response = JSON.parse(response);
			var option = '<option value="all">All</option>';
			$('select[name="brand"]').append(option);
			$.each(response, function(index, value) {
				option = '<option value="' + value + '">' + value + '</option>';
				$('select[name="brand"]').append(option);
			})
		});
	}

	this.getUniqueListOfIndustries = function() {
		$('select[name="industry"]').empty();
		$.get('/options?col=industry', function(response) {
			response = JSON.parse(response);
			var option = '<option value="all">All</option>';
			$('select[name="industry"]').append(option);
			$.each(response, function(index, value) {
				option = '<option value="' + value + '">' + value + '</option>';
				$('select[name="industry"]').append(option);
			})
		});
	}

	this.getUniqueListOfAttributes = function() {
		$.get('/options?col=attributes', function(response) {
			response = JSON.parse(response);
			var checkbox = '<b>Attributes</b> &nbsp;&nbsp;';
			checkbox += '<input type="checkbox" name="all" value="all" checked/>All';
			$.each(response, function(index, value) {
				checkbox += '<input type="checkbox" name="' + value + '" value="' + value + '" disabled/>' + value;
			});
			$('div.attrib').html(checkbox);

			$('input[type="checkbox"]:eq(0)').change(function() {
				if (this.checked) {
					$('input[type="checkbox"]').attr('disabled', true);
					$('input[type="checkbox"]').prop('checked', false);
					$(this).attr('disabled', false);
					$(this).prop('checked', true);
				} else {
					$('input[type="checkbox"]').attr('disabled', false);
				}
			});
		});
	}

	this.getFilteredData = function(params) {
		var url = '/data?year=' + params['year'] + '&industry=' + params['industry'];
		url += '&attributes=' + params['attributes']
		url += '&brand=' + params['brand'];

		// enable to show loader image and hide everything else
		$('div.exercise').css('display', 'none');
		$('div.table-data').css('display', 'none');
		$('div.loader').css('display', 'block');

		// removing earlier results
		$('div.exercise svg').remove();
		$('div.table-data table').remove();

		$.get(url, function(results) {
			var res = JSON.parse(results['response']);
			drawScatterPlot(res, params['attributes'].split('-'));
			$('div.table-data').html(results['table']);

			// enable to show component and hide loader image
			$('div.loader').css('display', 'none');
			$('div.exercise').css('display', 'block');
			$('div.table-data').css('display', 'block');
		});
	}
}