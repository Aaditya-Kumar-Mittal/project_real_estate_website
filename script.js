function locomotionTriggerer() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

locomotionTriggerer()

var clutter = "";

document.querySelector("#page-2>h1").textContent.split("").forEach(function (dets) {
  console.log(dets); // Log each character
  clutter += `<span>${dets}</span>`;
});

document.querySelector("#page-2>h1").innerHTML = clutter;
console.log(document.querySelector("#page-2>h1").innerHTML); // Log the final HTML

gsap.to("#page-2>h1>span", {
  scrollTrigger: {
    trigger: `#page-2>h1`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`
});

function canvas() {
  const canvas = document.querySelector("#page-3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./assets/images/frames/frames00007.png
./assets/images/frames/frames00010.png
./assets/images/frames/frames00013.png
./assets/images/frames/frames00016.png
./assets/images/frames/frames00019.png
./assets/images/frames/frames00022.png
./assets/images/frames/frames00025.png
./assets/images/frames/frames00028.png
./assets/images/frames/frames00031.png
./assets/images/frames/frames00034.png
./assets/images/frames/frames00037.png
./assets/images/frames/frames00040.png
./assets/images/frames/frames00043.png
./assets/images/frames/frames00046.png
./assets/images/frames/frames00049.png
./assets/images/frames/frames00052.png
./assets/images/frames/frames00055.png
./assets/images/frames/frames00058.png
./assets/images/frames/frames00061.png
./assets/images/frames/frames00064.png
./assets/images/frames/frames00067.png
./assets/images/frames/frames00070.png
./assets/images/frames/frames00073.png
./assets/images/frames/frames00076.png
./assets/images/frames/frames00079.png
./assets/images/frames/frames00082.png
./assets/images/frames/frames00085.png
./assets/images/frames/frames00088.png
./assets/images/frames/frames00091.png
./assets/images/frames/frames00094.png
./assets/images/frames/frames00097.png
./assets/images/frames/frames00100.png
./assets/images/frames/frames00103.png
./assets/images/frames/frames00106.png
./assets/images/frames/frames00109.png
./assets/images/frames/frames00112.png
./assets/images/frames/frames00115.png
./assets/images/frames/frames00118.png
./assets/images/frames/frames00121.png
./assets/images/frames/frames00124.png
./assets/images/frames/frames00127.png
./assets/images/frames/frames00130.png
./assets/images/frames/frames00133.png
./assets/images/frames/frames00136.png
./assets/images/frames/frames00139.png
./assets/images/frames/frames00142.png
./assets/images/frames/frames00145.png
./assets/images/frames/frames00148.png
./assets/images/frames/frames00151.png
./assets/images/frames/frames00154.png
./assets/images/frames/frames00157.png
./assets/images/frames/frames00160.png
./assets/images/frames/frames00163.png
./assets/images/frames/frames00166.png
./assets/images/frames/frames00169.png
./assets/images/frames/frames00172.png
./assets/images/frames/frames00175.png
./assets/images/frames/frames00178.png
./assets/images/frames/frames00181.png
./assets/images/frames/frames00184.png
./assets/images/frames/frames00187.png
./assets/images/frames/frames00190.png
./assets/images/frames/frames00193.png
./assets/images/frames/frames00196.png
./assets/images/frames/frames00199.png
./assets/images/frames/frames00202.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page-3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page-3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas()


var clutter = "";

document.querySelector("#page-4>h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page-4>h1").innerHTML = clutter;
})

gsap.to("#page-4>h1>span", {
  scrollTrigger: {
    trigger: `#page-4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
  },
  stagger: .2,
  color: `#fff`
})

function canvas1() {
  const canvas = document.querySelector("#page-5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./assets/images/bridges/bridges00004.png
./assets/images/bridges/bridges00007.png
./assets/images/bridges/bridges00010.png
./assets/images/bridges/bridges00013.png
./assets/images/bridges/bridges00016.png
./assets/images/bridges/bridges00019.png
./assets/images/bridges/bridges00022.png
./assets/images/bridges/bridges00025.png
./assets/images/bridges/bridges00028.png
./assets/images/bridges/bridges00031.png
./assets/images/bridges/bridges00034.png
./assets/images/bridges/bridges00037.png
./assets/images/bridges/bridges00040.png
./assets/images/bridges/bridges00043.png
./assets/images/bridges/bridges00046.png
./assets/images/bridges/bridges00049.png
./assets/images/bridges/bridges00052.png
./assets/images/bridges/bridges00055.png
./assets/images/bridges/bridges00058.png
./assets/images/bridges/bridges00061.png
./assets/images/bridges/bridges00064.png
./assets/images/bridges/bridges00067.png
./assets/images/bridges/bridges00070.png
./assets/images/bridges/bridges00073.png
./assets/images/bridges/bridges00076.png
./assets/images/bridges/bridges00079.png
./assets/images/bridges/bridges00082.png
./assets/images/bridges/bridges00085.png
./assets/images/bridges/bridges00088.png
./assets/images/bridges/bridges00091.png
./assets/images/bridges/bridges00094.png
./assets/images/bridges/bridges00097.png
./assets/images/bridges/bridges00100.png
./assets/images/bridges/bridges00103.png
./assets/images/bridges/bridges00106.png
./assets/images/bridges/bridges00109.png
./assets/images/bridges/bridges00112.png
./assets/images/bridges/bridges00115.png
./assets/images/bridges/bridges00118.png
./assets/images/bridges/bridges00121.png
./assets/images/bridges/bridges00124.png
./assets/images/bridges/bridges00127.png
./assets/images/bridges/bridges00130.png
./assets/images/bridges/bridges00133.png
./assets/images/bridges/bridges00136.png
./assets/images/bridges/bridges00139.png
./assets/images/bridges/bridges00142.png
./assets/images/bridges/bridges00145.png
./assets/images/bridges/bridges00148.png
./assets/images/bridges/bridges00151.png
./assets/images/bridges/bridges00154.png
./assets/images/bridges/bridges00157.png
./assets/images/bridges/bridges00160.png
./assets/images/bridges/bridges00163.png
./assets/images/bridges/bridges00166.png
./assets/images/bridges/bridges00169.png
./assets/images/bridges/bridges00172.png
./assets/images/bridges/bridges00175.png
./assets/images/bridges/bridges00178.png
./assets/images/bridges/bridges00181.png
./assets/images/bridges/bridges00184.png
./assets/images/bridges/bridges00187.png
./assets/images/bridges/bridges00190.png
./assets/images/bridges/bridges00193.png
./assets/images/bridges/bridges00196.png
./assets/images/bridges/bridges00199.png
./assets/images/bridges/bridges00202.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page-5`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page-5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas1()


var clutter = "";

document.querySelector("#page-6>h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page-6>h1").innerHTML = clutter;
})

gsap.to("#page-6>h1>span", {
  scrollTrigger: {
    trigger: `#page-6>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
  },
  stagger: .2,
  color: `#fff`
})
function canvas2() {
  const canvas = document.querySelector("#page-7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `

https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page-7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page-7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2()



gsap.to(".page7-circle", {
  scrollTrigger: {
    trigger: `.page7-circle`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  scale: 1.5
})



gsap.to(".page7-cir-inner", {
  scrollTrigger: {
    trigger: `.page7-cir-inner`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  backgroundColor: `#0a3bce91`,
})