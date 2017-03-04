/*
	script.js - It contains all the handlers which are being operated
	over the different web page elements. It uses Jquery to select and
	process over the elements and adding more controls to them.
 */

$("document").ready(function() {
	var utility = new Utility();
	var params = {
		'year': '2013',
		'industry': 'all',
		'brand': 'all',
		'attributes': 'Brand Strength-Customer Satisfaction-Reliability-Popularity'
	}

	$('form[name="filter-form"]').submit(function(e) {
		e.preventDefault();
		var attribValues = new Array();
		var year = $('select[name="year"] option:selected').val();
		var industry = $('select[name="industry"] option:selected').val();
		var brandName = $('select[name="brand"] option:selected').val();
		var attrib = $('input[type="checkbox"]:checked').val();
		if (attrib == undefined) {
			alert('Please select attributes.');
			return;
		}
		if (attrib == 'all') {
			$.each($('input[type="checkbox"]'), function(index, value) {
				if (index > 0) {
					attribValues.push($(value).val());
				}
			});
		} else {
			$.each($('input[type="checkbox"]'), function(index, value) {
				if ($(value).is(':checked')) {
					attribValues.push($(value).val());
				}
			});
		}

		attribValues = attribValues.join('-');

		params['year'] = year;
		params['industry'] = industry;
		params['brand'] = brandName;
		params['attributes'] = attribValues;

		utility.getFilteredData(params);
	});

	$('select[name="industry"]').change(function() {
		utility.getUniqueListOfBrands(this.value);
	});

	// loading years in Year filter
	utility.getUniqueListOfYears();

	// loading industries in Industry filter
	utility.getUniqueListOfIndustries();

	// loading  attributes in Attribute section
	utility.getUniqueListOfAttributes();

	// loading unique brands for Brand filter
	utility.getUniqueListOfBrands();

	// loading component and relevant table
	utility.getFilteredData(params);
});