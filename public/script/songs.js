var songroom = document.querySelector("#songs");
var searchsongs=document.querySelector("#searchsongs");
var search =document.querySelector("#search");
var enter =document.querySelector("#enter");

fetch("http://localhost:5000/tracks")
    .then(response => response.json())
    .then(response =>
    response.forEach(data => {
        var div1 = document.createElement("div");
        div1.classList.add("card");
        songroom.appendChild(div1);
        var img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = data.image.picture_big;
        div1.appendChild(img);
        var div2 = document.createElement("div");
        div2.classList.add("ard-body")
        div1.appendChild(div2);
        var h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.textContent = data.title;
        div2.appendChild(h5);
        var audio = document.createElement("audio");
        audio.setAttribute("controls", "controls");
        audio.innerText = "your browser do not support playing this audio";
        div2.appendChild(audio);
        var source1 = document.createElement("source");
        source1.src = data.song;
        source1.type = "audio/mpeg";
        audio.appendChild(source1);
    
        var source2 = document.createElement("source");
        source2.src = data.song;
        source2.type = "audio/wav";
        audio.appendChild(source2);
        var p = document.createElement("p");
        p.classList.add("card-subtitle");
        p.innerHTML = data.name;
        div2.appendChild(p);
        var a = document.createElement("a");
        a.href= data.song;
        a.download = true;
        a.classList.add("btn")
        a.classList.add("btn-primary");
        a.innerHTML="download";
        div2.appendChild(a)
    }));

        const searchForm = document.getElementById('searchForm');
    
        searchForm.addEventListener('submit', async (event) => {
          event.preventDefault();
        
          var query = document.getElementById('search').value;

          const response = await fetch(`/search?q=${query}`);
          const data = await response.json();
      
          renderSearchResults(data);
        });
      
        function renderSearchResults(data) {
      if(searchsongs.children.length>0){ 
        var div1 = document.createElement("div");
        div1.classList.add("card");
        document.querySelectorAll("#divmom").forEach(mom=>{
          searchsongs.removeChild(mom)
        })
          data.songs.forEach((song) => {
           var div1 = document.createElement("div");
           div1.setAttribute("id","divmom");
        div1.classList.add("card");
        searchsongs.appendChild(div1);
        var img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = song.artist.picture_big;
        div1.appendChild(img);
        var div2 = document.createElement("div");
        div2.classList.add("ard-body")
        div1.appendChild(div2);
        var h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.textContent = song.album.title;
        div2.appendChild(h5);
        var audio = document.createElement("audio");
        audio.setAttribute("controls", "controls");
        audio.innerText = "your browser do not support playing this audio";
        div2.appendChild(audio);
        var source1 = document.createElement("source");
        source1.src = song.artist.name;
        source1.type = "audio/mpeg";
        audio.appendChild(source1);
    
        var source2 = document.createElement("source");
        source2.src = song.preview;
        source2.type = "audio/wav";
        audio.appendChild(source2);
        var p = document.createElement("p");
        p.classList.add("card-subtitle");
        p.innerHTML = song.artist.name;
        div2.appendChild(p);
        var a = document.createElement("a");
        a.href= song.perview;
        a.download = true;
        a.classList.add("btn")
        a.classList.add("btn-primary");
        a.innerHTML="download";
        div2.appendChild(a)

          });

             }else{
              data.songs.forEach((song) => {
                var div1 = document.createElement("div");
                div1.setAttribute("id","divmom");
                div1.classList.add("card");
                searchsongs.appendChild(div1);
                var img = document.createElement("img");
                img.classList.add("card-img-top");
                img.src = song.artist.picture_big;
                div1.appendChild(img);
                var div2 = document.createElement("div");
                div2.classList.add("ard-body")
                div1.appendChild(div2);
                var h5 = document.createElement("h5");
                h5.classList.add("card-title");
                h5.textContent = song.album.title;
                div2.appendChild(h5);
                var audio = document.createElement("audio");
                audio.setAttribute("controls", "controls");
                audio.innerText = "your browser do not support playing this audio";
                div2.appendChild(audio);
                var source1 = document.createElement("source");
                source1.src = song.artist.name;
                source1.type = "audio/mpeg";
                audio.appendChild(source1);
            
                var source2 = document.createElement("source");
                source2.src = song.preview;
                source2.type = "audio/wav";
                audio.appendChild(source2);
                var p = document.createElement("p");
                p.classList.add("card-subtitle");
                p.innerHTML = song.artist.name;
                div2.appendChild(p);
                var a = document.createElement("a");
                a.href= song.perview;
                a.download = true;
                a.classList.add("btn")
                a.classList.add("btn-primary");
                a.innerHTML="download";
                div2.appendChild(a)
         
                  });
         
              //g
        }
        }
      
      
/*<div class="card" style="width: 20rem; margin: 2px 28px 2px 28px;">
<img src="./images/victory.jpeg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Victory Dance</h5>
                        <audio controls>
                          <source src="./music/Anthony-Kani-What-A-Beauty-To-Behold.mp3" type="audio/mpeg">
                          <source src="./music/Anthony-Kani-What-A-Beauty-To-Behold.mp3" type="audio/wav">
                        Your browser does not support the audio element.
                        </audio>
                         <p class="card-subtitle" style="color: white;">Okpoi Peterson</p>
                        <a href="#" class="btn btn-primary">download</a>
                    </div>
                </div>
                 */

