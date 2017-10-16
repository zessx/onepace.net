var episode_data = {};
var captcha_response = "";

$(document).ready(function() {   
    $('.container').on('change', 'select.arcs', function() {
        changeArc();
    });
	
    $('.container').on('change', 'select.episodes', function() {
        var $option = $(this).find(":selected");
        if($option.attr('id')) {
            setStream();
        }
    });
    
    $(document).on('click', 'video', function() {
        this.paused ? this.play() : this.pause();
    });
    
    loadProgressBar();
});
function loadProgressBar() {
    var selector = '#main-header > .container > #top-progress';
    $.ajax({url:'/server/get_progress.php', success: function(data) {
        console.log('ss');
        var html = progressHtml(data);
        $(selector).append(html);
    }});
}
function progressHtml(data) {
    var i = 0;
    var html = '<table width="100%"><tr>';
    $.each(data, function(index, item) {
        if(i < 100) {
            if(item.is_progress) {
                html += '<td class="is-progress"></td>';
            } else {
                html += '<td class="not-progress"></td>';
            }
            i++;
        } else {
            i = 0;
            html += '</tr><tr>';
        }
    });

    html += '</tr></table>';
    return html;
}
function generatePost(identifier, header, body, footer) {
    var selector = 'article.entry-content.clearfix > p:last';
    
    return $.ajax({url:'/server/get_episode.php', data:{crc32:identifier}, success: function(data) {
        $(selector).append(episodeString(data, header, body, footer));
    }, error: function() {
        $.ajax({url:'/server/get_arc.php', data:{torrent_hash:identifier}, success: function(data) {
            $(selector).append(arcString(data, header, body, footer));
        }})
    }});
}
function episodeString(data, header, body, footer) {
    var resolution = data['resolution'] == '480p' ? '640x480' : '838x480';

    return (header ? '<h2>' + header + '</h2>' : '') +
        '<p>' +
            '<video poster="http://placehold.it/' + resolution + '/222/fff?text=►" controls src="/streams/' + data['crc32'] + '.mp4" style="width:100%;min-height:480px;"></video>'+
        '</p>' +
        '<div style="float:right;">'+
            (data['episodes'] ? '<div>Episodes: ' + data['episodes'] + '</div>' : '') +
        '</div>'+
        (data['torrent'] ? '<div><a class="small-button smallblue" href="' + data['torrent']['dir'] + '"><i class="fa fa-users"></i> Torrent</a>' +
        '<a class="small-button smallblue" href="' + data['torrent']['magnet'] + '"><i class="fa fa-magnet"></i> Magnet</a></div>' : '') +
        (data['arc_torrent'] ? '<div><a class="small-button smallblue" href="' + data['arc_torrent']['dir'] + '"><i class="fa fa-users"></i> Batch torrent</a>' +
        '<a class="small-button smallblue" href="' + data['arc_torrent']['magnet'] + '"><i class="fa fa-magnet"></i> Batch magnet</a></div>' : '') +
        (body ? '<p>' + body + '</p>' : '') +
        (footer ? '<p>' + footer + '</p>' : '')
    ;
}
function arcString(data, text, header, footer) {
    return (header ? '<h2>' + header + '</h2>' : '') +
        '<p>' + text + '</p>'+
        '<p>' + (data['torrent'] ?
            '<a class="small-button smallblue" href="' + data['torrent']['dir'] + '"><i class="fa fa-users"></i> Torrent</a>'+
            '<a class="small-button smallblue" href="' + data['torrent']['magnet'] + '"><i class="fa fa-magnet"></i> Magnet</a>' :
        '') + '</p>' +
        '<p>' + (footer ? footer : '') + '</p>';
}
function getRatio(now) {
    var secs = now.getSeconds() + (60 * now.getMinutes()) + (60 * 60 * now.getHours());
    
    return (3 <= now.getHours() && now.getHours() < 9)  ? secs / (9 * 3600) :
        (9 <= now.getHours() && now.getHours() < 15)    ? 1.0 :
        (15 <= now.getHours() && now.getHours() < 21)   ? secs / (21 * 3600) :
        0.0
    ;
}
function colorMiddle(from, to, ratio) {
    var ceil = function(from,to,ratio,start,end){ 
        return Math.ceil(parseInt(from.substring(start,end), 16) * ratio + parseInt(to.substring(start,end), 16) * (1-ratio));
    };
    var r = ceil(from,to,ratio,0,2);
    var g = ceil(from,to,ratio,2,4);
    var b = ceil(from,to,ratio,4,6);

    return hex(r) + hex(g) + hex(b);
}
function hex(color) {
    var x = color.toString(16);
    return (x.length === 1) ? '0' + x : x;
}

