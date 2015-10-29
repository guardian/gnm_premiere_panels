﻿$._ext_GNMPanel={	getVersionInfo : function() {		//return 'PPro ' + app.version + 'x' + app.build;         return '0.1';	},	loadPTR : function() {		//if (Folder.fs == 'Macintosh'){		//	var filterString = "";		//} else {		//	var filterString = "All files:*.*";		//}       // var fTest = new Folder ('/Volumes/Multimedia2/Media Production/Assets/Multimedia_Central_Resources/');        		//var projToOpen = File.openDialog ("Choose project:", filterString, false);        //fTest.execute();                var pName = app.project.name;                var nWE = pName.slice(0, -7);                //alert(nWE);                 //       var cFolder = Folder.temp;         //       alert(cFolder);         var pathAll = app.project.path; //        var curFolder = cFolder.fsName;         var pathFixed = pathAll.slice(0, -7);              //  alert(pathFixed);                //var fName = new File ('/Volumes/Proxies2/Projects/'+nWE+'.ptr');                var fName = new File (pathFixed+'.ptr');                if (fName.exists == true) {               // alert('exists')            }        else {               // alert('does not exist')            }                fName.open();                var fData = fName.read();               // alert(fData);                var fFixed = fData.slice(4);                //alert(fFixed);                var folderPath = new Folder ('/Volumes'+fFixed);                //alert(folderPath);                folderPath.execute();            		//if ((projToOpen) && projToOpen.exists) {		//	app.openDocument(projToOpen.fsName);		//	projToOpen.close();		//}		},    	getPathInfo : function() {        var pName = app.project.name;                var nWE = pName.slice(0, -7);                //alert(nWE);               //var fName = new File ('/Volumes/Proxies2/Projects/'+nWE+'.ptr');              var pathAll = app.project.path;              var pathFixed = pathAll.slice(0, -7);              var fName = new File (pathFixed+'.ptr');                if (fName.exists == true) {                //alert('exists')            }        else {               // alert('does not exist')            }                fName.open();                var fData = fName.read();               // alert(fData);                var fFixed = fData.slice(4);                //alert(fFixed);                var folderPath = new Folder ('/Volumes'+fFixed);                var fPath = folderPath.fullName;        var fPathFixed = fPath.replace("%20"," ");            return fPathFixed;         	},	updateGrowingFile : function() {		var numItems = app.project.rootItem.children.numItems;		var currentItem = 0;		for (var i = 0; i < numItems; i++){		    currentItem = app.project.rootItem.children[i];		    if (currentItem != null){		        currentItem.refreshMedia();		    }		}	},    getSep : function() {		if (Folder.fs == 'Macintosh') {		    return '/';		} else {			return '\\';		}	},	saveProject : function() {		app.project.save();	},    exportCurrentFrameAsPNG : function() {        app.enableQE();	 									        var activeSequence 		= qe.project.getActiveSequence(); 	// note: make sure a sequence is active in PPro UI        if (activeSequence) {	        var time 		= activeSequence.CTI.timecode; 	// CTI = Current Time Indicator.	        var outputPath  = new File("~/Desktop");			var outputFileName = outputPath.fsName + $._ext_GNMPanel.getSep() + time + '_' + activeSequence.name;            activeSequence.exportFramePNG(time, outputFileName);            outputFileName = outputFileName + '.png';	// exportFramePNG() added the .png extension, AFTER we called exportFramePNG.		} else {			alert("Active sequence required.");		}	},    renameFootage : function() {				// Sample code assumes the zero-th item in the project is footage.		var item = app.project.rootItem.children[0]; 				if (item == null) {			alert("No project items found.");		} else {			alert("Changing name of " + item.name + ".");			item.name = item.name + ", updated by GNMPanel.";		}	},	getActiveSequenceName : function() {    	if (app.project.activeSequence) {		    return app.project.activeSequence.name;		} else {	    	return "No active sequence."		}    },        exportSequenceAsPrProj : function() {				var activeSequence = app.project.activeSequence;			if (activeSequence) {		    			// Here's how to get the start time offset to a sequence.			var startTimeOffset	= activeSequence.zeroPoint;		    var prProjExtension = '.prproj';		    			var outputName 		= activeSequence.name;		    			var outFolder = Folder.selectDialog();				    if (outFolder) {                var completeOutputPath =	outFolder.fsName +                                  	     	$._ext_GNMPanel.getSep() +                                      		outputName +                                      		prProjExtension;							app.project.activeSequence.exportAsProject(completeOutputPath);					    var info = "Exported " + app.project.activeSequence.name + " to " + completeOutputPath + ".";			    alert(info);			} else {				alert("Could not find/create output folder.");			}			// Here's how to import N sequences from a project.			//			// var seqIDsToBeImported = new Array;			// seqIDsToBeImported[0] = ID1;			// ...			// seqIDsToBeImported[N] = IDN;			//			//app.project.importSequences(pathToPrProj, seqIDsToBeImported);		} else {		    alert("No active sequence.");		}	},	createSequenceMarkers : function() {	    var activeSequence = app.project.activeSequence;	    	    if (activeSequence) {		    var markers		= activeSequence.markers; 			    if (markers) {			    var numMarkers	= markers.numMarkers;                if (numMarkers > 0) {                    var marker_index = 1;                                        for(var current_marker = 	markers.getFirstMarker();                     		current_marker !=	undefined; 							current_marker =	markers.getNextMarker(current_marker)){                        if (current_marker.name != "") {                            alert(	'Marker ' +                             		marker_index +                             		' name = ' +                            		current_marker.name +                             		'.');                        } else {                            alert(	'Marker ' +                             		marker_index +                             		' has no name.');                        }                                            if (current_marker.end.seconds > 0) {                            alert(	'Marker ' +                             		marker_index +                             		' duration = ' +                            		(current_marker.end.seconds - current_marker.start.seconds) +                             		' seconds.');                        } else {                            alert(	'Marker ' +                             		marker_index +                             		' has no duration.');                        }                        alert(	'Marker ' +                         		marker_index +                         		' starts at ' +                         		current_marker.start.seconds +                         		' seconds.');                                                marker_index = marker_index + 1;				    }				 }			}				var new_comment_marker  		= markers.createMarker(12.345);			new_comment_marker.name 		= 'Marker created by GNMPanel.';			new_comment_marker.comments 	= 'Here are some comments, inserted by GNMPanel.';			new_comment_marker.end 			= 15.6789;			var new_web_marker  		= markers.createMarker(14.345);			new_web_marker.name 		= 'Web marker created by GNMPanel.';			new_web_marker.comments 	= 'Here are some comments, inserted by GNMPanel.';			new_web_marker.end			= 15.6789;			new_web_marker.setTypeAsWebLink("http://www.adobe.com", "frame target");	    }	},	    exportFCPXML : function() {        if (app.project.activeSequence) {                    var projPath   		= new File(app.project.path);            var parentDir  		= projPath.parent;            var outputName    	= app.project.activeSequence.name;        	var xmlExtension   	= '.xml';            var outputPath = Folder.selectDialog("Choose the output directory");					if (outputPath) {	            var completeOutputPath = outputPath.fsName + $._ext_GNMPanel.getSep() + outputName + xmlExtension;	        		        	app.project.activeSequence.exportAsFinalCutProXML(completeOutputPath, 1); // 1 == suppress UI	        		            var info = 	"Exported FCP XML for " + 	            			app.project.activeSequence.name + 	            			" to " + 	            			completeOutputPath + 	            			".";	            alert(info);	        } else {	        	alert("No output path chosen.")	        }        } else {        	alert("No active sequence.");        }    },		openInSource : function() {        app.enableQE();				var fileToOpen = File.openDialog ("Choose file to open.", 0, false);		if (fileToOpen) {			qe.source.openFilePath(fileToOpen.fsName);			qe.source.player.play(); 		}	},	searchForBinWithName : function (nameToFind) {        var numItemsAtRoot	= app.project.rootItem.children.numItems;        var foundBin 		= 0;                      for (var i = 0; (numItemsAtRoot >0) && (i < numItemsAtRoot) && (foundBin == 0); i++) {                var currentItem = app.project.rootItem.children[i];                          if ((currentItem) && currentItem.name == nameToFind) {                    foundBin = currentItem;                }            }            return foundBin;    },	importFiles : function() {        		if (app.project) {			// If panel can't find the target bin, it creates it.			var nameToFind = 'Targeted by GNMPanel import';			var targetBin = $._ext_GNMPanel.searchForBinWithName(nameToFind);			if (targetBin === 0) {				app.project.rootItem.createBin(nameToFind);				targetBin = $._ext_GNMPanel.searchForBinWithName(nameToFind);			}			if (targetBin){						targetBin.select();            	app.project.createNewSequence('hack', '456');				var fileOrFilesToImport = File.openDialog ("Choose files to import", 0, true);							if (fileOrFilesToImport) {									// We have an array of File objects; importFiles() takes an array of paths.											var importThese = new Array;									for (var i = 0; i < fileOrFilesToImport.length; i++) {						importThese[i] = fileOrFilesToImport[i].fsName;					}					app.project.importFiles(importThese);					}			}			}		},		replaceMedia : function() {		// Warning: Currently, sample code assumes the zero-th item in the project is footage.		var firstProjectItem = app.project.rootItem.children[0]; 				if ((firstProjectItem) && 			firstProjectItem.canChangeMediaPath()) {						/* 	NEW in 9.0: setScaleToFrameSize() ensures that for all clips created from this footage, 				auto scale to frame size will be ON, regardless of the current user preference. 				This is	important for proxy workflows, to avoid mis-scaling upon replacement. */						firstProjectItem.setScaleToFrameSize();						var replacementMedia = File.openDialog(	"Choose new media file, for " + 													firstProjectItem.name, 														0, 														false);						if (replacementMedia) {				firstProjectItem.name = replacementMedia.name + ", formerly known as " + firstProjectItem.name;				firstProjectItem.changeMediaPath(replacementMedia.fsName);				replacementMedia.close(); 			}		} else {			alert("Couldn't change path of " + firstProjectItem.name + ".");		}	},		openProject : function() {		if (Folder.fs == 'Macintosh'){			var filterString = "";		} else {			var filterString = "All files:*.*";		}		var projToOpen = File.openDialog ("Choose project:", filterString, false);		if ((projToOpen) && projToOpen.exists) {			app.openDocument(projToOpen.fsName);			projToOpen.close();		}		},	exportFramesForMarkers : function (){				app.enableQE();	    var activeSequence = app.project.activeSequence;	    	    if (activeSequence) {		    var markers		= activeSequence.markers; 		    var markerCount	= markers.numMarkers;		    if (markerCount){		    	var seq 		= qe.project.getActiveSequence(); // QE DOM version of sequence; special powers!		    	var firstMarker = markers.getFirstMarker();                                activeSequence.setPlayerPosition(firstMarker.start.ticks);                $._ext_GNMPanel.exportCurrentFrameAsPNG();                var previousMarker = 0;		    	if (firstMarker){			    	for(var i = 0; i < markerCount; i++){                         if (i == 0){                            currentMarker = markers.getNextMarker(firstMarker);                         } else {                            currentMarker = markers.getNextMarker(previousMarker);                         }			    		if (currentMarker){                            activeSequence.setPlayerPosition(currentMarker.start.ticks);                            previousMarker = currentMarker;                            $._ext_GNMPanel.exportCurrentFrameAsPNG();			    		}			    	}		    	}		    }        }    },	createSequence : function(name) {		var someID = "xyz123";		var seqName = prompt('Name of sequence?',  '<<<default>>>', 'Sequence Naming Prompt');		app.project.createNewSequence(seqName, someID);	},	createSequenceFromPreset : function(presetPath) {		app.enableQE();		qe.project.init();		qe.project.newSequence("Some Sequence Name", presetPath);	},	render : function() {				app.enableQE();				var activeSequence = qe.project.getActiveSequence();  // we use a QE DOM function, to determine the output extension.				if (activeSequence)	{			app.encoder.launchEncoder();	// This can take a while; let's get the ball rolling.			var timeSecs                = activeSequence.CTI.secs;		// Just for reference, here's how to access the CTI 			var timeFrames              = activeSequence.CTI.frames;	// position, for the active sequence. 			var timeTicks               = activeSequence.CTI.ticks;			var timeString    			= activeSequence.CTI.timecode;			var seqInPoint	= app.project.activeSequence.getInPoint();	// new in 9.0			var seqOutPoint	= app.project.activeSequence.getOutPoint();	// new in 9.0			// Define a couple of callback functions, for AME to use during render.						function message(msg) {				 //$.writeln(msg);	 // Using '$' object will invoke ExtendScript Toolkit, if installed.			}						function onEncoderJobComplete(jobID, outputFilePath) {				if (Folder.fs == 'Macintosh') {					var eoName = "PlugPlugExternalObject";											} else {					var eoName = "PlugPlugExternalObject.dll";				}										var mylib 	 = new ExternalObject('lib:' + eoName);				var eventObj = new CSXSEvent();				eventObj.type = "com.adobe.csxs.events.GNMPanelRenderEvent";				eventObj.data = "Rendered Job " + jobID + ", to " + outputFilePath + ".";	        	eventObj.dispatch();			}						function onEncoderJobError(jobID, errorMessage) {				if (Folder.fs == 'Macintosh') {					var eoName = "PlugPlugExternalObject";											} else {					var eoName = "PlugPlugExternalObject.dll";				}										var mylib 	 = new ExternalObject('lib:' + eoName);				var eventObj = new CSXSEvent();				eventObj.type = "com.adobe.csxs.events.GNMPanelRenderEvent";				eventObj.data = "Job " + jobID + " failed, due to " + errorMessage + ".";	        	eventObj.dispatch();			}						function onEncoderJobProgress(jobID, progress) {				var msg = 	'onEncoderJobProgress called' +							'. jobID = ' + 							jobID +							'. progress = ' + 							progress;											message(msg);			}			function onEncoderJobQueued(jobID) {			    app.encoder.startBatch();			}			var projPath   	= new File(app.project.path);			var outputPath  = Folder.selectDialog("Choose the output directory");			if ((outputPath) && projPath.exists){							if (Folder.fs == 'Macintosh') {					var outputPresetPath = "/Applications/Adobe\ Premiere\ Pro\ CC\ 2015/Adobe\ Premiere\ Pro\ CC\ 2015.app/Contents/MediaIO/systempresets/58444341_4d584658/XDCAMHD\ 50\ NTSC\ 60i.epr";				} else {					var outputPresetPath	= "C:\\Program Files\\Adobe\\Adobe Media Encoder CC 2015\\MediaIO\\systempresets\\58444341_4d584658\\XDCAMHD 50 NTSC 60i.epr";			}								var outPreset  		= new File(outputPresetPath);				if (outPreset.exists == true){								var outputFormatExtension   	= 	activeSequence.getExportFileExtension(outPreset.fsName);								if (outputFormatExtension){						var fullPathToFile 	= 	outputPath.fsName + 												$._ext_GNMPanel.getSep() + 												activeSequence.name + 												"." + 												outputFormatExtension;									app.encoder.bind('onEncoderJobComplete',	onEncoderJobComplete);			app.encoder.bind('onEncoderJobError', 		onEncoderJobError);			app.encoder.bind('onEncoderJobProgress', 	onEncoderJobProgress);			app.encoder.bind('onEncoderJobQueued', 		onEncoderJobQueued);			// use these 0 or 1 settings to disable some/all metadata creation.			app.encoder.setSidecarXMPEnabled(0);			app.encoder.setEmbeddedXMPEnabled(0);			var jobID = app.encoder.encodeSequence(	app.project.activeSequence,																fullPathToFile,																outPreset.fsName,													app.encoder.ENCODE_WORKAREA); // app.encoder.ENCODE_ENTIRE, app.encoder.ENCODE_IN_TO_OUT);			message('jobID = ' + jobID);						outPreset.close();					}				} else {					alert("Could not find output preset.");				}			} else {				alert("Could not find/create output path.");			}			projPath.close();		} else {			alert("No active sequence.");		}	},    saveProjectAs : function() {					var sessionCounter = 1;		var outputPath 	= Folder.selectDialog("Choose the output directory");        		if (outputPath) {			var absPath 	= outputPath.fsName;		    var outputName 	= new String(app.project.name);		    var array 		= outputName.split('.', 2);		    outputName = array[0]+ sessionCounter + '.' + array[1]; 		    sessionCounter++;					    var fullOutPath = absPath + $._ext_GNMPanel.getSep() + outputName;		    app.project.saveAs(fullOutPath);		    app.openDocument(fullOutPath);		}	},			mungeXMP : function(){		var projectItem = app.project.rootItem.children[0]; // assumes first item is footage.		if (projectItem) {			if (ExternalObject.AdobeXMPScript == undefined) {				ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript'); 			}				if(ExternalObject.AdobeXMPScript != undefined) { 	// safety-conscious!				var xmp_blob = projectItem.getXMPMetadata();				var xmp = new XMPMeta(xmp_blob);				var have_a_scene = xmp.doesPropertyExist(XMPConst.NS_DM, "scene");				var oldVal = "";								if (have_a_scene == true){					var myScene = xmp.getProperty(XMPConst.NS_DM, "scene");					oldVal 		= myScene.value;				}							// Regardless of whether there WAS scene data, set scene data. 								xmp.setProperty(XMPConst.NS_DM, "scene", oldVal + " Added by GNMPanel sample!");								// Now, let's mess with the description! Multi-line field == slightly more complicated. 				    			var descriptionProp 			= "description";    			var have_a_description 			= xmp.doesPropertyExist(XMPConst.NS_DC, descriptionProp);				var firstDescription 			= "GNMPanel wrote the first value into description.";				var numDescriptionValuesPresent = xmp.countArrayItems(XMPConst.NS_DC, descriptionProp);			    			if( numDescriptionValuesPresent == 0) {    				xmp.appendArrayItem(XMPConst.NS_DC,     									descriptionProp,     									null,     									XMPConst.PROP_IS_ARRAY,     									XMPConst.ARRAY_IS_ORDERED);    				xmp.insertArrayItem(XMPConst.NS_DC,     									descriptionProp,     									1,     									firstDescription);    			} else {    				var appendedText 	= '...added by GNMPanel.';    				oldDescriptionValue = xmp.getArrayItem(XMPConst.NS_DC, descriptionProp, 1);    				xmp.setArrayItem(	XMPConst.NS_DC,     									descriptionProp,     									1,     									(oldDescriptionValue.value + appendedText));    			}				var xmpAsString = xmp.serialize();		// either way, serialize and write XMP.				projectItem.setXMPMetadata(xmpAsString);			}		} else {			alert("Project item required.");		}	},		getProductionByName : function(nameToGet) {			for (var i = 0; i < productionList.numProductions; i++) {				this_prod = productionList[i];				if (this_prod.name == nameToGet) {					return this_prod;				}			}			return undefined;	},	pokeAnywhere : function() {		var token 				= app.anywhere.getAuthenticationToken();		var productionList 		= app.anywhere.listProductions();		var isProductionOpen	= app.anywhere.isProductionOpen();				if (isProductionOpen == true) {			var sessionURL			= app.anywhere.getCurrentEditingSessionURL();			var selectionURL		= app.anywhere.getCurrentEditingSessionSelectionURL();			var activeSequenceURL	= app.anywhere.getCurrentEditingSessionActiveSequenceURL();						var theOneIAskedFor = $._ext_GNMPanel.getProductionByName("test");					if (theOneIAskedFor) {				var out = theOneIAskedFor.name + ", " + theOneIAskedFor.description;				alert("Found: " + out);	// todo: put useful code here.			}		} else {			alert("No Production open.");		}	},	dumpOMF : function() {				var activeSequence = app.project.activeSequence;				if (activeSequence) {			var outputPath = Folder.selectDialog("Choose the output directory");					if (outputPath){				var absPath = outputPath.fsName;			    var outputName  = new String(activeSequence.name) + '.omf';                var fullOutPathWithName = absPath + $._ext_GNMPanel.getSep() + outputName;				app.project.exportOMF(	app.project.activeSequence,		// sequence										fullOutPathWithName, 		// output file path										'OMFTitle',						// OMF title										48000,							// sample rate (48000 or 96000)										16,								// bits per sample (16 or 24)										1,								// audio encapsulated flag (1 : yes or 0 : no)										0,								// audio file format (0 : AIFF or 1 : WAV)										0,								// trim audio files (0 : no or 1 : yes)										0,								// handle frames (if trim is 1, handle frames from 0 to 1000)										0);								// include pan flag (0 : no or 1 : yes)		}		} else {			alert("No active sequence.");		}	},		addClipMarkers : function () {		var projectItem = app.project.rootItem.children[0]; // assumes first item is footage.		if (projectItem) {            if (projectItem.type == ProjectItemType.CLIP ||                projectItem.type == ProjectItemType.FILE) {                			markers = projectItem.getMarkers();				if (markers) {					var num_markers 	= markers.numMarkers;					var new_marker  	= markers.createMarker(12.345);					new_marker.name 	= 'Marker created by GNMPanel.';					new_marker.comments = 'Here are some comments, inserted by GNMPanel.';					new_marker.end 		= 15.6789;					//default marker type == comment. To change marker type, call one of these:				// new_marker.setTypeAsChapter();				// new_marker.setTypeAsWebLink();				// new_marker.setTypeAsSegmentation();				// new_marker.setTypeAsComment();				}			} else {           		alert("Can only add markers to clips or files.");			}		}    	},	modifyProjectMetadata : function () {				var kPProPrivateProjectMetadataURI = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";		var namefield = "Column.Intrinsic.Name";		var tapename  = "Column.Intrinsic.TapeName";		var desc      = "Column.PropertyText.Description";		if (app.isDocumentOpen()) {			var projectItem = app.project.rootItem.children[0]; // just grabs first projectItem.			if (projectItem) {				if (ExternalObject.AdobeXMPScript == undefined) {					ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');				}				if (ExternalObject.AdobeXMPScript != undefined) {	// safety-conscious!					var projectMetadata = projectItem.getProjectMetadata();					var xmp = new XMPMeta(projectMetadata);					var obj = xmp.dumpObject();					// var aliases = xmp.dumpAliases();					var namespaces = XMPMeta.dumpNamespaces();					var found_name      = xmp.doesPropertyExist(kPProPrivateProjectMetadataURI, namefield);					var found_tapename  = xmp.doesPropertyExist(kPProPrivateProjectMetadataURI, tapename);					var found_desc      = xmp.doesPropertyExist(kPProPrivateProjectMetadataURI, desc);					xmp.setProperty(kPProPrivateProjectMetadataURI, tapename, 	"***TAPENAME***");					xmp.setProperty(kPProPrivateProjectMetadataURI, desc, 		"***DESCRIPTION***");					xmp.setProperty(kPProPrivateProjectMetadataURI, namefield, 	"***NEWNAME***");					var str = xmp.serialize();					var array = new Array();					array[0] = tapename;					array[1] = desc;					array[2] = namefield;					projectItem.setProjectMetadata(str, array);				}			}		}	},	updatePAR : function() {		var item = app.project.rootItem.children[0]; 		// If there is an item, and it's either a clip or file...		if(	(item) && 			((item.type == ProjectItemType.FILE) || (item.type == ProjectItemType.CLIP))){				item.setOverridePixelAspectRatio(185,  100); // anamorphic is BACK!   :)			} else {				alert('You cannot override the PAR of bins or sequences.')			}	},		getnumAEProjectItems : function() {		var bt 	  = new BridgeTalk;		bt.target = 'aftereffects';		bt.body   = 'alert("Items in AE project: " + app.project.rootFolder.numItems);app.quit();';		bt.send();	},	updateEventPanel : function() {		app.setSDKEventMessage('Here is some information.', 'info');		app.setSDKEventMessage('Here is a warning.', 'warning');		//app.setSDKEventMessage('Here is an error.', 'error');  // Very annoying; use wisely.	},	walkAllBinsForFootage : function(parentItem, outPath){		for (var j = 0; j < parentItem.children.numItems; j++){			var currentChild = parentItem.children[j];			if (currentChild){				if (currentChild.type == ProjectItemType.BIN){					$._ext_GNMPanel.walkAllBinsForFootage(currentChild, outPath);		// warning; recursion!				} else {					$._ext_GNMPanel.dumpProjectItemXMP(currentChild, outPath);				}			}		}	},    dumpProjectItemXMP : function(projectItem, outPath) {		var xmpBlob				= projectItem.getXMPMetadata();		var outFileName 		= projectItem.name + '.xmp';        var completeOutputPath 	= outPath + $._ext_GNMPanel.getSep() + outFileName;		var outFile 			= new File(completeOutputPath);		if (outFile){			outFile.encoding = "UTF8";			outFile.open("w", "TEXT", "????");			outFile.write(xmpBlob.toString());			outFile.close();		}	},	addSubClip : function() {		var startTimeSeconds 	= 1.23743;		var endTimeSeconds 		= 3.5235;		var hasHardBoundaries 	= 0;				var sessionCounter 		= 1;		var takeVideo 			= 1;  // optional, defaulting to 1		var takeAudio 			= 1; //  optional, defaulting to 1		var projectItem = app.project.rootItem.children[0]; // just grabs the first item		if ( (projectItem) && 			((projectItem.type == ProjectItemType.CLIP)  || (projectItem.type == ProjectItemType.FILE) )){			var newSubClipName = prompt('Name of subclip?',  projectItem.name + '_' + sessionCounter, 'Name your subclip');						var newSubClip 	= projectItem.createSubClip(newSubClipName, 													   	startTimeSeconds, 								   						endTimeSeconds, 													  	hasHardBoundaries,								   						takeVideo,							     	   					takeAudio);		} else {			alert("Couldn't sub-clip " + projectItem.name);		}	},	dumpXMPFromAllProjectItems : function() {        var outPath = Folder.selectDialog("Choose the output directory");		         		if (outPath) {			var	numItemsInRoot = app.project.rootItem.children.numItems;			for (var i = 0; i < numItemsInRoot; i++){				var currentItem = app.project.rootItem.children[i];				if (currentItem){			        if (currentItem.type == ProjectItemType.BIN){				        $._ext_GNMPanel.walkAllBinsForFootage(currentItem, outPath.fsName);					} else {					    $._ext_GNMPanel.dumpProjectItemXMP(currentItem, outPath.fsName);					}				}			}		}	},	exportAAF : function() {		var sessionCounter = 1;				if (app.project.activeSequence){			var outputPath 	= Folder.selectDialog("Choose the output directory");        			if (outputPath) {							var absPath 	= outputPath.fsName;			    var outputName 	= new String(app.project.name);			    var array 		= outputName.split('.', 2);			    outputName = array[0]+ sessionCounter + '.' + array[1]; 			    sessionCounter++;							    var fullOutPath = absPath + $._ext_GNMPanel.getSep() + outputName + '.aaf';				app.project.exportAAF(  app.project.activeSequence,       	// which sequence										fullOutPath,						// output path										1,                                 	// mix down video?										0,                                 	// explode to mono?							            96000,                             	// sample rate										16,                                	// bits per sample										0,                                 	// embed audio? 										0,                                 	// audio file format? 0 = aiff, 1 = wav										0,                                 	// trim sources? 				                        0);                                	// number of 'handle' frames			} else {				alert("Couldn't create AAF output.");	        }        } else {        	alert("No active sequence.");        }	},	setScratchDisk : function (){		        var scratchPath = Folder.selectDialog("Choose new scratch disk directory");		         		if ((scratchPath) && scratchPath.exists) {			app.setScratchDiskPath(scratchPath.fsName, ScratchDiskType.FirstAutoSaveFolder); // see ScratchDiskType object, in ESTK.        }	},/*	getSequenceProxySetting : function() {		var returnVal = 'false';		var seq = app.project.activeSequence;		if (seq) {			if (seq.getEnableProxies() > 0) {				returnVal = 'true';			}		}		return returnVal;	},	toggleProxyState : function() {		var seq = app.project.activeSequence;		if (seq) {			if (seq.getEnableProxies() > 0) {				seq.setEnableProxies(false);			} else {				seq.setEnableProxies(true);			}		}	},*/	setProxiesON : function () {		var firstProjectItem = app.project.rootItem.children[0]; 		if ( (firstProjectItem) && (firstProjectItem.canProxy())) {            			if (firstProjectItem.hasProxy) {				var confirmMsg	=	firstProjectItem.name + " already has an assigned proxy. Re-assign?";				var proceed = confirm(confirmMsg, false, "Are you sure...?")			}            var proxyPath = File.openDialog("Choose proxy for " + firstProjectItem.name + ":" );                           if (proxyPath.exists) {            	var proxyFile = new File(proxyPath);  // Use File class to avoid path details...            	if (proxyFile.exists) {	                firstProjectItem.attachProxy(proxyPath.fsName, 0);	            }            }		}	},	clearCache : function () {		app.enableQE();		MediaType 	= {};				// Magical constants from our internal automation.		MediaType.VIDEO = "228CDA18-3625-4d2d-951E-348879E4ED93";		MediaType.AUDIO = "80B8E3D5-6DCA-4195-AEFB-CB5F407AB009";		MediaType.ANY   = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";		qe.project.deletePreviewFiles(MediaType.ANY);	},};