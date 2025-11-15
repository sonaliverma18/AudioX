// Dark mode toggle functionality
document.getElementById("tools").addEventListener("click", function () {
    // Toggle dark mode class
    document.body.classList.toggle("dark-mode");

    
    // Toggle dark mode class on sidebar
    document.getElementById("sidebar").classList.toggle("dark-mode");
    
    // Get the icon inside the button
    const icon = document.querySelector("#tools i");
    
    // Toggle between moon and sun icons
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon"); // Change icon to sun
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun"); // Change icon to moon
        icon.classList.add("fa-moon");
    }
});

// Sidebar open function
function openSidebar() {
    document.getElementById("sidebar").style.width = "150px";
}

// Sidebar close function
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

// Attach event listener to the sidebar button
document.getElementById("sidebarButton").addEventListener("click", openSidebar);

let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let repeatIcon = document.querySelector('.fa-repeat');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let updateTimer;

const playlists = [
    {
        name: "Hindi",
        image: "playlist1.jpg",
        songs: [
            { title: "Abhi Kuch Dino Se", artist: "Mohit Chauchan ", image: "Hindi/Abhi_kuch_dino_se.jpg", src: "Hindi/Abhi Kuch Dino Se.mp3" },
            { title: "Kaise Ab kahein", artist: "Aasa singh , gaurav chatterji", image: "Hindi/kaise_Ab_Kahein.jpg", src: "Hindi/Kaise Ab Kahein feat.Hrishi Giridhar Pratik Gangavane From Gutar Gu.mp3" },
            { title: "AAnkhon Se Batana", artist: "Dikshant", image: "Hindi/Aankhon_Se_Batana.jpg", src: "Hindi/Aankhon Se Batana.mp3" },
            { title: "Sawaar Loon", artist: "Amit Trivedi, Amitabh Bhattacharya ", image: "Hindi/Sawaar_Loon.jpg", src: "Hindi/SAWAAR LOON.mp3" },
            { title: "Main Hoon Na", artist: "Sonu Nigam, Shreya Ghoshal", image: "Hindi/Main_Hoon_Na.jpeg", src: "Hindi/MAIN HOON NA.mp3" },
            { title: "Saude Bazi", artist: "Anupam Amod", image: "Hindi/Saude_Bazi.jpg", src: "Hindi/Saude Bazi.mp3" },
            { title: "Befikar", artist: "Aashna Hegde, Tanzeel khan", image: "Hindi/Befikar.jpg", src: "Hindi/Befikar.mp3" },
        ],
    },
    {
        name: "English",
        image: "img/download.jpg",
        songs: [
            { title: "Stay", artist: "Justin Bieber", image: "English/Stay.jpeg", src: "English/STAY.mp3" },
            { title: "Under the influence", artist: "Chris Brown", image: "English/under_the_influence.jpeg", src: "English/Under The Influence.mp3" },
            { title: "Shape of you", artist: "Ed-Sheeran", image: "English/Shape_of_You.jpg", src: "English/Shape of You.mp3" },
            { title: "Dance Monkey", artist: "Tones And I", image: "English/Dance_monkey.jpeg", src: "English/Dance Monkey.mp3" },
            { title: "Blank Space", artist: "Taylor swift", image: "English/blank_space.jpg", src: "English/Blank Space.mp3" },
            { title: "As it was", artist: "Harry styles", image: "English/as_it_was.jpeg", src: "English/As It Was.mp3" },
        ],
    },
    {
        name: "Haryanvi",
        image: "playlist3.jpg",
        songs: [
            { title: "Roots", artist: "Bintu Pabra & KP Kundu", image: "Haryanvi/Roots.jpeg", src: "Haryanvi/ROOTS Bintu Pabra.mp3" },
            { title: "Hero Honda", artist: "Raj mawer, Ashu twinkle", image: "Haryanvi/hero_honda.jpg", src: "Haryanvi/Hero Handa Official Music Video Khushi Baliyan Punit Choudhary Raj Mawer Latest Haryanvi Song.mp3" },
            { title: "Russian Bandana", artist: "Dhanda Nyoliwala", image: "Haryanvi/Russian_Bandana.jpeg", src: "Haryanvi/Russian Bandana.mp3" },
            { title: "Solid Body", artist: "Ajay Hooda", image: "Haryanvi/Solid_Body.jpg", src: "Haryanvi/SOLID BODY Ajay Hooda Anjali Raghav Raju Punjabi Sheenam New song of 2015 Mor Music.mp3" },
            { title: "52 GAJ KA DAMAN ", artist: "Renuka Panwar", image: "Haryanvi/52_GAJ_KA_DAMAN.jpeg", src: "Haryanvi/52 GAJ KA DAMAN.mp3" },
            { title: "Ram Ram", artist: "MC Square", image: "Haryanvi/Ram_Ram.jpg", src: "Haryanvi/Ram Ram MC SQUARE Hustle 2.0.mp3" },
        ],
    },
    {
        name: "Punjabi",
        image: "playlist4.jpg",
        songs: [
            { title: "Tere Krke", artist: "Preetinder", image: "punjabi/Tere-Krke.jpeg", src: "punjabi/Tere Krke.mp3" },
            { title: "Winning Speech", artist: "Karan Aujla", image: "punjabi/Winning-Speech.jpg", src: "punjabi/Winning Speech.mp3" },
            { title: "White Brown Black", artist: "Karan Aujla,Jaani,Amanninder Singh", image: "punjabi/White_Brown_Black.jpg", src: "punjabi/White Brown Black.mp3" },
            { title: "Rubicon Drill", artist: "Parmish Verma", image: "punjabi/Rubicon_drill.jpg", src: "punjabi/Rubicon Drill.mp3" },
            { title: "BLACK HEART", artist: "Wazir Patar", image: "punjabi/BLACK_HEART.jpeg", src: "punjabi/BLACK HEART.mp3" },
            { title: "Apa fer milaange", artist: "Savi Kahlon", image: "punjabi/Apa_Fer_Milaange.jpg", src: "punjabi/Apa Fer Milaange.mp3" },
        ],
    },
    {
        name: "Devotionals",
        image: "playlist5.jpg",
        songs: [
            { title: "Samay Samjhayega", artist: "MOhit lalwani, Surya Raj Kamal", image: "Devotionals/Samay_Samjhayega.jpg", src: "Devotionals/Samay Samjhayega.mp3" },
            { title: "Meri lagi Shyam sang preet", artist: "Shivam Chaurasia ,Yashi Parihar", image: "Devotionals/Meri_lagi_Shyam_sang_preet.jpg", src: "Devotionals/Meri lagi Shyam sang preet.mp3" },
        ],
    },
    {
        name: "Hip Hop",
        image: "playlist6.jpg",
        songs: [
            { title: "Death Row", artist: "Dhanda Nyoliwala", image: "Hip_Hop/Death_Row.jpg", src: "Hip_Hop/Death Row.mp3" },
            { title: "The Last Ride", artist: "Sidhu MooseWala, Wazir Patar", image: "Hip_Hop/THE_LAST_RIDE.jpg", src: "Hip_Hop/THE LAST RIDE.mp3" },
        ],
    },
    {
        name: "Diljit Dosanjh",
        image: "playlist7.jpg",
        songs: [
            { title: "Haye Juliet", artist: "Diljit Dosanjh", image: "Diljit_Dosanjh/haye_juliet.jpg", src: "Diljit_Dosanjh/HAYE JULIET.mp3" },
            { title: "Case", artist: "Diljit Dosanjh", image: "Diljit_Dosanjh/casee.jpg", src: "Diljit_Dosanjh/CASE.mp3" },
            { title: "Mombattiye", artist: "Diljit Dosanjh", image: "Diljit_Dosanjh/mombatiye.jpg", src: "Diljit_Dosanjh/Mombattiye.mp3" },
            { title: "Raat di Gedi", artist: "Diljit Dosanjh", image: "Diljit_Dosanjh/Raat_di_gedi.jpg", src: "Diljit_Dosanjh/Raat Di Gedi.mp3" },
            { title: "Putt Jatt Da", artist: "Diljit Dosanjh", image: "Diljit_Dosanjh/putt_jatt_da.jpg", src: "Diljit_Dosanjh/Putt Jatt Da.mp3" },
            { title: "Coke", artist: "Diljit Dosanjh", image: "Diljit_Dosanjh/coke.jpg", src: "Diljit_Dosanjh/Coke Studio Bharat MAGIC.mp3" },
        ],
    },
    {
        name: "old is gold - 90's",
        image: "playlist8.jpg",
        songs: [
            { title: "Jaane kahan mera jigar gaya ji", artist: "Johnny Walker, Mohd Rafi", image: "old_is_gold_90/Jaane_kahan_mera_jigar_gaya_ji.jpg", src: "old_is_gold_90/jaane kahan mera jigar gaya ji.mp3" },
            { title: "Ek Ajnabee Haseena Se", artist: "Kishore Kumar", image: "old_is_gold_90/Ek_Ajnabee_Haseena_Se.png", src: "old_is_gold_90/Ek Ajnabee Haseena Se.mp3" },
            { title: "Main Koi Aisa Geet Gaoon", artist: "Abhijeet & Alka Yagnik ", image: "old_is_gold_90/Main_.Koi_Aisa_Geet_Gaoon.jpeg", src: "old_is_gold_90/Main Koi Aisa Geet Gaoon.mp3" },
            { title: "Likhe Jo Khat Tujhe", artist: " Mohammed Rafi", image: "old_is_gold_90/Likhe_Jo_Khat_Tujhe.jpeg", src: "old_is_gold_90/Likhe Jo Khat Tujhe.mp3" },
            { title: "Yeh Ladka Hai Deewana", artist: "Udit Narayan,Alka Yagnik", image: "old_is_gold_90/Yeh_Ladka_Hai_Deewana.jpg", src: "old_is_gold_90/Yeh Ladka Hai Deewana.mp3" },
            { title: "Mere Samne Wali Khidki Mein", artist: " Sunil Dutt & Kishore Kumar", image: "old_is_gold_90/Mere_Samne_Wali_Khidki_Mein.jpg", src: "old_is_gold_90/Mere Samne Wali Khidki Mein.mp3" },
            { title: "Ek Ladki Ko Dekha Toh Aisa Laga", artist: "Kumar sanu", image: "old_is_gold_90/Ek_Ladki_Ko_Dekha_Toh_Aisa_Laga.avif", src: "old_is_gold_90/Ek Ladki Ko Dekha Toh Aisa Laga.mp3" },
        ],
    },
];

