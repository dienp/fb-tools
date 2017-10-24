    let endScroll = null;
    let img = null;
    let likeBtn = null;
    let unlikeBtn = null;
    console.info("---------------||Start scrolling||---------------");
    var scrollBot = setInterval(function () {
        endScroll = document.querySelector('._c24:not(._2q3-),._38my');
        unlikeBtn = document.querySelector('a[data-testid="fb-ufi-unlikelink"]');
        window.scrollTo(0, document.body.scrollHeight);
        if (endScroll === null || endScroll === undefined || unlikeBtn === null || unlikeBtn === undefined) {
            img = document.querySelectorAll('._1dwg._1w_m,._3b-9,.uiUfi.UFIContainer');
            for (let i = 0; i < img.length; i++) {
                img[i].parentNode.removeChild(img[i]);
            }
        } else {
            console.info("---------------||Done scrolling||---------------");
            clearInterval(scrollBot);
            likeBtn = document.querySelectorAll('a[data-testid="fb-ufi-likelink"]');
            console.info(`Found ${likeBtn.length} like buttons...`);
            console.info("---------------||Start clicking||---------------");
            let total = 0;
            let likeBot = setInterval(function () {
                likeBtn[++total].click();
                if (total >= likeBtn.length) {
                    console.info("---------------||Done clicking||---------------");
                    clearInterval(likeBot);
                }
            }, 2000)
        }
    }, 2000);
