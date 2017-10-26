(function () {
    let styles = `
    .ptd-dialog {
        position: relative;
        width: 600px;
        margin-left: -300px;
        height: 400px;
        margin-top: -200px;
        background: #fff;
        border: 1px solid rgba(100, 100, 100, .4);
        border-radius: 0 0 2px 2px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
        color: #1d2129;
        overflow: visible;
        box-sizing: border-box;

    }

    .center-point {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12px;
        top: 50%;
        left: 50%;
        position: fixed;
        z-index: 99999;

    }

    .ptd-header {
        background-color: #4267b2;
        border-bottom: 1px solid #29487d;
        color: #fff;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        width: 100%;
        display: inline-block;
    }

    .ptd-body {
        width: 100%;
        height: calc(100% - 30px);
        overflow: auto;
    }

    .ptd-title {
        float: left;
        margin-left: 10px;
        font-weight: bold;

    }

    .ptd-ptd-img-circle {
        border-radius: 50%;
    }

    .ptd-dismiss {
        float: right;
        margin-right: 10px;
        font-size: 15px;
        cursor: pointer;
    }
    .ptd-dismiss:hover{
          transform: scale(1.4);    
    }
    .ptd-img {
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        width: 30px;
        height: 30px;
    }

    .ptd-name {
        float: left;
        margin-left: 10px;
    }

    .ptd-card {
        display: inline;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid rgba(100, 100, 100, .4);
        display: block;
        background: #fff;
        line-height: 50px;
    }

    .ptd-button {
        float: left;
        background-color: #4267b2;
        border-color: #4267b2;
        color: #fff;
        border: 1px solid;
        border-radius: 2px;
        box-sizing: content-box;
        font-size: 12px;
        font-weight: bold;
        justify-content: center;
        padding: 0 8px;
        position: relative;
        text-align: center;
        text-shadow: none;
        vertical-align: middle;
        height: 24px;
        margin-left: 10px;
        margin-top: 13px;
    }
    .ptd-visible {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.2s linear;
    }
    .ptd-hidden {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s 0.2s, opacity 0.2s linear;
    }
`

    let dialog = `<div class="center-point">
    <div class="ptd-dialog">
        <div class="ptd-header">
            <div class="ptd-title">Messenger</div>
            <div class="ptd-dismiss">&times;</div>
        </div>
        <div class="ptd-body">
            <div class="ptd-card">
                <button class="ptd-button">Button</button>
                <img class="ptd-img ptd-img-circle" src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-1/p50x50/21761369_752756941577087_7799875693860459143_n.jpg?oh=281088442b744c9d0810c8987e5b0115&oe=5AAE5A69" />
                <div class="ptd-name">John Doe</div>
            </div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
            <div class="ptd-card"></div>
        </div>
    </div>
</div>`;
    if (!document.head.querySelector("#ptd-style")) {
        let css = document.createElement("style");
        css.id = "ptd-style";
        css.appendChild(document.createTextNode(styles));
        document.head.appendChild(css);
    };
    if (!document.body.querySelector("#ptd-container")) {
        let div = document.createElement("div");
        div.id = "ptd-container";
        div.innerHTML = dialog;
        document.body.appendChild(div);
    };
    document.body.querySelector('.ptd-dismiss').addEventListener('click', function () {
        document.body.querySelector('#ptd-container').classList.add("ptd-hidden");
    });
})();
