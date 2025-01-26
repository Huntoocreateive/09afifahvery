
var url = new URL(window.location.href);
var to = url.searchParams.get("to");
if (to==null || to=="") {
    document.getElementById('guest').innerHTML = "Guest";
} else {
    document.getElementById('guest').innerHTML = to;
}

document.addEventListener('DOMContentLoaded', function() {
    /* 
    |======================================
    | APP INIT 
    |======================================
    */
    AOS.init();
    // Handle video player
    const player = new Plyr('#player');
    // Handle slider gallery
    const slider = tns({
        container: '.row-slider',
        nav: false,
        controls: false,
        edgePadding: 10,
        mouseDrag: true,
        items: 2,
        swipeAngle: 15,
        loop: false,
        slideBy: 'page',
        autoplay: false,
        preventScrollOnTouch: 'auto',
        responsive: {
            768: {
                edgePadding: 50,
            }
        }
    });
    
    /* 
    |======================================
    | OPENING SCRIPT
    |======================================
    */
    // animate spouse text opening
    const headerSpouseText = document.querySelector('#opening h1');
    headerSpouseText.innerHTML = headerSpouseText.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline()
        .add({
            targets: '#opening h1 .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 150*i
        });
    // btn sound and open the opening
    const btn_open = document.querySelector('#btn-open-opening');
    const btn_play = document.querySelector('#btn-play');
    const audio = document.querySelector('#audio');
    btn_open.addEventListener('click', function(e) {
        document.body.classList.remove('opening-show');
        document.body.classList.add('opening-hide');
        for(let aos of document.querySelectorAll('.aos-init')) {
            aos.classList.remove('aos-animate');
        }
        setTimeout(() => {
            document.querySelector('section#opening').remove();
            AOS.refresh();
        }, 2000);

        audio.play();
    })
    btn_play.addEventListener('click', function() {
        if (audio.paused) {
            btn_play.innerHTML = '<i class="ri ri-volume-high"></i>';
            audio.play();
        } else {
            btn_play.innerHTML = '<i class="ri ri-volume-off"></i>';
            audio.pause();
        }
    })
   

    /* 
    |======================================
    | PAGE SCRIPT
    |======================================
    */
    // timezz : countdown
    timezz('#countdown-row', {
        date: new Date(2021, 5, 29, 14, 52),
        stop: false,
        canContinue: false,
        withYears: false,
        beforeCreate() {},
        beforeDestroy() {},
        update(event) {},
    });
    // lightgallery : image lightbox popup
    lightGallery(document.getElementById('row-lightgallery'), {
        mode: 'lg-fade',
        cssEasing: 'ease-in',
        speed: 1000,
        startClass: 'lg-fade',
        backdropDuration: 500,
        hideBarsDelay: 500,
        selector: '[data-src]',
        download: false,
    });
    // page href smooth scroll
    const btn_href_page = document.querySelectorAll('.page-scroll');
    for (let btn of btn_href_page) {
        btn.addEventListener('click', function(e) {
            window.scrollTo({
                top: document.querySelector(`${this.getAttribute('href')}`).offsetTop - 50,
                behavior: 'smooth'
            });
            e.preventDefault();
        })
    }
    // back to top & nav-item active class
    const btn_to_top = document.querySelector('#btn-to-top');
    const navbar = document.querySelector('.navbar');
    const navlinks = document.querySelectorAll('.nav-link.page-scroll');
    const imlinks = document.querySelectorAll('.im-link.page-scroll');
    let str_section_query = "";
    let im_section_query = "";
    for (let indexNavlink = 0; indexNavlink < navlinks.length; indexNavlink++) {
        if (indexNavlink !== navlinks.length-1) {
            str_section_query += `${navlinks[indexNavlink].getAttribute('href')}, `;
        } else {
            str_section_query += `${navlinks[indexNavlink].getAttribute('href')}`;
        }
    }
    for (let indexImlink = 0; indexImlink < imlinks.length; indexImlink++) {
        if (indexImlink !== imlinks.length-1) {
            im_section_query += `${imlinks[indexImlink].getAttribute('href')}, `;
        } else {
            im_section_query += `${imlinks[indexImlink].getAttribute('href')}`;
        }
    }
    sectionlistener = document.querySelectorAll(str_section_query);
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            btn_to_top.style.display = 'flex';
        } else {
            navbar.classList.remove('navbar-scrolled');
            btn_to_top.style.display = 'none';
        }

        for (let link of document.querySelectorAll('.nav-link')) {
            link.classList.remove('active');
        }
        for (let section of sectionlistener) {
            if (
                window.scrollY > (section.offsetTop - 100) &&
                window.scrollY < (section.offsetTop + section.offsetHeight)
            ) {
                for (let link of document.querySelectorAll('.nav-link')) {
                    link.classList.remove('active');
                }
                document.querySelector(`.nav-link[href="#${section.id}"]`).classList.add('active');
            }
        }
    })

    getData();    
});

