

$( document ).ready(function() {
	// console.log(data_dict)
    // var url = "https://spreadsheets.google.com/feeds/cells/1ZK3Zg_-AkTR7vVvt8CJF_eDcQ_y4Y4D1UwcvCz6a41w/1/public/full?alt=json"; 
    
    var url = "https://gsx2json.com/api?id=" + id;                                                       
	$.ajax({
		url: url,
		type: "GET",
		crossDomain: true,
		async: false,
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			console.log(response)

			if(response != null){
				for(var i=0; i<response['rows'].length; i++){
					// console.log(response['rows'][i])
					var row_d = response['rows'][i]
					var course = row_d['course']
					var name = row_d['name']
					var lg = row_d['lg']
					var nameoffriend1 = row_d['nameoffriend1']
					var nameoffriend2 = row_d['nameoffriend2']
					var nameoffriend3 = row_d['nameoffriend3']
					var thecourseoffriend1 = row_d['thecourseoffriend1']
					var thecourseoffriend2 = row_d['thecourseoffriend2']
					var thecourseoffriend3 = row_d['thecourseoffriend3']

					if(data_dict[course] == undefined || data_dict[course] == null)
						continue
					// add member
					if(data_dict[course]['members'].indexOf({"name": name, "lg": lg}) == -1){
						data_dict[course]['members'].push({"name": name, "lg": lg});
						data_dict[course]['members_count'] += 1
					}

					// add friend 1
					if(nameoffriend1 != '0'){
						if(data_dict[thecourseoffriend1]['friends'].indexOf({"name": name, "nameoffriend": nameoffriend1}) == -1){
							data_dict[thecourseoffriend1]['friends'].push({"name": name, "nameoffriend": nameoffriend1});
							data_dict[thecourseoffriend1]['friends_count'] += 1
						}
					}
					
					// add friend 2
					if(nameoffriend2 != '0'){
						if(data_dict[thecourseoffriend2]['friends'].indexOf({"name": name, "nameoffriend": nameoffriend2}) == -1){
							data_dict[thecourseoffriend2]['friends'].push({"name": name, "nameoffriend": nameoffriend2});
							data_dict[thecourseoffriend2]['friends_count'] += 1
						}
					}

					// add friend 3
					if(nameoffriend3 != '0'){
						if(data_dict[thecourseoffriend3]['friends'].indexOf({"name": name, "nameoffriend": nameoffriend3}) == -1){
							data_dict[thecourseoffriend3]['friends'].push({"name": name, "nameoffriend": nameoffriend3});
							data_dict[thecourseoffriend3]['friends_count'] += 1
						}
					}

				}

			}
			
		},
		error: function (xhr, status) {
			console.log(xhr);
		},
		complete: function(){
			var summary_dict = generateDictionary(data_dict)
			var overall_msg = '';
			var count = 0;

			// for (var j=0; j<Object.keys(data_dict).length; j++) {


			// 	var key = Object.keys(data_dict)[j];
			// 	var next_key = (j+1 != Object.keys(data_dict).length)?Object.keys(data_dict)[j+1]:Object.keys(data_dict)[j];
			// 	var previous_key = (j-1 != -1)?Object.keys(data_dict)[j-1]:Object.keys(data_dict)[j];

			// 	var current_parent = data_dict[key]['parent']

			// 	if(data_dict[key]['members_count'] != 0 || data_dict[key]['friends_count'] != 0){

			// 		var msg = '<tr>';
			// 		msg += '<td class="col-3 align-middle">' +key+ '</td>';
			// 		msg += '<td class="col-9">';
			// 		msg += '<ul class="list-group list-group-horizontal borderless">';
			// 		for(var i=0; i<data_dict[key]['members'].length; i++){
			// 			msg += '<li class="list-group-item"><div class="dot member-bgcolour" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="'+data_dict[key]['members'][i]['name']+'"></div></li>';
			// 		}
			// 		for(var i=0; i<data_dict[key]['friends'].length; i++){
			// 			msg += '<li class="list-group-item"><div class="dot friend-bgcolour" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="'+data_dict[key]['friends'][i]['nameoffriend']+'"></div></li>';
			// 		}
			// 		msg += '</ul>';
			// 		msg += '</td>';
			// 		msg += '</tr>';

			// 		$("#content_graph").append(msg)

			// 	}
				
			// }

			for (college in summary_dict){
				for (school in summary_dict[college]){

					school_total_members = 0;
					school_total_friends = 0;
					overall_msg += '<tr class="accordion-toggle collapsed" id="accordion'+count+'" data-toggle="collapse" data-parent="#accordion1" href="#collapse'+count+'">'
		            overall_msg += '<td class="expand-button"></td>'
		            overall_msg += '<td>'+school+'</td>'
		            overall_msg += '<td>'+summary_dict[college][school]['total_members']+'</td>'
		            overall_msg += '<td>'+summary_dict[college][school]['total_friends']+'</td>'
		            overall_msg += '</tr>'
		            overall_msg += '<tr class="hide-table-padding">'
		            overall_msg += '<td></td>'
		            overall_msg += '<td colspan="3">'
		            overall_msg += '<div id="collapse'+count+'" class="collapse in p-3">'

					for(var i=0; i<summary_dict[college][school]['course_arr'].length; i++){

						if(summary_dict[college][school]['course_arr'][i]['members_count'] != 0 || summary_dict[college][school]['course_arr'][i]['friends_count'] != 0){
							var msg = '<tr>';
							msg += '<td class="col-3 align-middle">' +summary_dict[college][school]['course_arr'][i]['course']+ '</td>';
							msg += '<td class="col-9">';
							msg += '<ul class="list-group list-group-horizontal borderless">';
							for(var j=0; j<summary_dict[college][school]['course_arr'][i]['members_count']; j++){
								msg += '<li class="list-group-item"><div class="dot member-bgcolour" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="'+summary_dict[college][school]['course_arr'][i]['members'][j]['name']+'"></div></li>';
							}
							for(var j=0; j<summary_dict[college][school]['course_arr'][i]['friends_count']; j++){
								msg += '<li class="list-group-item"><div class="dot friend-bgcolour" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="'+summary_dict[college][school]['course_arr'][i]['friends'][j]['nameoffriend']+'"></div></li>';
							}
							msg += '</ul>';
							msg += '</td>';
							msg += '</tr>';

							$("#content_graph").append(msg)
						}

			            overall_msg += '<div class="row">'
			            overall_msg += '<div class="col-4">'+summary_dict[college][school]['course_arr'][i]['course']+'</div>'
			            overall_msg += '<div class="col-2 teal-colour">'+summary_dict[college][school]['course_arr'][i]['members_count']+'</div>'
			            overall_msg += '<div class="col-2 yellow-colour">'+summary_dict[college][school]['course_arr'][i]['friends_count']+'</div>'
			            overall_msg += '</div>'
			        }

		            overall_msg += '</div>'
		            overall_msg += '</td>'
		            overall_msg += '</tr>'
				    count++;
				}


			}

			$("#overall").html(overall_msg)

			$(function () {
			  $('[data-toggle="popover"]').popover()
			})
		}
	});



});

function generateDictionary(dict){
	console.log(dict)
	var new_dictionary = {}
	var school, college, holder;

	for(key in dict){
		school = getSchool(key)
		college = getCollege(school)

		if(!(college in new_dictionary)){
			new_dictionary[college] = []
		}

		if(!(school in new_dictionary[college])){
			new_dictionary[college][school] = {'course_arr':[], 'total_friends':0, 'total_members':0}
		}

		holder = dict[key]
		holder['course'] = key
		new_dictionary[college][school]['course_arr'].push(holder)
		new_dictionary[college][school]['total_members'] += holder['members_count']
		new_dictionary[college][school]['total_friends'] += holder['friends_count']

	}

	return new_dictionary
}

function getSchool(course){
	return tracer_dict[course]
}

function getCollege(school){
	return college_dict[school]
}
