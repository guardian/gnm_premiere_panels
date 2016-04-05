var basepath = '/Volumes/Project_Files_MultiMedia/WatchersDevSystem/premiereexportopluto/';$._PPP_={	getVersionInfo : function() {		return 'PPro ' + app.version + 'x' + app.build;	},	getUserName : function() {		var homeDir = new File('~/');		return homeDir.displayName;	},    getSep : function() {		if (Folder.fs == 'Macintosh') {		    return '/';		} else {			return '\\';		}	},	getActiveSequenceName : function() {    	if (app.project.activeSequence) {		    return app.project.activeSequence.name;		} else {	    	return "No active sequence."		}    },    	testFunction : function() {		return "Test Worked";	},		getDocName : function() {		//return app.documents.length ? app.activeDocument.name : "No docs open!";		return 'Test';	},        	getRenderPresets : function() {		var homeDir = new File('~/');		var username = homeDir.displayName;		var presetPath = Folder("/Users/"+username+"/Documents/Adobe/Adobe\ Media\ Encoder/9.0/Presets/");				if (presetPath.exists == false){			var presetPath = Folder("/Users/"+username+"/Documents/Adobe/Adobe\ Media\ Encoder/8.0/Presets/");		}				var files = presetPath.getFiles("*.epr")				var arraysize = 0;				var presets = [];				//for (i = 0; i < files.length; i++) {		//	var data = files[i];	//		     //   	var input = data.replace(/^.*[\\\/]/, '');						    	//	presets.push(input);		//}		return files;    },        	plutoexport : function(preset,name) {		$._PPP_.exportFCPXML(name);		//$._PPP_.saveXML(name);		//var usethis = $._PPP_.getRenderPresets();		//var ready = usethis[preset];		//alert(name);		$._PPP_.render(preset,name);	},        exportFCPXML : function(name) {        if (app.project.activeSequence) {                    var projPath   		= new File(app.project.path);            var parentDir  		= projPath.parent;            //var outputName    	= app.project.activeSequence.name;            var outputName    	= name;        	var xmlExtension   	= '.xml';            //var outputPath = Folder('/Users/dave/Documents/pet');            var outputPath = Folder('/Volumes/Multimedia2/Master\ Outputs');					if (outputPath) {	            var completeOutputPath = outputPath.fsName + $._PPP_.getSep() + outputName + xmlExtension;	        		        	app.project.activeSequence.exportAsFinalCutProXML(completeOutputPath, 1); // 1 == suppress UI	            var info = 	"Exported FCP XML for " + 	            			app.project.activeSequence.name + 	            			" to " + 	            			completeOutputPath + 	            			".";	            //alert(info);	        } else {	        	alert("No output path chosen.")	        }        } else {        	alert("No active sequence.");        }    },        saveXML : function(name,video,job) {        if (app.project.activeSequence) {                    var projPath   		= new File(app.project.path);            var parentDir  		= projPath.parent;            var outputName    	= job;        	var xmlExtension   	= '.xml';        	var user 			= $.getenv("USER");        	//var user			= 'dave_test'            //var outputPath = Folder('/Users/dave/Documents/pex');            //var outputPath = Folder('/Volumes/Project_Files_MultiMedia/WatchersDevSystem/premiereexportopluto');            var outputPath = Folder('/tmp');					if (outputPath) {	            var completeOutputPath = outputPath.fsName + $._PPP_.getSep() + outputName + xmlExtension;	            	            var pnameo = app.project.name;	            	            var pname = pnameo.slice(0, -7);	        		        	//var testXMLdata = '<xs:schema elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Test_Data"><xs:complexType><xs:sequence><xs:element name="xml" type="xs:string">'+name+'.xml</xs:element><xs:element name="video" type="xs:string">'+video+'</xs:element><xs:element name="Section" type="xs:string">News</xs:element></xs:sequence></xs:complexType></xs:element></xs:schema>';	        	var testXMLdata = '<?xml version="1.0" encoding="UTF-8"?><meta-data xmlns:vs="http://xml.vidispine.com/schema/vidispine"><meta name="xml" value="'+name+'.xml"/><meta name="video" value="'+video+'"/><meta name="project" value="'+pname+'"/><meta name="user" value="'+user+'"/></meta-data>';	        		        	var xmlfile = new File (completeOutputPath);	        		        	xmlfile.open('w', undefined, undefined);	        					xmlfile.write(testXMLdata);	        	       		            var info = 	"Exported FCP XML for " + 	            			app.project.activeSequence.name + 	            			" to " + 	            			completeOutputPath + 	            			".";	            //alert(info);	        } else {	        	alert("No output path chosen.")	        }        } else {        	alert("No active sequence.");        }    },		render : function(preset,name) {		        app.enableQE();        		var activeSequence = qe.project.getActiveSequence();  // we use a QE DOM function, to determine the output extension.				if (activeSequence)	{			app.encoder.launchEncoder();	// This can take a while; let's get the ball rolling.			var timeSecs                = activeSequence.CTI.secs;		// Just for reference, here's how to access the CTI 			var timeFrames              = activeSequence.CTI.frames;	// position, for the active sequence. 			var timeTicks               = activeSequence.CTI.ticks;			var timeString    			= activeSequence.CTI.timecode;			//var seqInPoint	= app.project.activeSequence.getInPoint();	// new in 9.0			//var seqOutPoint	= app.project.activeSequence.getOutPoint();	// new in 9.0			var projPath   	= new File(app.project.path);			var outputPath = Folder('/Volumes/Multimedia2/Master\ Outputs');			//var outputPath  = Folder('/Users/dave/Documents/pet');			if ((outputPath) && projPath.exists){							var homeDir = new File('~/');				var username = homeDir.displayName;							//var outputPresetPath = "/Users/"+username+"/Documents/Adobe/Adobe\ Media\ Encoder/9.0/Presets/Guardian\ Mastering\ Standard.epr";				//var outputPresetPath = "/Users/"+username+preset;				var outputPresetPath = preset;														//if (Folder.fs == 'Macintosh') {				//	var outputPresetPath = "/Applications/Adobe\ Premiere\ Pro\ CC\ 2015/Adobe\ Premiere\ Pro\ CC\ 2015.app/Contents/MediaIO/systempresets/58444341_4d584658/XDCAMHD\ 50\ NTSC\ 60i.epr";				//} else {				//	var outputPresetPath	= "C:\\Program Files\\Adobe\\Adobe Media Encoder CC 2015\\MediaIO\\systempresets\\58444341_4d584658\\XDCAMHD 50 NTSC 60i.epr";			//}								var outPreset  		= new File(outputPresetPath);				if (outPreset.exists == true){								var outputFormatExtension   	= 	activeSequence.getExportFileExtension(outPreset.fsName);								if (outputFormatExtension){						var fullPathToFile 	= 	outputPath.fsName + 												$._PPP_.getSep() + 												name + 												"." + 												outputFormatExtension;												app.encoder.bind('onEncoderJobComplete',	$._PPP_.onEncoderJobComplete);						app.encoder.bind('onEncoderJobError', 		$._PPP_.onEncoderJobError);						app.encoder.bind('onEncoderJobProgress', 	$._PPP_.onEncoderJobProgress);						app.encoder.bind('onEncoderJobQueued', 		$._PPP_.onEncoderJobQueued);						// use these 0 or 1 settings to disable some/all metadata creation.						app.encoder.setSidecarXMPEnabled(0);						app.encoder.setEmbeddedXMPEnabled(0);												var jobID = app.encoder.encodeSequence(	app.project.activeSequence,																fullPathToFile,																outPreset.fsName,																app.encoder.ENCODE_WORKAREA, // app.encoder.ENCODE_ENTIRE, app.encoder.ENCODE_IN_TO_OUT);																1); // remove upon completion						$._PPP_.message('jobID = ' + jobID);						outPreset.close();											}				} else {					alert("Could not find output preset.");				}			} else {				alert("Could not find/create output path.");			}			projPath.close();			var video = name + "." + outputFormatExtension;			$._PPP_.saveXML(name,video,jobID);					} else {			alert("No active sequence.");		}	},	message : function (msg) {		 //$.writeln(msg);	 // Using '$' object will invoke ExtendScript Toolkit, if installed.	},	onEncoderJobComplete : function (jobID, outputFilePath) {		if (Folder.fs == 'Macintosh') {			var eoName = "PlugPlugExternalObject";									} else {			var eoName = "PlugPlugExternalObject.dll";		}						var mylib 	 = new ExternalObject('lib:' + eoName);		var eventObj = new CSXSEvent();		eventObj.type = "com.adobe.csxs.events.PProPanelRenderEvent";		//eventObj.data = "Rendered Job " + jobID + ", to " + outputFilePath + ".";		//eventObj.data = "Export complete, your master page in Pluto will be ready shortly.";    	//eventObj.dispatch();    	    	var xmlfile = File ('/tmp/'+jobID+'.xml');    	xmlfile.copy (basepath+jobID+'.xml');    	alert("Export complete, your master page in Pluto will be ready shortly.");    		},		onEncoderJobError : function (jobID, errorMessage) {		if (Folder.fs == 'Macintosh') {			var eoName = "PlugPlugExternalObject";									} else {			var eoName = "PlugPlugExternalObject.dll";		}						var mylib 	 = new ExternalObject('lib:' + eoName);		var eventObj = new CSXSEvent();		eventObj.type = "com.adobe.csxs.events.PProPanelRenderEvent";		eventObj.data = "Job " + jobID + " failed, due to " + errorMessage + ".";    	eventObj.dispatch();	},		onEncoderJobProgress : function (jobID, progress) {		var msg = 	'onEncoderJobProgress called' +					'. jobID = ' + 					jobID +					'. progress = ' + 					progress;							$._PPP_.message(msg);	},	onEncoderJobQueued : function (jobID) {	    app.encoder.startBatch();	},		badfilename : function () {	    alert("The file name is not legal. Please type some text after the date.");	},		badfilenamedate : function () {	    alert("The file name is not legal. Please type a six character date (YYMMDD) at the start of file name.");	},	};