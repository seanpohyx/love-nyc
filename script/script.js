

$( document ).ready(function() {
	var data_dict = {}


    // var url = "https://spreadsheets.google.com/feeds/cells/1ZK3Zg_-AkTR7vVvt8CJF_eDcQ_y4Y4D1UwcvCz6a41w/1/public/full?alt=json"; 
    var id = "1ZK3Zg_-AkTR7vVvt8CJF_eDcQ_y4Y4D1UwcvCz6a41w"  
    var url = "https://gsx2json.com/api?id=1ZK3Zg_-AkTR7vVvt8CJF_eDcQ_y4Y4D1UwcvCz6a41w"                                                       
	$.ajax({
		url: url,
		type: "GET",
		crossDomain: true,
		async: false,
		dataType: "json",
		contentType: 'application/json',
		success: function (response) {
			// console.log(response['rows'])
			for(var i=0; i<response['rows'].length; i++){
				// console.log(response['rows'][i])
				row_d = response['rows'][i]
				// console.log(row_d)

				// add course 
				if(data_dict[row_d['course']] == null && data_dict[row_d['course']] != 0){
					data_dict[row_d['course']] = {'members' : [], 'friends' : []}
				}
				if(data_dict[row_d['thecourseoffriend1']] == null && row_d['thecourseoffriend1'] != 0){
					data_dict[row_d['thecourseoffriend1']] = {'members' : [], 'friends' : []}
				}
				if(data_dict[row_d['thecourseoffriend2']] == null && row_d['thecourseoffriend2'] != 0){
					data_dict[row_d['thecourseoffriend2']] = {'members' : [], 'friends' : []}
				}
				if(data_dict[row_d['thecourseoffriend3']] == null && row_d['thecourseoffriend3'] != 0){
					data_dict[row_d['thecourseoffriend3']] = {'members' : [], 'friends' : []}
				}

				// add member
				if(data_dict[row_d['course']]['members'].indexOf(row_d['name'] + '#' + row_d['lg']) == -1){
					data_dict[row_d['course']]['members'].push(row_d['name'] + '#' + row_d['lg']);
				}

				// add friend 1
				if(row_d['nameoffriend1'] != '0'){
					if(data_dict[row_d['thecourseoffriend1']]['friends'].indexOf(row_d['nameoffriend1'] + '#' + row_d['name']) == -1){
						data_dict[row_d['thecourseoffriend1']]['friends'].push(row_d['nameoffriend1'] + '#' + row_d['name']);
					}
				}
				
				// add friend 2
				if(row_d['nameoffriend2'] != '0'){
					if(data_dict[row_d['thecourseoffriend2']]['friends'].indexOf(row_d['nameoffriend2'] + '#' + row_d['name']) == -1){
						data_dict[row_d['thecourseoffriend2']]['friends'].push(row_d['nameoffriend2'] + '#' + row_d['name']);
					}
				}

				// add friend 3
				if(row_d['nameoffriend3'] != '0'){
					if(data_dict[row_d['thecourseoffriend3']]['friends'].indexOf(row_d['nameoffriend3'] + '#' + row_d['name']) == -1){
						data_dict[row_d['thecourseoffriend3']]['friends'].push(row_d['nameoffriend3'] + '#' + row_d['name']);
					}
				}


				// data_dict[row_d['course']]['members'][row_d['name'] + '-' + row_d['lg']]  = {
				// 	'lg':row_d['lg'],
				// 	 'friend1': row_d['nameoffriend1'],
				// 	 'course1': row_d['thecourseoffriend1'],
				// 	 'friend2': row_d['nameoffriend2'], 
				// 	 'course2': row_d['thecourseoffriend2'],
				// 	 'friend3': row_d['nameoffriend3'],
				// 	 'course3': row_d['thecourseoffriend3']
				// 	}
			}
		},
		error: function (xhr, status) {
			console.log(xhr);
		},
		complete: function(){
			console.log(data_dict)
			const regex = /[A-Za-z\s]*/;
			for (var key in data_dict) {
				var msg = '<tr>';
				msg += '<td class="col-3">' +key+ '</td>';
				msg += '<td class="col-9">';
				msg += '<ul class="list-group list-group-horizontal borderless">';
				for(var i=0; i<data_dict[key]['members'].length; i++){
					msg += '<li class="list-group-item"><div class="dot teal-bgcolour" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="'+data_dict[key]['members'][i].replace(/#/, ' ')+'"></div></li>';
				}
				for(var i=0; i<data_dict[key]['friends'].length; i++){
					msg += '<li class="list-group-item"><div class="dot yellow-bgcolour" data-toggle="popover" data-placement="bottom" data-trigger="hover" data-content="'+data_dict[key]['friends'][i].match(regex).map(function (s) { return s; })+'"></div></li>';
				}
				msg += '</ul>';
				msg += '</td>';
				msg += '</tr>';

				$("#content_loader").append(msg)
			}

			$(function () {
			  $('[data-toggle="popover"]').popover()
			})
		}
	});



});

