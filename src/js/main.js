(() => {
  const typewriter = (node, str, latency = 5) => {
    node.innerHTML = "# &nbsp;";
    let pos = 0;
    let currentEvent = node.getAttribute('next_event');
    let interval = setInterval(() => {
      node.innerHTML = node.innerText + str[pos++];
      if(pos == str.length) clearInterval(interval);
    }, latency);
    return interval;
  };

  /**
   * Event Controller
   */
  (() => {
    const navBox = document.querySelector('.nav-box');
    const balloon = navBox.querySelector('.balloon');
    const xiaomi = navBox.querySelector('#xiaomi');
    const content = balloon.querySelector('.balloon-content');

    // States of chatting
    const States = {
      init: {
        getIn: () => {
          //content.innerText = "摸摸頭！";
          States.init.interrupt = typewriter(content, "摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！");
          xiaomi.setAttribute('next_event', 'intro');
        },
        getOut: () => {
          xiaomi.setAttribute('next_event', '');
          if(States.init.interrupt != undefined) clearInterval(States.init.interrupt);
        }
      },
      intro: {
        getIn: () => {
          States.intro.interrupt = [typewriter(content, "你好～我是來自東部開源學生社群的小彌，我們是由一群喜歡資訊的學生組成的開源社群，每個月都會聚會聊資訊談技術、分享經驗，如果你也是同樣熱愛資訊的夥伴，歡迎參加定期聚"), setTimeout(() => { xiaomi.click(); console.log(1);}, 3000)];
          xiaomi.setAttribute('next_event', 'nav');
        },
        getOut: () => {
          if(States.intro.interrupt != undefined) {
            clearInterval(States.intro.interrupt[0]);
            clearTimeout(States.intro.interrupt[1]);
          }
        }
      },
      nav: {
        getIn: () => {
          content.innerHTML = `$ 導覽
            <ul>
              <li><a href="https://fb.me/SOSCET/">Facebook 粉絲團</a></li>
              <li><a href="#open-source">認識開源</a></li>
              <li><a href="#events">近期活動</a></li>
            </ul>`;
        }
      }
    };

    // initial state
    States.init.getIn();
    let currentState = States.init;

    // bind event to container, emit event according to 'next_event' attribute
    navBox.addEventListener('click', (e) => {
      const target = e.target;
      console.log(target);
      const next = target.getAttribute('next_event');
      if(next != undefined && States[next] != null && next != '') {
        if(currentState.getOut) currentState.getOut();
        if(States[next].getIn()) States[next].getIn();
        currentState = States[next];
      }

      e.stopPropagation();
    });
  })();
})();