async function getData(){
    const response= await fetch('https://script.google.com/macros/s/AKfycbysTHIfiYJKmqn0sdmEVl1-aIhfNC3CbyEseiX9ST0zY1gdNoWZkcBe9ZpteHxb0466/exec?sheetName=AfifahVery');
    const data= await response.json();
    length = data.length;
    let content ='';
    for(i=0;i<length;i++)
    {
        sort = length - (i+1);
        const nama = data[sort].nama;
        const pesan = data[sort].pesan;
        const date = data[sort].date;
        content +=
        `<div class="card mb-5">
            <div class="card-body">
                <div class="row gx-lg-5">
                    <div class="col-auto pt-3">
                        <div class="obj-fit obj-fit-cover w-4rem h-4rem rounded-circle">
                            <img src="_assets/img/icons/avatar.svg" alt="">
                        </div>
                    </div>
                    <div class="col">
                        <h5 class="font-medium mb-3">`+ nama +`</h5>
                        <h6 class="font-light">`
                            + pesan +
                        `</h6>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById('message').innerHTML = content;
}

let modalAmplop = document.getElementById('modal-amplop');
let btnAmplop = document.getElementById('btn-amplop');
function copyRekening(id) {
    /* Get the text field */
    let copyText = document.getElementById(id);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
}
function toggleModal() {
    modalAmplop.classList.toggle('show')
    modalAmplop.classList.toggle('d-block')
}

// Mengatur waktu akhir perhitungan mundur
let countDownDate = new Date("Feb 09, 2025 07:00:00").getTime();

// Memperbarui hitungan mundur setiap 1 detik
let x = setInterval(function() {

// Untuk mendapatkan tanggal dan waktu hari ini
let now = new Date().getTime();
    
// Temukan jarak antara sekarang dan tanggal hitung mundur
let distance = countDownDate - now;
    
// Perhitungan waktu untuk hari, jam, menit dan detik
let days = Math.floor(distance / (1000 * 60 * 60 * 24));
let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
// Keluarkan hasil dalam elemen dengan id = "demo"
document.getElementById("day").innerHTML = days;
document.getElementById("hour").innerHTML = hours;
document.getElementById("min").innerHTML = minutes;
document.getElementById("sec").innerHTML = seconds;
    
// Jika hitungan mundur selesai, tulis beberapa teks 
if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-row").innerHTML = "SELAMAT BERBAHAGIA";
}
}, 1000);

// init Map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: -6.4070953, lng: 107.4157555 },
    });
    const image =
        "_assets/img/decoration/maps-marker.png";
    const beachMarker = new google.maps.Marker({
        position: { lat: -6.4070953, lng: 107.4157555 },
        map,
        icon: image,
    });
}

window.initMap = initMap;

let formrsvp = document.getElementById('rsvp');

let modalSuccess = document.getElementById('modal-tamu');

formrsvp.addEventListener('submit', function(e){
    e.preventDefault();
    
    let date = new Date();
    let nama = document.getElementById('nama').value;
    let nomor_hp = document.getElementById('nomor_hp').value;
    let pesan = document.getElementById('pesan').value;
    
    var radios = document.getElementsByName('kehadiran');
    for (var radio of radios)
    {
        if (radio.checked) {
            var kehadiran = radio.value;
        }
    }
    
    let body = {
        "sheetName": "AfifahVery",
        date,
        nama,
        nomor_hp,
        kehadiran,
        pesan,
    }

    fetch('https://script.google.com/macros/s/AKfycbysTHIfiYJKmqn0sdmEVl1-aIhfNC3CbyEseiX9ST0zY1gdNoWZkcBe9ZpteHxb0466/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(function(){
        modalSuccess.classList.toggle('show')
        modalSuccess.classList.toggle('d-block')
    }).catch(error => console.error('Error:', error));
});

function successTamu() {
    document.location.reload();
}

function toggleModalSuccess() {
    modalSuccess.classList.toggle('show')
    modalSuccess.classList.toggle('d-block')
}