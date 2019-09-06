var client;
$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
            client = _client;
            client.events.on("app.activated",
                function() {
                    //Your code here
			//Global Data API
			client.data.get('loggedInUser').then(function(data)
			{
				console.log('Global data api: loggedInUser:', data.loggedInUser.email);
				$("input[name='c2c_agent'").val(data.loggedInUser.email);
			}, function(e) {
					console.log('Exception - ', e);
			});

c2c_post();
c2c_hangup();
c2c_pause();
c2c_resume();

                   
                });
        });
});

function openModal() {
    client.interface.trigger('showModal', {title: 'Add Integration Action', template: 'modal.html'});
}

function closePopup() {
    client.instance.close();
}

function displayMessage(type, message) {
    client.interface.trigger('showNotify', { type: type, message: message});
}

function c2c_post()
{
	var c2c_agent_js= document.getElementById("c2c_agent").value;
	var c2c_phno_js= document.getElementById("c2c_phno").value;
	var c2c_domain_js= document.getElementById("c2c_domain").value;
	if(c2c_domain_js !==null && c2c_domain_js !=='')
	{
		if( c2c_phno_js !==null && c2c_phno_js !=='' )
		{
			if( (c2c_agent_js !==null && c2c_agent_js !=='') && (c2c_phno_js !==null && c2c_phno_js !=='') )
			{
				var url = c2c_domain_js+"/asttecs_c2c/freshsale_click2call.php?email="+c2c_agent_js+"&number_todial="+c2c_phno_js;	
				var post_data="email="+c2c_agent_js+"&number_todial="+c2c_phno_js;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// alert(this.responseText);
					var resp_c2c= JSON.parse(this.responseText);
					var resp_c2c_error=resp_c2c.ERROR;
					displayMessage('danger',resp_c2c_error);
					 
					var resp_c2c_success=resp_c2c.SUCCESS;
					displayMessage('success',resp_c2c_success);
					 
					}
				};
				xhttp.open("POST", url, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(post_data);
			}
		}
		else
		{
				displayMessage('danger','Phone-Number Empty'); 
		}
	}
	else
	{
		displayMessage('danger','Vicidial-WebDomain Empty'); 
	}
	
}//--endof fun

function c2c_hangup()
{
	var c2c_agent_js= document.getElementById("c2c_agent").value;
	var c2c_phno_js= document.getElementById("c2c_phno").value;
	var c2c_domain_js= document.getElementById("c2c_domain").value;
	if(c2c_domain_js !==null && c2c_domain_js !=='')
	{
		if( c2c_phno_js !==null && c2c_phno_js !=='' )
		{
			if( (c2c_agent_js !==null && c2c_agent_js !=='') && (c2c_phno_js !==null && c2c_phno_js !=='') )
			{
				var url = c2c_domain_js+"/asttecs_c2c/freshsale_hangup.php?email="+c2c_agent_js;	
				var post_data="email="+c2c_agent_js;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// alert(this.responseText);
					var resp_hangup= JSON.parse(this.responseText);
					
					var resp_hangup_error=resp_hangup.ERROR;
					displayMessage('danger',resp_hangup_error);
					 
					var resp_hangup_success=resp_hangup.SUCCESS;
					displayMessage('success',resp_hangup_success);
					 
					}
				};
				xhttp.open("POST", url, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(post_data);
			}
		}
		else
		{
				displayMessage('danger','Phone-Number Empty'); 
		}
	}
	else
	{
		displayMessage('danger','Vicidial-WebDomain Empty'); 
	}
	
}//--endof fun


function c2c_pause()
{
	var c2c_agent_js= document.getElementById("c2c_agent").value;
	var c2c_phno_js= document.getElementById("c2c_phno").value;
	var c2c_domain_js= document.getElementById("c2c_domain").value;
	if(c2c_domain_js !==null && c2c_domain_js !=='')
	{
		if( c2c_phno_js !==null && c2c_phno_js !=='' )
		{
			if( (c2c_agent_js !==null && c2c_agent_js !=='') && (c2c_phno_js !==null && c2c_phno_js !=='') )
			{
				var url = c2c_domain_js+"/asttecs_c2c/freshsale_pause_resume.php?email="+c2c_agent_js+"&action=PAUSE";	
				var post_data="email="+c2c_agent_js+"&action=PAUSE";
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// alert(this.responseText);
					var resp_pause= JSON.parse(this.responseText);
					
					var resp_pause_error=resp_pause.ERROR;
					displayMessage('danger',resp_pause_error);
					 
					var resp_pause_success=resp_pause.SUCCESS;
					if(resp_pause_success!==null || resp_pause_success !=='')
					{
						displayMessage('success',resp_pause_success); 
						
						var image = document.getElementById('pause_img');
							if (image.src.match("vdc_LB_pause_OFF.gif")) {
								image.src = "vdc_LB_pause.gif";
								} else {
								image.src = "vdc_LB_pause_OFF.gif";
							}
							
							var image = document.getElementById('resume_img');
							if (image.src.match("vdc_LB_resume_OFF.gif")) {
								image.src = "vdc_LB_resume.gif";
								} else {
								image.src = "vdc_LB_resume_OFF.gif";
							}
					}
					
					
					
					}
				};
				xhttp.open("POST", url, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(post_data);
			}
		}
		else
		{
				displayMessage('danger','Phone-Number Empty'); 
		}
	}
	else
	{
		displayMessage('danger','Vicidial-WebDomain Empty'); 
	}
	
}//--endof fun


function c2c_resume()
{
	var c2c_agent_js= document.getElementById("c2c_agent").value;
	var c2c_phno_js= document.getElementById("c2c_phno").value;
	var c2c_domain_js= document.getElementById("c2c_domain").value;
	if(c2c_domain_js !==null && c2c_domain_js !=='')
	{
		if( c2c_phno_js !==null && c2c_phno_js !=='' )
		{
			if( (c2c_agent_js !==null && c2c_agent_js !=='') && (c2c_phno_js !==null && c2c_phno_js !=='') )
			{
				var url = c2c_domain_js+"/asttecs_c2c/freshsale_pause_resume.php?email="+c2c_agent_js+"&action=RESUME";	
				var post_data="email="+c2c_agent_js+"&action=RESUME";
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// alert(this.responseText);
					var resp_resume= JSON.parse(this.responseText);
					
					var resp_resume_error=resp_resume.ERROR;
					displayMessage('danger',resp_resume_error);
					 
					var resp_resume_success=resp_resume.SUCCESS;
					
					if(resp_resume_success !==null || resp_resume_success !=='' )
					{
							displayMessage('success',resp_resume_success);
							 
							var image = document.getElementById('pause_img');
							if (image.src.match("vdc_LB_pause_OFF.gif")) {
								image.src = "vdc_LB_pause.gif";
								} else {
								image.src = "vdc_LB_pause_OFF.gif";
							}
							
							var image = document.getElementById('resume_img');
							if (image.src.match("vdc_LB_resume_OFF.gif")) {
								image.src = "vdc_LB_resume.gif";
								} else {
								image.src = "vdc_LB_resume_OFF.gif";
							}
					}
					
					}
				};
				xhttp.open("POST", url, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(post_data);
			}
		}
		else
		{
				displayMessage('danger','Phone-Number Empty'); 
		}
	}
	else
	{
		displayMessage('danger','Vicidial-WebDomain Empty'); 
	}
	
}//--endof fun


