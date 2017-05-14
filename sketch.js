
	var canvas;
	var iptr = 0; // a counter for the words
	var voiceSelection=['Google US English', 'Google UK English Female','Bruce','Daniel','Thomas','Fred','Fiona', 'Google UK English Male'];
	var selection=0;
	var table;
	var textt;
	var r,c;
	var textSSize;
	var speakbutton;
	const URL = 'https://neovictorian23.files.wordpress.com/2014/08/vfblog-nickland1.jpg';
	var p5Img, htmlImg;
	var imageUrl;

	var myVoice = new p5.Speech(); // new P5.Speech object
	var img;
	var myFont;

	myVoice.setVoice('Google UK English Male');
	myVoice.setRate('2.0');
	myVoice.onEnd = speechEnded;
	//myVoice.onLoad = speechLoaded;
	myVoice.onStart = speechStarted;
	myVoice.onPause = speechPaused; // not working
	myVoice.onResume = speechResumed; // not working
	
	var listbutton; // button
	function preload(){
		table = loadTable("assets/amy.csv", "csv", "header");
		// myFont = loadFont('assets/Bagnard.otf');
		//font=loadFont('assets/LilGrotesk-Bold.otf',true);
	}
	function setup()
	{
		// graphics stuff:
		canvas=createCanvas(displayWidth, displayHeight);
		canvas.parent('poememenon');

		
		textSSize=28;
		textFont("Helvetica");
		textSize(textSSize);

		// button:
		speakbutton = createButton('Speak');
  		speakbutton.position(150, 135);
  		speakbutton.size(500,50);
  		speakbutton.mousePressed(buttonClicked);
  		speakbutton.parent('poememenon');

  		// say hello:
  		r=0;
  		c=0;
		//myVoice.speak('yeah, baby!!!');
		textt='Start';//table.getString(r, c);
		nextImage();

		
		//htmlImg.size(htmlImg.width*2,htmlImg.height*2); 
		
		


	}

	function draw()
	{
		background(0,0,0);
		fill(255, 255, 255, 100);

		
		//textAlign(CENTER);
		// rect(100,100,200,500);
		// image(p5Img, 0, 0); 
		//htmlImg.position(350,100);
		image(p5Img,350,100);
		text(textt,100,100,400,displayHeight);
		

	
	}

	function doList()
	{
		myVoice.listVoices(); // debug printer for voice options
	}

	function keyPressed()
	{
		background(255, 0, 0); // clear screen
	}

	function mousePressed()
	{

		//speakNow()
	}


	function speakNow(){
		nextText();
		nextImage();
		myVoice.setVoice(voiceSelection[selection]);//Math.floor(random(myVoice.voices.length)));
		myVoice.speak(textt);
	}
	function nextVoice(){
		selection++;
		selection= selection % voiceSelection.length;

	}
	function nextImage(){
		var imageurll= table.getString(r, c+1);
		if(imageurll !==" " || imageurll!== null){
			//htmlImg = createImg(imageurll);
			getP5ImageGTL(imageurll);
			// loadPixels();
		}
		// updatePixels();
		//console.log(imageurll);
		
	}
	function buttonClicked()
	{
		if(speakbutton.elt.innerHTML=='Speak') {
			speakNow();
		}
		// else if(speakbutton.elt.innerHTML=='Pause') myVoice.pause(); // not working
		// else if(speakbutton.elt.innerHTML=='Resume') myVoice.resume(); // not working
		else if(speakbutton.elt.innerHTML=='Stop'){ 
			myVoice.stop();
			speakbutton.elt.innerHTML = 'Speak';
		}
	}

	function nextText(){
		r++;c==1;
  		if(c>=table.getColumnCount()){
    		c=0;
    		r++;
    		if(r>=table.getRowCount()){
      			r=0;
    		}
  		}
  		textt=table.getString(r, c);
	}

	function speechLoaded()
	{
  		// say cheers:
		//myVoice.speak("yeah, baby!!!");
	}

	function speechStarted()
	{
		
		speakbutton.elt.innerHTML = 'Stop';
		console.log('Started');
		//speakNow();
	}

	// not working...
	function speechPaused()
	{
		console.log('Paused');
		//speakbutton.elt.innerHTML = 'Resume';
	}

	// not working...
	function speechResumed()
	{
		console.log('Resumed');
		//speakbutton.elt.innerHTML = 'Pause';
	}

	function speechEnded(){

		console.log('ended:'+ voiceSelection[selection]);
		nextVoice();
		if(speakbutton.elt.innerHTML=='Stop'){
			speakNow();
		}
		//speakbutton.elt.innerHTML = 'Speak';
	}

















	//Image stuff
	function getImagesGTL(){
		p5Img = null;
		imageUrl = URL;
		getHtmlImage(imageUrl);
		getP5ImageGTL(imageUrl);
	}
function getHtmlImage(url){
		if(url != null){
			console.log('getting html image from: ' + url);
			htmlImg = createImg(url);
			htmlImg.position(windowWidth/1.7, 60); 
		}
		else{
			console.log('no Url or invalid');
		}
	}

	function getP5Image(url){
		if(url != null){
			console.log('getting p5 image from: ' + url);
			p5Img = loadImage(url,
								function(){
									redraw();
								}, 
								function(){
									background(70);
									text("could not load Image...", 40, 100);
									redraw();
								});
			// image(p5Img, 60, 60); 
		}
		else{
			console.log('no Url or invalid');
		}
	}

	function getP5ImageGTL(url){
		if(url != null){
			console.log('getting p5 image from: ' + url);
			p5Img = loadImage(url, function(){redraw();}, loadImageErrorOverride);
			// image(p5Img, 60, 60); 
		}
		else{
			console.log('no Url or invalid');
		}
	}


		function loadImageErrorOverride(errEvt) {
		const pic = errEvt.target;

		if (pic.crossOrigin == null)  return print('Failed to reload ' + pic.src + '!');

		print('Attempting to reload it as a tainted image now...');
		pic.crossOrigin = null, pic.src = pic.src;
	}
	