var content = '#content span.content';
function loadDownloads() {
    $('.loading').show();
    $.ajax({url: '/server/get_all.php', dataType: 'json'}).done(function(data) {
        $(content).html("");
        $(content).hide();
        $(content).animate({opacity:0});

        $.each(data['arcs'], function(i, arc) {
            if(arc['episodes'].length > 0) {
                var title =  (arc['chapters'] ? 'Chapter ' + arc['chapters'] + ': ' + arc['title'] + ' Arc' : arc['title']);
		
                $(content).append(
                    '<div style="margin-bottom:20px;" class="arc" id="' + i + '">'+
                        '<h4 style="border-bottom:1px solid #A7A2A2;padding-bottom:5px;">'+
                            title + (arc['torrent'] ? ' <a class="small-button smallblue" target="_blank" href="'+arc['torrent']['dir']+'"><i class="fa fa-users"></i> Torrent</a> <a class="small-button smallblue" href="'+arc['torrent']['magnet']+'"><i class="fa fa-magnet"></i> Magnet</a>' : '')+
                        '</h4>'+
                    '</div>'
                );

                $.each(arc['episodes'], function() {
                    $(content + ' > #' + i + '.arc').append(
                        '<div class="links">'+
                            (this['part_number'] ? 'Episode ' + this['part_number'] : this['title'])+
                            (this['torrent'] ? ' <a class="small-button smallblue" target="_blank" href="'+this['torrent']['dir']+'"><i class="fa fa-users"></i> Torrent</a> <a class="small-button smallblue" href="'+this['torrent']['magnet']+'"><i class="fa fa-magnet"></i> Magnet</a>' : '')+
                        '</div>'
                    );
                });
            }
        });
        
        $(content).animate({opacity:1.0,height:"toggle"}, 500, function() {
            $('.loading').hide();
        });
    });
}
function loadTorrents() {
    $('.loading').show();
    $.ajax({
        url: '/torrents/index.php',
        dataType: 'json'
    }).done(function(data) {
        $(content).html("");
        $(content).hide();
        $(content).animate({opacity:0});
		
        $.each(data, function(i, arc) {
            if(arc['torrents'].length > 0) {
                var title = (arc['chapters'] ? 'Chapter ' + arc['chapters'] + ': ' + arc['name'] + ' Arc' : arc['name']);
		
                $(content).append(
                    '<div style="margin-bottom:20px;" class="arc" id="' + i + '">'+
                        '<h4 style="border-bottom:1px solid #A7A2A2;padding-bottom:5px;">' + title + '</h4>'+
                    '</div>'
                );
                $.each(arc['torrents'], function() {
                    appendTorrent($(content + ' > #' + i + '.arc'), this);
                    
                });
            }
        });
        
        $(content).animate({opacity:1.0,height:"toggle"}, 500, function() {
            $('.loading').hide();
        });
    });
}

