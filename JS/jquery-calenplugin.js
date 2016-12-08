;(function($,window,undefined){
	$.fn.calenPlugin = function(options){
		var calen = new Calen(this,options);
		return calen.init();
	}
	function Calen(ele,opt){
		this.ele = ele;
		this.tableBox = $('<div class="box"></div>');
		this.options = opt;
		this.defaults = {
			elem : this.ele,
		};
		this.options = $.extend({},this.defaults,opt);
		this.selectedMonth = new Date().getMonth() + 1;
		this.selectedYear = new Date().getFullYear();
	};
	Calen.prototype = {
		init:function(){
			var sel = $('<div class="sel"></div>');
				selYear = $('<select class="sel_year"></select>'),
				selMonth = $('<select class="sel_month"></select>');
			for(var i=-25;i<25;i++){
				var option = $('<option value="'+(new Date().getFullYear()+i)+'">'+(new Date().getFullYear()+i)+'</option>');
				option.appendTo(selYear);
			};
			for(var i=1;i<=12;i++){
				var option = $('<option value="'+i+'">'+i+'</option>');
				option.appendTo(selMonth);
			}
			sel.append(selYear);
			sel.append(selMonth);
			this.ele.append(sel);
			$('.sel_year').val(new Date().getFullYear());
			$('.sel_month').val(new Date().getMonth()+1);
			this.slectChange();
		},

		slectChange:function(){
			var _self = this;

			$('.sel_year').change(function(){
				_self.selectedYear = $(this).val();
				_self.renderTable();
			});
			$('.sel_month').change(function(){
				_self.selectedMonth = $(this).val();
				_self.renderTable();
			});
			_self.renderTable();
		},

		renderTable:function(){
			this.tableBox.html('');
			this.ele.append(this.tableBox);
			var table = $('<table class="calen_table"></table>');
			var html = '<thead><tr>';
			var totalDay = new Date(this.selectedYear,this.selectedMonth,0).getDate();

			var pervMonth = this.selectedMonth -1 < 1 ? 12 : this.selectedMonth -1;
			var prevYear = this.selectedMonth -1 < 1 ? this.selectedYear - 1 : this.selectedYear;
			var prevToDay = new Date(prevYear,pervMonth,0).getDate();
			var firWeek = new Date(this.selectedYear+'-'+this.selectedMonth).getDay();
			var weekArry = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
			for(var i=0;i<weekArry.length;i++){
				html += '<td>'+weekArry[i]+'</td>';
			};
			html += '</tr><thead><tbody><tr>';
			for(var i=1;i<=firWeek;i++){
				html +='<td class="prevDay">'+(prevToDay+i-firWeek)+'</td>';
			}
			for (i=1; i<=totalDay; i++){
				html += '<td>' + i + '</td>';
				firWeek = (firWeek + 1)%7;
				if ((firWeek==0) && (i!=totalDay)){
					html += '</tr><tr>';
				};
				if(i==totalDay&&firWeek!=0){
					var j = 7-firWeek;
					for(var s = 1;s<=j;s++){
						html += '<td class="prevDay">'+s+'</td>';
					}
				};
			}
			html+='</tr></tbody></table>';
			table.html(html);
			table.appendTo(this.tableBox);
		}
	}
}(jQuery,window));