const songsContainer = document.getElementById("songs-container");
let searchInput = document.getElementById("search-input");
let currentPlaylist = [];

function openPlaylist(index) {
    const playlist = playlists[index];
    currentPlaylist = playlist.songs;
    displaySongs(currentPlaylist);
}

function displaySongs(songs) {
    songsContainer.innerHTML = "";
    songs.forEach((song, songIndex) => {
        const songElement = document.createElement("div");
        songElement.classList.add("song");
        songElement.innerHTML = `
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        `;
        songElement.onclick = () => {
            track_index = songIndex;
            playSong(song);
        };
        songsContainer.appendChild(songElement);
    });
}

function playSong(song) {
    track_name.textContent = song.title;
    track_artist.textContent = song.artist;
    track_art.style.backgroundImage = `url(${song.image})`;
    now_playing.textContent = `Playing music`;

    curr_track.src = song.src;
    curr_track.load();
    curr_track.play();

    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function nextTrack() {
    if (isRandom) {
        let random_index = Math.floor(Math.random() * currentPlaylist.length);
        playSong(currentPlaylist[random_index]);
    } else {
        track_index = (track_index + 1) % currentPlaylist.length;
        playSong(currentPlaylist[track_index]);
    }
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = currentPlaylist.length - 1;
    }
    playSong(currentPlaylist[track_index]);
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack(){
    isRepeat ? pauseRepeat() : playRepeat();
}

function playRepeat(){
    isRepeat = true;
    repeatIcon.classList.add('repeatActive');
}

function pauseRepeat(){
    isRepeat = false;
    repeatIcon.classList.remove('repeatActive');
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Search functionality
searchInput.addEventListener('input', function() {
    let query = searchInput.value.toLowerCase();
    let filteredSongs = [];

    playlists.forEach(playlist => {
        filteredSongs = filteredSongs.concat(playlist.songs.filter(song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        ));
    });

    displaySongs(filteredSongs);
});