function appendTorrent($element, torrent) {
	var seeders = torrent['scrape']['seeders'];
	var leechers = torrent['scrape']['leechers'];
	var completed = torrent['scrape']['completed'];
			
	$element.append(
		'<div class="links">'+
			'<a href="' + torrent['dir']+'">' + torrent['display_name'] + '</a>'+
			'<br />'+
			'<a class="magnet-icon" href="' + torrent['magnet'] + '"><i class="fa fa-magnet"></i></a>'+
			'<span class="info">Size: ' + torrent['size'] +
				'<span style="margin-left:2em;">S: ' + seeders + '</span>'+
				'<span style="margin-left:2em;">L: ' + leechers + '</span>'+
				'<span style="margin-left:2em;">C: ' + completed + '</span>'+
			'</span>'+
		'</div>'
	);
}

function loadStreams() {
    var selector = 'article.entry-content.clearfix > p:last';
    $(selector).append(streamString());

    $.ajax({url: "/server/get_all.php", dataType: 'json'}).done(function(data) {
        episode_data = data;
		
        setArcsSelector();
        changeArc();
    });
}
function streamString() {
    var s =
    '<select class="arcs">'+
        '<option>Loading...</option>'+
    '</select> '+
    '<select class="episodes">'+
        '<option>Loading...</option>'+
    '</select>'+
    '<img class="streaming-thingy" src="http://placehold.it/838x480/222/fff?text=Loading..." />'+
    '<div style="float:right;">'+
        '<div style="display:none;" class="episodes-with-label">'+
            'Episodes: <span class="episodes">100-101</span>'+
        '</div>'+
    '</div>'+
    '<div>'+
        '<div>'+
            '<a class="torrent-button small-button smallblue" href="javascript:void(0);">'+
                '<i class="fa fa-download"></i> Torrent'+
            '</a> '+
            '<a class="magnet-button small-button smallblue" href="javascript:void(0);">'+
                '<i class="fa fa-magnet"></i> Magnet'+
            '</a>'+
        '</div>'+
        '<div>'+
            '<a class="torrent-batch-button small-button smallblue" href="javascript:void(0);">'+
                '<i class="fa fa-download"></i> Batch torrent'+
            '</a> '+
            '<a class="magnet-batch-button small-button smallblue" href="javascript:void(0);">'+
                '<i class="fa fa-magnet"></i> Batch magnet'+
            '</a>'+
        '</div>'+
    '</div>';

    return s;
}

var selectedArc = {};
function setArcsSelector() {
    var c = getCookie('last-stream');
    var remembered = false;

    $('select.arcs').html('');
    $.each(episode_data['arcs'], function(i) {
        selectedArc = this;
        
        var title = (this['chapters'] ? 'Chapter ' + this['chapters'] + ': ' + this['title'] + ' Arc' : this['title']);
		if(this['completed'] !== true) {
			title += ' (Incomplete)';
		}
		
        $('select.arcs').append('<option id="' + this['id'] + '">' + title + '</option>');

        if(typeof c !== 'undefined' && c != null && !remembered) {
            var id = c.substr(0, c.indexOf(','));
            if(this['id'] == id) {
                $('select.arcs')[0].selectedIndex = i;
                selectedArc = this;
                remembered = true;
            }
        }
    });

    if(!remembered) {
        $('select.arcs')[0].selectedIndex = 0;
    }
}
function changeArc() {
    setEpisodesSelector();
    setStream();
}
function setEpisodesSelector() {
    var $option = $('select.arcs').find(":selected");
    if($option.attr('id')) {
        var arc_id = $option.attr('id');
        var arc = find(episode_data['arcs'], 'id', arc_id);
        selectedArc = arc;
		
        if(arc['torrent']) {
            $('.magnet-batch-button').attr('href', arc['torrent']['magnet']);
            $('.magnet-batch-button').show();
            $('.torrent-batch-button').attr('href',arc['torrent']['dir']);
            $('.torrent-batch-button').show();
        } else {
            $('.magnet-batch-button').hide();
            $('.magnet-batch-button').attr('href','');
            $('.torrent-batch-button').hide();
            $('.torrent-batch-button').attr('href','');
        }
        
        $('select.episodes').html('<option>Episode</option>');
        if(arc) {
            var episodes = arc['episodes'];            
            var c = getCookie('last-stream');
            var remembered = false;
            
            $.each(episodes, function(i, episode) {
                var title = '';

                if(episode['chapters']) {
                    title += 'Chapter ' + episode['chapters'];
                } else if(episode['title']) {
                    title += episode['title'];
                }

                if(i == 0) {
                    $('select.episodes').html('<option id="' + episode['crc32'] + '">' + title + '</option>');
                } else {
                    $('select.episodes').append('<option id="' + episode['crc32'] + '">' + title + '</option>');
                }

                if(typeof c !== 'undefined' && c != null && !remembered) {
                    var id = c.substr(c.indexOf(',')+1);
                    if(episode['crc32'] == id) {
                        $('select.episodes')[0].selectedIndex = i;
                        remembered = true;
                    }
                }
            });

            if(!remembered) {
                $('select.episodes')[0].selectedIndex = 0;
            }

            $('select.episodes').show();
        }
    } else {
        return null;
    }
}

