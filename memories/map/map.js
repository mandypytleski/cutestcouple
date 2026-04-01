const map = L.map('map').setView([38.875, -97.93], 4);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap' }
  ).addTo(map);

  //repeat this to add text and photos. Copy and paste then change the images and text. Don't forget the buttons.
      const castle = `
    <div class="slideshow">
      <h3>Our Castle</h3>
      <p>Our little castle on top of the hill where we can get away from it all. Or even a tower for me to let my hair down ;)</p>
      <img class="slide" src="images/castle/IMG_3859.jpg">
      <img class="slide" src="images/castle/IMG_3866.jpg">
      <img class="slide" src="images/castle/IMG_3881.jpg">
      <img class="slide" src="images/castle/IMG_3885.jpg">
      <img class="slide" src="images/castle/IMG_3889.jpg">
      <img class="slide" src="images/castle/IMG_3907.jpg">
      <img class="slide" src="images/castle/IMG_3913.jpg">
      <img class="slide" src="images/castle/IMG_3943.jpg">
      <img class="slide" src="images/castle/IMG_3957.jpg">
      <img class="slide" src="images/castle/IMG_3964.jpg">
      <img class="slide" src="images/castle/IMG_3971.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;

      const lights = `
    <div class="slideshow">
      <h3>Winter Lights</h3>
      <p>Even though we found this by pure chance, this has become one of our favorite spots. Whether we're having a picnic, looking out at the water, or doing a photo shoot, this is the place to go.</p>
      <img class="slide" src="images/lights/IMG_4090.jpg">
      <img class="slide" src="images/lights/IMG_4095.jpg">
      <img class="slide" src="images/lights/IMG_4097.jpg">
      <img class="slide" src="images/lights/IMG_4101.jpg">
      <img class="slide" src="images/lights/IMG_4105.jpg">
      <img class="slide" src="images/lights/IMG_4106.jpg">
      <img class="slide" src="images/lights/IMG_4126.jpg">
      <img class="slide" src="images/lights/X-MAS-01.jpg">
      <img class="slide" src="images/lights/X-MAS-02.jpg">
      <img class="slide" src="images/lights/X-MAS-04.jpg">
      <img class="slide" src="images/lights/X-MAS-09.jpg">
      <img class="slide" src="images/lights/X-MAS-15.jpg">
      <img class="slide" src="images/lights/X-MAS-16.jpg">
      <img class="slide" src="images/lights/X-MAS-18.jpg">
      <img class="slide" src="images/lights/X-MAS-24.jpg">
      <img class="slide" src="images/lights/X-MAS-26.jpg">
      <img class="slide" src="images/lights/X-MAS-29.jpg">
      <img class="slide" src="images/lights/X-MAS-30.jpg">
      <img class="slide" src="images/lights/X-MAS-37.jpg">
      <img class="slide" src="images/lights/X-MAS-38.jpg">
      <img class="slide" src="images/lights/X-MAS-40.jpg">
      <img class="slide" src="images/lights/X-MAS-43.jpg">
      <img class="slide" src="images/lights/X-MAS-45.jpg">
      <img class="slide" src="images/lights/X-MAS-48.jpg">
      <img class="slide" src="images/lights/X-MAS-49.jpg">
      <img class="slide" src="images/lights/X-MAS-52.jpg">
      <img class="slide" src="images/lights/X-MAS-53.jpg">
      <img class="slide" src="images/lights/X-MAS-55.jpg">
      <img class="slide" src="images/lights/X-MAS-57.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;

      const lakeVermillion = `
    <div class="slideshow">
      <h3>Lake Vermillion</h3>
      <p>The first vacation we ever took together. Got lots of hiking and family time in.</p>
      <img class="slide" src="images/vermillion/377538267013573521.jpg">
      <img class="slide" src="images/vermillion/401030655020948544.jpg">
      <img class="slide" src="images/vermillion/IMG_5562.jpg">
      <img class="slide" src="images/vermillion/IMG_5569.jpg">
      <img class="slide" src="images/vermillion/IMG_5587.jpg">
      <img class="slide" src="images/vermillion/IMG_7446.jpg">
      <img class="slide" src="images/vermillion/IMG_7468.jpg">
      <img class="slide" src="images/vermillion/IMG_7480.jpg">
      <img class="slide" src="images/vermillion/IMG_7484.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;

      const jayCooke = `
    <div class="slideshow">
      <h3>Jay Cooke State Park</h3>
      <p>Mandy's happy place. We had a blast climbing around on the rocks along the water, going further than we thought we even could. Definitely a core memory.</p>
      <img class="slide" src="images/jaycooke/IMG_5596.jpg">
      <img class="slide" src="images/jaycooke/IMG_5597.jpg">
      <img class="slide" src="images/jaycooke/IMG_5601.jpg">
      <img class="slide" src="images/jaycooke/IMG_5605.jpg">
      <img class="slide" src="images/jaycooke/IMG_5607.jpg">
      <img class="slide" src="images/jaycooke/IMG_5610.jpg">
      <img class="slide" src="images/jaycooke/IMG_5622.jpg">
      <img class="slide" src="images/jaycooke/IMG_5628.jpg">
      <img class="slide" src="images/jaycooke/IMG_7492.jpg">
      <img class="slide" src="images/jaycooke/IMG_7493.jpg">
      <img class="slide" src="images/jaycooke/IMG_7495.jpg">
      <img class="slide" src="images/jaycooke/IMG_7498.jpg">
      <img class="slide" src="images/jaycooke/IMG_7501.jpg">
      <img class="slide" src="images/jaycooke/IMG_7502.jpg">
      <img class="slide" src="images/jaycooke/IMG_7504.jpg">
      <img class="slide" src="images/jaycooke/IMG_7508.jpg">
      <img class="slide" src="images/jaycooke/IMG_7510.jpg">
      <img class="slide" src="images/jaycooke/IMG_7512.jpg">
      <img class="slide" src="images/jaycooke/IMG_7518.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;

      const galena = `
    <div class="slideshow">
      <h3>Galena, IL</h3>
      <p>Our first trip down to Galena for the Bryant family reunion. This was Mandy's first time meeting some of Ian's extended family. We made some friends at the pool and got very very tan.</p>
      <img class="slide" src="images/galena/IMG_3701.jpg">
      <img class="slide" src="images/galena/IMG_5698.jpg">
      <img class="slide" src="images/galena/IMG_7602.jpg">
      <img class="slide" src="images/galena/IMG_7606.jpg">
      <img class="slide" src="images/galena/IMG_7607.jpg">
      <img class="slide" src="images/galena/IMG_7611.jpg">
      <img class="slide" src="images/galena/IMG_7613.jpg">
      <img class="slide" src="images/galena/IMG_7615.jpg">
      <img class="slide" src="images/galena/IMG_7620.jpg">
      <img class="slide" src="images/galena/IMG_7622.jpg">
      <img class="slide" src="images/galena/IMG_7624.jpg">
      <img class="slide" src="images/galena/IMG_7627.jpg">
      <img class="slide" src="images/galena/IMG_7638.jpg">
      <img class="slide" src="images/galena/IMG_7639.jpg">
      <img class="slide" src="images/galena/IMG_7640.jpg">
      <img class="slide" src="images/galena/IMG_7643.jpg">
      <img class="slide" src="images/galena/IMG_7645.jpg">
      <img class="slide" src="images/galena/IMG_7683.jpg">
      <img class="slide" src="images/galena/IMG_7687.jpg">
      <img class="slide" src="images/galena/IMG_7689.jpg">
      <img class="slide" src="images/galena/IMG_7690.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;

      const dells = `
    <div class="slideshow">
      <h3>Wisconsin Dells</h3>
      <p>Trip to Wisconsin Dells for Kim's family reunion. Get to spend great family time together and even shared a room with Grandma Cheryl</p>
      <img class="slide" src="images/dells/IMG_5801.jpg">
      <img class="slide" src="images/dells/IMG_7732.jpg">
      <img class="slide" src="images/dells/IMG_7734.jpg">
      <img class="slide" src="images/dells/IMG_9386.jpg">
      <img class="slide" src="images/dells/IMG_9401.jpg">
      <img class="slide" src="images/dells/IMG_9414.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;  
      
      const rapunzel = `
    <div class="slideshow">
      <h3>Floating Lanterns</h3>
      <p>Floating Lantern Festival in St. Paul with Courtney. Awesome opportunity for pictures and the ultimate Rapunzel moment. Perfect for us.</p>
      <img class="slide" src="images/rapunzel/IMG_5836.jpg">
      <img class="slide" src="images/rapunzel/IMG_5838.jpg">
      <img class="slide" src="images/rapunzel/IMG_5839.jpg">
      <img class="slide" src="images/rapunzel/IMG_5857.jpg">
      <img class="slide" src="images/rapunzel/IMG_5859.jpg">
      <img class="slide" src="images/rapunzel/IMG_5860.jpg">
      <img class="slide" src="images/rapunzel/IMG_5861.jpg">
      <img class="slide" src="images/rapunzel/IMG_5865.jpg">
      <img class="slide" src="images/rapunzel/IMG_5870.jpg">
      <img class="slide" src="images/rapunzel/IMG_5871.jpg">
      <img class="slide" src="images/rapunzel/IMG_5878.jpg">
      <img class="slide" src="images/rapunzel/IMG_5883.jpg">
      <img class="slide" src="images/rapunzel/IMG_5885.jpg">
      <img class="slide" src="images/rapunzel/IMG_5890.jpg">
      <img class="slide" src="images/rapunzel/IMG_5893.jpg">
      <img class="slide" src="images/rapunzel/IMG_5895.jpg">
      <img class="slide" src="images/rapunzel/IMG_5897.jpg">
      <img class="slide" src="images/rapunzel/IMG_5899.jpg">
      <img class="slide" src="images/rapunzel/IMG_5905.jpg">
      <img class="slide" src="images/rapunzel/IMG_5907.jpg">
      <img class="slide" src="images/rapunzel/IMG_5908.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;  

      const duluth = `
    <div class="slideshow">
      <h3>Duluth</h3>
      <p>Arguably one of our favorite hiking trips so far. We got to see a circle lake, Gooseberry State Park, and Split Rock State Park. We even completed a quest from Grandma P to find the fireplace at Split Rock!</p>
      <img class="slide" src="images/duluth/IMG_6706.jpg">
      <img class="slide" src="images/duluth/IMG_6707.jpg">
      <img class="slide" src="images/duluth/IMG_6711.jpg">
      <img class="slide" src="images/duluth/IMG_6716.jpg">
      <img class="slide" src="images/duluth/IMG_6721.jpg">
      <img class="slide" src="images/duluth/IMG_6731.jpg">
      <img class="slide" src="images/duluth/IMG_6741.jpg">
      <img class="slide" src="images/duluth/IMG_6743.jpg">
      <img class="slide" src="images/duluth/IMG_6745.jpg">
      <img class="slide" src="images/duluth/IMG_6750.jpg">
      <img class="slide" src="images/duluth/IMG_6756.jpg">
      <img class="slide" src="images/duluth/IMG_8604.jpg">
      <img class="slide" src="images/duluth/IMG_8608.jpg">
      <img class="slide" src="images/duluth/IMG_8609.jpg">
      <img class="slide" src="images/duluth/IMG_8615.jpg">
      <img class="slide" src="images/duluth/IMG_8618.jpg">
      <img class="slide" src="images/duluth/IMG_8627.jpg">
      <img class="slide" src="images/duluth/IMG_8632.jpg">
      <img class="slide" src="images/duluth/IMG_8634.jpg">
      <img class="slide" src="images/duluth/IMG_8639.jpg">
      <img class="slide" src="images/duluth/IMG_8642.jpg">
      <img class="slide" src="images/duluth/IMG_8645.jpg">
      <img class="slide" src="images/duluth/IMG_8651.jpg">
      <img class="slide" src="images/duluth/IMG_8667.jpg">
      <img class="slide" src="images/duluth/IMG_8678.jpg">
      <img class="slide" src="images/duluth/IMG_8686.jpg">
      <img class="slide" src="images/duluth/IMG_8700.jpg">
      <img class="slide" src="images/duluth/IMG_8703.jpg">
      <img class="slide" src="images/duluth/IMG_8710.jpg">
      <img class="slide" src="images/duluth/IMG_8729.jpg">
      <img class="slide" src="images/duluth/IMG_8736.jpg">
      <img class="slide" src="images/duluth/IMG_8738.jpg">
      <img class="slide" src="images/duluth/IMG_8740.jpg">
      <img class="slide" src="images/duluth/IMG_8753.jpg">
      <img class="slide" src="images/duluth/Resized_20251011_123036.jpg">
      <button onclick="prevSlide(this)">❮</button>
      <button onclick="nextSlide(this)">❯</button>
    </div>
      `;

      const florida = `
        <div class="slideshow">
          <h3>Florida</h3>
          <p>The first big vacation for us over spring break. We went to Ian's favorite place in the world on St. George Island.</p>
          <img class="slide" src="images/florida/340543648098594580.jpg">
          <img class="slide" src="images/florida/1101634221761076458.jpg">
          <img class="slide" src="images/florida/2262541244127774621.jpg">
          <img class="slide" src="images/florida/2397772743213861207.jpg">
          <img class="slide" src="images/florida/3327663273276310366.jpg">
          <img class="slide" src="images/florida/3685192867504205795.jpg">
          <img class="slide" src="images/florida/3933769779062775665.jpg">
          <img class="slide" src="images/florida/5295683600223002348.jpg">
          <img class="slide" src="images/florida/6530946744899489573.jpg">
          <img class="slide" src="images/florida/7822672950968642371.jpg">
          <img class="slide" src="images/florida/8390420847187435019.jpg">
          <img class="slide" src="images/florida/9141150914819516789.jpg">
          <img class="slide" src="images/florida/IMG_0127.jpg">
          <img class="slide" src="images/florida/IMG_0132.jpg">
          <img class="slide" src="images/florida/IMG_0139.jpg">
          <img class="slide" src="images/florida/IMG_0190.jpg">
          <img class="slide" src="images/florida/IMG_0190.jpg">
          <img class="slide" src="images/florida/IMG_0295.jpg">
          <img class="slide" src="images/florida/IMG_0297.jpg">
          <img class="slide" src="images/florida/IMG_0303.jpg">
          <img class="slide" src="images/florida/IMG_0310.jpg">
          <img class="slide" src="images/florida/IMG_0331.jpg">
          <img class="slide" src="images/florida/IMG_0339.jpg">
          <img class="slide" src="images/florida/IMG_0343.jpg">
          <img class="slide" src="images/florida/IMG_0369.jpg">
          <img class="slide" src="images/florida/IMG_0380.jpg">
          <img class="slide" src="images/florida/IMG_0381.jpg">
          <img class="slide" src="images/florida/IMG_0383.jpg">
          <img class="slide" src="images/florida/IMG_0386.jpg">
          <img class="slide" src="images/florida/IMG_0410.jpg">
          <img class="slide" src="images/florida/IMG_0580.jpg">
          <img class="slide" src="images/florida/IMG_0625.jpg">
          <img class="slide" src="images/florida/IMG_0631.jpg">
          <img class="slide" src="images/florida/IMG_0638.jpg">
          <img class="slide" src="images/florida/IMG_0683.jpg">
          <img class="slide" src="images/florida/IMG_0705.jpg">
          <img class="slide" src="images/florida/IMG_7863.jpg">
          <button onclick="prevSlide(this)">❮</button>
          <button onclick="nextSlide(this)">❯</button>
        </div>
       `;

  //repeat this to actually create the markers. BindPopUp to the correlated popup.
      L.marker([44.878898871770595, -91.68712405322354])
      .addTo(map)
      .bindPopup(castle);

      L.marker([44.89363555966318, -91.92622710927357])
      .addTo(map)
      .bindPopup(lights);

      L.marker([47.92503844598897, -92.65706284105765])
      .addTo(map)
      .bindPopup(lakeVermillion);

      L.marker([46.65384748401912, -92.37049086074737])
      .addTo(map)
      .bindPopup(jayCooke);

      L.marker([42.39548009773038, -90.33580180670641])
      .addTo(map)
      .bindPopup(galena);

      L.marker([43.59086055231714, -89.7845195363734])
      .addTo(map)
      .bindPopup(dells);

      L.marker([44.983314156920606, -93.05386971408349])
      .addTo(map)
      .bindPopup(rapunzel);

      L.marker([47.20000746362474, -91.36703681906855])
      .addTo(map)
      .bindPopup(duluth);

      L.marker([29.663163559679255, -84.86284799579248])
      .addTo(map)
      .bindPopup(florida);
      
      // Photo Slideshow functions
  function nextSlide(btn) {
    const slides = btn.parentElement.querySelectorAll(".slide");
    let i = [...slides].findIndex(s => s.style.display === "block");
    slides[i].style.display = "none";
    slides[(i+1) % slides.length].style.display = "block";
  }

  function prevSlide(btn) {
    const slides = btn.parentElement.querySelectorAll(".slide");
    let i = [...slides].findIndex(s => s.style.display === "block");
    slides[i].style.display = "none";
    slides[(i-1+slides.length) % slides.length].style.display = "block";
  }

  // Show first slide when popup opens
  map.on("popupopen", e => {
    const slides = e.popup._contentNode.querySelectorAll(".slide");
    if (slides.length) slides[0].style.display = "block";
  });