var selectedEpisode = {};
function setStream() {
    var $arc = $('select.arcs').find(":selected");
    var $option = $('select.episodes').find(":selected");
    var file = $option.attr('id');
    var episode = find(selectedArc['episodes'], 'crc32', file);
    selectedEpisode = episode;
    
    if(episode['torrent']) {
        $('a.torrent-button').show();
        $('a.torrent-button').attr('href',episode['torrent']['dir']);
        $('a.magnet-button').show();
        $('a.magnet-button').attr('href',episode['torrent']['magnet']);
    } else {
        $('a.torrent-button').hide();
        $('a.torrent-button').attr('href','');
        $('a.magnet-button').hide();
        $('a.magnet-button').attr('href','');
    }
    
	var resolution = episode['resolution'] == '480p' ? '640x480' : '838x480';
	
    if(episode['chapters']) {
        $('span.chapters').text(episode['chapters']);
        $('div.chapters-with-label').show();
    } else {
        $('div.chapters-with-label').hide();
    }

    if(episode['episodes']) {
        $('span.episodes').text(episode['episodes']);
        $('div.episodes-with-label').show();
    } else {
        $('div.episodes-with-label').hide();
    }

    $('img.streaming-thingy').replaceWith('<video controls poster="http://placehold.it/' + resolution + '/222/fff?text=►" style="width:100%;min-height:480px;" class="streaming-thingy" src="/streams/' + $option.attr('id') + '.mp4"></video>');
    $('video.streaming-thingy').replaceWith('<video controls poster="http://placehold.it/' + resolution + '/222/fff?text=►" style="width:100%;min-height:480px;" class="streaming-thingy" src="/streams/' + $option.attr('id') + '.mp4"></video>');
    var cvalue = $arc.attr('id')+','+$option.attr('id');
    if(getCookie('last-stream') !== cvalue) {
        setCookie('last-stream',cvalue,30);
    }
}

function naturalSorter(as, bs) {
    var a, b, a1, b1, i= 0, n, L,
    rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if(as === bs) return 0;
    a= as.toLowerCase().match(rx);
    b= bs.toLowerCase().match(rx);
    L= a.length;
    while(i<L){
        if(!b[i]) return 1;
        a1= a[i],
        b1= b[i++];
        if(a1!== b1){
            n= a1-b1;
            if(!isNaN(n)) return n;
            return a1>b1? 1:-1;
        }
    }
    return b[i]? -1:0;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function find(objects, key, value) {
    for(var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if(object[key] == value) {
            return object;
        }
    }
    
    return null;
}
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
Array.prototype.switch = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};
Array.prototype.move = function (from_index, to_index) {
    if (to_index >= this.length) {
        for(var i = from_index; i <= to_index; i++) {
            if(i < to_index) {
                this.switch(i, i+1);
            }
        }
    }
    return this;
};