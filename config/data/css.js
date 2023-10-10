var styleChat = 
`@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

:root {
  /* chat */
  /* owner/streamer */
  --owner-name-color: #ffffff;
  --owner-bg-name-color: #645D5A;
  --owner-message-color: #1F1B1C;
  --owner-bg-message-color: #FFF6EB;
  --decoration-color-owner: #fec175;

  /* moderator */
  --moderator-name-color: #ffffff;
  --moderator-bg-name-color: #645D5A;
  --moderator-message-color: #1F1B1C;
  --moderator-bg-message-color: #FFF6EB;
  --decoration-color-moderator: #83B0E1;

  /* member */
  --member-name-color: #ffffff;
  --member-bg-name-color: #645D5A;
  --member-message-color: #1F1B1C;
  --member-bg-message-color: #FFF6EB;
  --decoration-color-member: #88CC88;

  /* viewers */
  --general-name-color: #ffffff;
  --general-bg-name-color: #645D5A;
  --general-message-color: #1F1B1C;
  --general-bg-message-color: #FFF6EB;
  --decoration-color-viewers: #FC920E;

  /* membership announce */
  --membership-name-color: #ffffff;
  --membership-subtext-color: #ffffff;
  --membership-other-color: #ffffff;
  --membership-message-color: #000000;
  --membership-bg-color: #88CC88;
  --background-name-membership: #645D5A;
  --background-message-membership: #FFF6EB;

  /* sc */
  --sc-name-color: #ffffff;
  --sc-amount-color: #000000;
  --sc-message-color: #000000;
  --sc-bg-color: #FFF6EB;
  --background-name-sc: #645D5A;
  --background-message-sc: #FFF6EB;


  --name-font-size: 14px;
  --message-font-size: 18px;

  --sc-name-font-size: 14px;
  --sc-amount-font-size: 24px;
  --sc-message-font-size: 16px;

  --membership-name-font-size: 16px;
  --membership-subtext-font-size: 24px;
  --membership-other-font-size: 14px;
  --membership-message-font-size: 14px;

  --mod-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='151' height='143' viewBox='0 0 151 143' fill='none'%3E%3Cpath d='M144.579 114.352L85.7468 58.2787C91.5654 44.1063 88.3328 27.4691 76.0492 15.7614C63.119 3.43752 43.7238 0.972744 28.2076 7.75087L56.0075 34.2472L36.6122 52.733L8.16592 26.2367C0.407829 41.0253 3.64037 59.5111 16.5705 71.835C28.8542 83.5427 46.3099 86.6236 61.1795 81.0779L120.012 137.152C122.598 139.616 126.477 139.616 129.063 137.152L143.932 122.979C147.165 120.514 147.165 116.201 144.579 114.352Z' fill='white' stroke='black' stroke-width='7.49708'/%3E%3C/svg%3E");
  --clip-decoration: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'18\' height=\'18\' viewBox=\'0 0 18 18\' fill=\'none\'%3E%3Cg id=\'myGroup\'%3E%3Cpath d=\'M16.2 3.6C15.2059 3.6 14.4 2.79411 14.4 1.8C14.4 0.805887 15.2059 0 16.2 0C17.1941 0 18 0.805887 18 1.8C18 2.79411 17.1941 3.6 16.2 3.6Z\' fill=\'%23FC920E\'/%3E%3Cpath d=\'M7.20007 9.0002C7.20007 9.99431 8.00596 10.8002 9.00007 10.8002C9.99419 10.8002 10.8001 9.99431 10.8001 9.0002C10.8001 8.00608 9.99419 7.2002 9.00007 7.2002C8.00596 7.2002 7.20007 8.00608 7.20007 9.0002Z\' fill=\'%23FC920E\'/%3E%3Cpath d=\'M9.00007 18.0004C8.00596 18.0004 7.20007 17.1945 7.20007 16.2004C7.20007 15.2063 8.00596 14.4004 9.00007 14.4004C9.99419 14.4004 10.8001 15.2063 10.8001 16.2004C10.8001 17.1945 9.99419 18.0004 9.00007 18.0004Z\' fill=\'%23FC920E\'/%3E%3Cpath d=\'M16.2 18.0004C15.2059 18.0004 14.4 17.1945 14.4 16.2004C14.4 15.2063 15.2059 14.4004 16.2 14.4004C17.1941 14.4004 18 15.2063 18 16.2004C18 17.1945 17.1941 18.0004 16.2 18.0004Z\' fill=\'%23FC920E\'/%3E%3Cpath d=\'M0 16.2004C0 17.1945 0.805887 18.0004 1.8 18.0004C2.79411 18.0004 3.6 17.1945 3.6 16.2004C3.6 15.2063 2.79411 14.4004 1.8 14.4004C0.805887 14.4004 0 15.2063 0 16.2004Z\' fill=\'%23FC920E\'/%3E%3Cpath d=\'M16.2 10.8002C15.2059 10.8002 14.4 9.99431 14.4 9.0002C14.4 8.00608 15.2059 7.2002 16.2 7.2002C17.1941 7.2002 18 8.00608 18 9.0002C18 9.99431 17.1941 10.8002 16.2 10.8002Z\' fill=\'%23FC920E\'/%3E%3C/g%3E%3C/svg%3E%0A#myGroup');
  --cheese-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M12.17 2.40888L15.5294 1.52148L13.5011 9.12773C13.163 9.08547 12.3095 9.20379 11.5995 10.0151C10.8896 10.8265 11.6841 12.2547 12.17 12.8675L11.0291 16.1001C9.99378 15.9733 7.27666 15.1493 4.69054 12.8675C2.10442 10.5856 1.28886 7.47971 1.20435 6.212L7.92319 3.35966C8.21899 3.909 9.10216 5.00768 10.2684 5.00768C11.4347 5.00768 12.0221 3.27515 12.17 2.40888Z' fill='%23FD8D02'/%3E%3Cpath d='M17.1012 0L13.9542 9.96626L13.2983 9.87807C13.0222 9.84017 12.7415 9.90115 12.506 10.0502C12.2705 10.1993 12.0953 10.4269 12.0114 10.6927C11.9276 10.9585 11.9404 11.2454 12.0476 11.5026C12.1549 11.7599 12.3497 11.9709 12.5976 12.0984L13.1849 12.4031L11.7008 17.102L10.3922 16.791C5.41775 15.606 1.50305 11.7157 0.318089 6.73734L0 5.40121L8.63721 2.67305L8.84665 3.47457C8.8864 3.63037 8.95753 3.77641 9.05568 3.90377C9.15382 4.03113 9.27693 4.13712 9.41745 4.21525C9.55798 4.29339 9.71297 4.34203 9.87294 4.3582C10.0329 4.37436 10.1945 4.35772 10.3478 4.30928C10.5011 4.26084 10.643 4.18162 10.7646 4.07647C10.8862 3.97133 10.9852 3.84247 11.0553 3.69777C11.1254 3.55308 11.1653 3.3956 11.1724 3.23498C11.1796 3.07435 11.1539 2.91395 11.0969 2.76359L10.8087 1.98727L17.1012 0ZM12.7417 3.02814C12.7614 3.40184 12.7049 3.77565 12.5756 4.12681C12.4462 4.47796 12.2468 4.79911 11.9893 5.0707C11.7319 5.34229 11.4218 5.55864 11.0781 5.70655C10.7344 5.85447 10.3641 5.93087 9.98988 5.9311C9.52223 5.93144 9.0622 5.81264 8.6532 5.58589C8.2442 5.35914 7.89971 5.03193 7.65224 4.63512L1.87232 6.46177C2.93445 10.7764 6.32635 14.1573 10.6418 15.2305L11.3111 13.1101C10.9127 12.7569 10.6252 12.2958 10.4834 11.7827C10.3415 11.2695 10.3513 10.7263 10.5117 10.2186C10.672 9.71087 10.9759 9.26049 11.3868 8.92187C11.7976 8.58325 12.2977 8.37089 12.8267 8.31046L14.6888 2.41322L12.7417 3.02814ZM6.84048 7.50579C6.68539 7.50579 6.53182 7.53634 6.38853 7.59569C6.24524 7.65505 6.11504 7.74204 6.00538 7.85171C5.89571 7.96138 5.80871 8.09157 5.74936 8.23486C5.69001 8.37815 5.65946 8.53172 5.65946 8.68682C5.65946 8.84191 5.69001 8.99549 5.74936 9.13877C5.80871 9.28206 5.89571 9.41226 6.00538 9.52193C6.11504 9.63159 6.24524 9.71859 6.38853 9.77794C6.53182 9.83729 6.68539 9.86784 6.84048 9.86784C7.15371 9.86784 7.45411 9.74341 7.67559 9.52193C7.89708 9.30044 8.02151 9.00004 8.02151 8.68682C8.02151 8.37359 7.89708 8.07319 7.67559 7.85171C7.45411 7.63022 7.15371 7.50579 6.84048 7.50579ZM4.08476 8.68682C4.08476 8.32493 4.15604 7.96659 4.29453 7.63225C4.43302 7.29791 4.636 6.99412 4.8919 6.73823C5.14779 6.48234 5.45158 6.27935 5.78592 6.14086C6.12026 6.00238 6.4786 5.9311 6.84048 5.9311C7.20237 5.9311 7.56071 6.00238 7.89505 6.14086C8.22939 6.27935 8.53318 6.48234 8.78907 6.73823C9.04497 6.99412 9.24795 7.29791 9.38644 7.63225C9.52493 7.96659 9.5962 8.32493 9.5962 8.68682C9.5962 9.41768 9.30587 10.1186 8.78907 10.6354C8.27228 11.1522 7.57135 11.4425 6.84048 11.4425C6.10962 11.4425 5.40869 11.1522 4.8919 10.6354C4.3751 10.1186 4.08476 9.41768 4.08476 8.68682Z' fill='%23645D5A'/%3E%3C/svg%3E");

}

/* Background colors*/
body {
  overflow: hidden;
  background-color: transparent;
}

/* Transparent background. */
yt-live-chat-renderer {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer,
yt-live-chat-text-message-renderer[is-highlighted] {
  width: fit-content;
}

yt-live-chat-text-message-renderer[author-type='owner'],
yt-live-chat-text-message-renderer[author-type='owner'][is-highlighted] {
  background-color: transparent !important;
  width: fit-content;
}

yt-live-chat-text-message-renderer[author-type='moderator'],
yt-live-chat-text-message-renderer[author-type='moderator'][is-highlighted] {
  background-color: transparent !important;
  width: fit-content;
}

yt-live-chat-text-message-renderer[author-type='member'],
yt-live-chat-text-message-renderer[author-type='member'][is-highlighted] {
  background-color: transparent !important;
  width: fit-content;
}

yt-live-chat-text-message-renderer * {
  width: fit-content !important;
}


yt-live-chat-author-chip #author-name {
  background-color: transparent !important;
}

/* Outlines */
yt-live-chat-renderer * {
  /* text-shadow: -1px -1px #2b2b2b,-1px 0px #2b2b2b,-1px 1px #2b2b2b,0px -1px #2b2b2b,0px 0px #2b2b2b,0px 1px #2b2b2b,1px -1px #2b2b2b,1px 0px #2b2b2b,1px 1px #2b2b2b; */
  font-family: 'Quicksand';
}

yt-live-chat-text-message-renderer #content,
yt-live-chat-legacy-paid-message-renderer #content {
  overflow: initial !important;
}

yt-live-chat-text-message-renderer #content {
  max-width: 100% !important;
  /* min-width: 30vw !important; */
}

/* Hide scrollbar. */
yt-live-chat-item-list-renderer #items {
  overflow: hidden !important;
}

yt-live-chat-item-list-renderer #item-scroller {
  overflow: hidden !important;
}

/* Hide header and input. */
yt-live-chat-header-renderer,
yt-live-chat-message-input-renderer {
  display: none !important;
}

/* Reduce side padding. */
yt-live-chat-text-message-renderer,
yt-live-chat-legacy-paid-message-renderer {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

yt-live-chat-paid-message-renderer #header {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

/* yt-live-chat-text-message-renderer #author-photo * {
  border: 1px solid red;;
} */

/* Avatars. */
/* yt-live-chat-text-message-renderer #author-photo img {
  border-radius: 50% !important;
  animation: scale-in-center 0.4s ease both !important;
} */

yt-live-chat-text-message-renderer #author-photo {
  border-radius: 50% !important;
  background-color: transparent;
  border-radius: 50%;
  display: none !important;
  margin-right: 0 !important;
  margin-bottom: auto !important;
  padding-top: 10px !important;
  overflow: visible !important;
}


#author-photo,
yt-live-chat-membership-item-renderer #author-photo {
  display: none !important;
}

yt-live-chat-paid-message-renderer #author-photo,
yt-live-chat-legacy-paid-message-renderer #author-photo {
  display: inline !important;
}

/* Hide badges. */
yt-live-chat-text-message-renderer #author-badges {

  vertical-align: text-top !important;
}

/* Timestamps. */
yt-live-chat-text-message-renderer #timestamp,
yt-live-chat-membership-item-renderer #timestamp {

  color: #999999 !important;
  font-family: 'Quicksand';
  font-size: 16px !important;
  line-height: 16px !important;
  display: none !important;
}

/* Badges. */
yt-live-chat-text-message-renderer #chat-badges {
  align-self: center !important;
  z-index: 3 !important;
  order: 2;
}

yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer[type='moderator'] yt-icon {
  padding: 0px !important;
  padding-left: 10px !important;
  /* margin: 0px !important; */
  color: var(--moderator-name-color) !important;
  width: 15px !important;
  height: 15px !important;
  position: relative !important;
  display: none !important;
}

yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer[type='member'] * {
  padding: 0 0px 0 5px !important;
  /* margin: 0px !important; */
  position: relative !important;
  width: 15px !important;
  height: 15px !important;
}

/* Channel names. */
yt-live-chat-text-message-renderer yt-live-chat-author-chip {
  position: relative !important;
  overflow: visible !important;
  z-index: 3 !important;
  width: fit-content !important;
  /* margin-top: 10px !important; */
  margin-left: 20px !important;
  padding: 4px 15px 4px 15px;
  border-radius: 50px !important;
  transform-origin: bottom !important;
  animation: slide-in-name 0.3s ease both;
}

@keyframes slide-in-name {
  0% {
    opacity: 0;
    transform: translateX(-70px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

yt-live-chat-text-message-renderer[author-type='owner'] yt-live-chat-author-chip {
  background: var(--owner-bg-name-color) !important;
}
yt-live-chat-text-message-renderer[author-type='moderator'] yt-live-chat-author-chip {
  background: var(--moderator-bg-name-color) !important;
}
yt-live-chat-text-message-renderer[author-type='member'] yt-live-chat-author-chip {
  background: var(--member-bg-name-color) !important;
}
yt-live-chat-text-message-renderer yt-live-chat-author-chip {
  background: var(--general-bg-name-color) !important;
}

yt-live-chat-text-message-renderer[author-type='owner'] yt-live-chat-author-chip::before {
  content: '';
  background: var(--cheese-icon);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 20px;
  top: -5px;
  left: -8px;
  position: absolute;
}

yt-live-chat-text-message-renderer #author-name {
  font-family: 'Quicksand' !important;
  font-size: var(--name-font-size) !important;
  font-weight: 400 !important;
  letter-spacing: normal !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  width: fit-content !important;
  z-index: 3 !important;
  position: relative !important;
  max-width: 50vw !important;
  text-transform: uppercase !important;
  /* margin-top: -60px !important; */
}

yt-live-chat-text-message-renderer[author-type='owner'] #author-name {
  color: var(--owner-name-color) !important;
}
yt-live-chat-text-message-renderer[author-type='moderator'] #author-name {
  color: var(--moderator-name-color) !important;
}
yt-live-chat-text-message-renderer[author-type='member'] #author-name {
  color: var(--member-name-color) !important;
}
yt-live-chat-text-message-renderer #author-name {
  color: var(--general-name-color) !important;
}

/* Messages. */
yt-live-chat-text-message-renderer {
  position: relative !important;
  overflow: visible !important;
  padding: 5px 10px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: row !important;
  contain: none !important;
}

yt-live-chat-text-message-renderer #content {
  overflow: visible !important;
  position: relative !important;
  width: fit-content !important;
  margin-bottom: 5px !important;
  /* padding-top: 10px !important; */
  padding-left: 20px !important;
  padding-right: 20px !important;
  max-width: 80vw !important;
  z-index: 1 !important;
  transform-origin: bottom left !important;
}

/* @keyframes slide-in-bottom {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
} */

yt-live-chat-text-message-renderer #message,
yt-live-chat-text-message-renderer #message * {
  font-family: 'Quicksand' !important;
  font-size: var(--message-font-size, 20px)!important;
  font-weight: 500 !important;
  line-height: 100% !important;
  /* max-height: 4em !important; */
  text-align: start !important;
}

yt-live-chat-text-message-renderer #message {
  display: block !important;
  position: relative !important;
  width: fit-content !important;
  min-width: 20vw !important;
  padding: 15px 25px 15px 30px !important;
  margin-top: 5px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  z-index: 1 !important;
  transform-origin: bottom left !important;
  border-radius: 14px !important;
  border: 2px solid #ffffff;
  animation: slide-in 0.3s ease 0.1s both;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

yt-live-chat-text-message-renderer[author-type='moderator'] #content::before {
  content: '';
  background: var(--mod-icon);
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
  width: 20px;
  height: 20px;
  bottom: -3px;
  left: 17px;
  z-index: 99;
  position: absolute;
  animation: slide-in 0.3s ease 0.1s both;
}

yt-live-chat-text-message-renderer[author-type='owner'] #message {
  background: var(--owner-bg-message-color) !important;
}
yt-live-chat-text-message-renderer[author-type='moderator'] #message {
  background: var(--moderator-bg-message-color) !important;
}
yt-live-chat-text-message-renderer[author-type='member'] #message {
  background: var(--member-bg-message-color) !important;
}
yt-live-chat-text-message-renderer #message {
  background: var(--general-bg-message-color) !important;
}

yt-live-chat-text-message-renderer #message::before {
  content: '';
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 15px;
  top: 1px;
  left: 1px;
  bottom: 1px;
  position: absolute;
  /* animation: slide-in 0.3s ease 0.1s both; */
}

yt-live-chat-text-message-renderer[author-type='owner'] #message::before {
  background: var(--decoration-color-owner);
}
yt-live-chat-text-message-renderer[author-type='moderator'] #message::before {
  background: var(--decoration-color-moderator);
}
yt-live-chat-text-message-renderer[author-type='member'] #message::before {
  background: var(--decoration-color-member);
}
yt-live-chat-text-message-renderer #message::before {
  background: var(--decoration-color-viewers);
}

yt-live-chat-text-message-renderer #message::after {
  content: '';
  background: var(--clip-decoration);
  background-size: contain;
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
  right: 5px;
  bottom: 5px;
  position: absolute;
  transform-origin: bottom right;
  animation: scale-decoration 0.3s ease 0.2s both;
}

@keyframes scale-decoration {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}


yt-live-chat-text-message-renderer[author-type='owner'] #message,
yt-live-chat-text-message-renderer[author-type='owner'] #message * {
  color: var(--owner-message-color) !important;
}
yt-live-chat-text-message-renderer[author-type='moderator'] #message,
yt-live-chat-text-message-renderer[author-type='moderator'] #message * {
  color: var(--moderator-message-color) !important;
}
yt-live-chat-text-message-renderer[author-type='member'] #message,
yt-live-chat-text-message-renderer[author-type='member'] #message * {
  color: var(--member-message-color) !important;
}
yt-live-chat-text-message-renderer #message,
yt-live-chat-text-message-renderer #message * {
  color: var(--general-message-color) !important;
}


@keyframes scale-xy {
  0% {
    transform: scale(0,0);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.1,0.9);
  }
  75% {
    transform: scale(0.9,1.1);
  }
  100% {
    transform: scale(1,1);
  }
}



/* temp */
ytd-sponsorships-live-chat-gift-redemption-announcement-renderer,
yt-live-chat-legacy-paid-message-renderer {
  display: none !important;
}

/* yt-live-chat-paid-message-renderer * {
  border: 1px solid red;
} */



/* superchat */
yt-live-chat-paid-message-renderer {
  text-align: center !important;
  margin-left: auto !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  margin-right: auto !important;
  padding: 0 !important;
  font-size: unset !important;
  /* padding-bottom: 20px !important; */
  overflow: visible !important;
  position: relative !important;
}

yt-live-chat-paid-message-renderer #card {
  /* background: var(--yt-live-chat-paid-message-secondary-color) !important; */
  background: transparent !important;
  width: 70vw !important;
  margin: 0px auto 0px 30px !important;
  position: relative !important;
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  font-size: unset !important;
  transform-origin: bottom !important;
  z-index: 1 !important;
  animation: none !important;
}

yt-live-chat-paid-message-renderer #header {
  background-color: var(--sc-bg-color) !important;
  color: transparent !important;
  width: 100% !important;
  border: 3px solid #ffffff !important;
  border-radius: 10px !important;
  overflow: visible !important;
  padding: 15px 0 !important;
  margin: 0 !important;
  /* padding: 10px 15px 15px 15px !important; */
  position: relative !important;
  animation: slide-in 0.3s ease both !important;
}

yt-live-chat-paid-message-renderer[show-only-header] #header {
  position: relative !important;
  overflow: visible !important;
}

yt-live-chat-paid-message-renderer #author-photo {
  margin-left: 10px !important;
  transform: scale(1.7) !important;
  bottom: 20px !important;
  left: 15px !important;
  position: absolute !important;
  display: none !important;
}

yt-live-chat-paid-message-renderer #header-content {
  overflow: visible !important;
  position: relative !important;
}

yt-live-chat-paid-message-renderer #header-content {
  text-align: center !important;
  align-items: center !important;
  align-content: center !important;
  position: relative !important;
  z-index: -1 !important;
}

/* new */
yt-live-chat-paid-message-renderer[is-v2-style] #single-line.yt-live-chat-paid-message-renderer {
  display: unset !important;
}

yt-live-chat-paid-message-renderer #author-name.yt-live-chat-author-chip {
  color: var(--sc-name-color) !important;
  font-family: 'Quicksand' !important;
  font-size: var(--sc-name-font-size) !important;
  text-align: center !important;
  letter-spacing: 0px !important;
  /* font-weight: 700 !important; */
  max-width: 40vw !important;
  text-transform: uppercase !important;
  position: relative !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  position: relative !important;
  z-index: 1 !important;
}


/* yt-live-chat-paid-message-renderer[show-only-header] yt-live-chat-author-chip {
  background: transparent !important;
} */

yt-live-chat-paid-message-renderer yt-live-chat-author-chip {
  /* padding-right: 60px !important; */
  /* width: 100% !important; */
  background: var(--background-name-sc) !important;
  padding: 5px 20px !important;
  margin-bottom: 10px !important;
  border-radius: 50px !important;
  position: relative !important;
  z-index: -1 !important;
}

yt-live-chat-paid-message-renderer yt-live-chat-author-badge-renderer[type='member'] * {
  padding: 0 !important;
  margin: 0 0 3px 0 !important;
}

yt-live-chat-paid-message-renderer #purchase-amount-column {
  text-align: center !important;
  align-items: center !important;
  align-content: center !important;
  display: block !important;
  padding: 0px !important;
}

yt-live-chat-paid-message-renderer #purchase-amount,
yt-live-chat-paid-message-renderer #purchase-amount * {
  color: var(--sc-amount-color) !important;
  font-family: 'Quicksand' !important;
  font-size: var(--sc-amount-font-size) !important;
  /* line-height: 1em !important; */
  font-weight: 400 !important;
  text-align: center !important;
  align-items: center !important;
  align-content: center !important;
}

yt-live-chat-paid-message-renderer #content {
  background-color: var(--yt-live-chat-paid-message-background-color) !important;
  color: white !important;
  font-family: 'Quicksand' !important;
  font-size: var(--sc-message-font-size)!important;
  position: relative !important;
  overflow: visible !important;
  width: fit-content !important;
  /* width: 100% !important; */
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 0px !important;
  border: 3px solid #ffffff !important;
  margin-top: 10px !important;
  animation: slide-scale-x 0.3s ease 0.2s both !important;
  z-index: -1 !important;
  /* new */
  border-radius: 10px !important;
}

@keyframes slide-scale-x {
  0% {
    opacity: 0;
    transform: translateY(-100px) scaleX(0);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scaleX(0.2);
  }
  100% {
    transform: translateY(0) scaleX(1);
  }
}

yt-live-chat-paid-message-renderer[show-only-header] #content {
  display: none !important;
  /* border-top: 1px solid #ffffff !important; */
}

yt-live-chat-paid-message-renderer #message,
yt-live-chat-paid-message-renderer #message * {
  text-align: center !important;
  font-family: 'Quicksand' !important;
  color: var(--sc-message-color) !important;
}

yt-live-chat-paid-message-renderer #message {
  padding: 10px 15px !important;
  width: fit-content !important;
  margin-left: 10px !important;
  margin-right: 10px !important;
  background: var(--background-message-sc) !important;
  border-radius: 8px !important;
}


/* sticker */
yt-live-chat-paid-sticker-renderer {
  text-align: center !important;
  margin-left: auto !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  margin-right: auto !important;
  padding: 0 !important;
  overflow: visible !important;
  position: relative !important;
}

yt-live-chat-paid-sticker-renderer:not([dashboard-money-feed]) #card.yt-live-chat-paid-sticker-renderer {
  display: block !important;
  /* background: var(--bg-sc), var(--yt-live-chat-paid-sticker-background-color) !important; */
  background: transparent !important;
  width: 70vw !important;
  margin: 0px auto 0px 30px !important;
  position: relative !important;
  padding: 0 !important;
  overflow: visible !important;
  box-shadow: none !important;
  transform-origin: bottom !important;
  z-index: 1 !important;
  animation: none !important;
}


yt-live-chat-paid-sticker-renderer #author-photo {
  margin-left: 10px !important;
  transform: scale(1.7) !important;
  bottom: 20px !important;
  left: 15px !important;
  position: absolute !important;
  display: none !important;
}

yt-live-chat-paid-sticker-renderer #author-info {
    display: block !important;
    background-color: var(--sc-bg-color) !important;
    position: relative !important;
    max-height: fit-content !important;
    width: 100% !important;
    border: 3px solid #ffffff !important;
    border-radius: 10px !important;
    overflow: visible !important;
    padding: 15px 0 !important;
    margin: 0 !important;
    animation: slide-in 0.3s ease both;
}

yt-live-chat-paid-sticker-renderer #content {
  position: relative !important;
  overflow: visible !important;
  -ms-align-self: end !important;
  align-self: end !important;
  z-index: 0;
  display: block !important;
  justify-items: end !important;
  justify-content: end !important;
  padding: 0 !important;
}

#content-primary-column.yt-live-chat-paid-sticker-renderer {
    display: inline-block !important;
}

yt-live-chat-paid-sticker-renderer #author-name-chip {
    /* padding-right: 8px; */
    display: block !important;
    text-align: center !important;
}

yt-live-chat-paid-sticker-renderer yt-live-chat-author-chip {
  background: var(--background-name-sc) !important;
  padding: 5px 20px !important;
  margin-bottom: 10px !important;
  border-radius: 50px !important;
  position: relative !important;
  z-index: -1 !important;
}

yt-live-chat-paid-sticker-renderer #author-name {
  display: block !important;
}

yt-live-chat-paid-sticker-renderer #author-name,
yt-live-chat-paid-sticker-renderer #author-name * {
  color: var(--sc-name-color) !important;
  font-family: 'Quicksand' !important;
  font-size: var(--sc-name-font-size, 20px) !important;
  text-align: center !important;
  line-height: normal !important;
  letter-spacing: 0px !important;
  font-weight: 400 !important;
  text-transform: uppercase !important;
  width: fit-content !important;
  max-width: 40vw !important;
  position: relative !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  z-index: 99 !important;
  position: relative !important;
}

yt-live-chat-paid-sticker-renderer:not([dashboard-money-feed]) #price-column.yt-live-chat-paid-sticker-renderer {
    /* display: flex !important; */
    justify-content: center !important;
    padding: 0 !important;
}

yt-live-chat-paid-sticker-renderer:not([dashboard-money-feed]) #purchase-amount-chip.yt-live-chat-paid-sticker-renderer {
  display: block !important;  
  font-size: 15px;
  /* padding-right: 8px; */
  /* width: 100% !important; */
  /* margin-left: auto !important; */
}

yt-live-chat-paid-sticker-renderer #purchase-amount-chip {
  color: var(--sc-amount-color) !important;
  background: transparent !important;
  font-family: 'Quicksand' !important;
  font-size: var(--sc-amount-font-size) !important;
  font-weight: 400 !important;
  text-align: center !important;
  display: block !important;
  padding: 10px 0px 10px 0px !important;
  z-index: 1 !important;
  position: relative !important;
  /* margin-top: -15px !important; */
  height: fit-content !important;
  /* width: 70vw !important; */
}

yt-live-chat-paid-sticker-renderer:not([dashboard-money-feed]) #sticker-container.yt-live-chat-paid-sticker-renderer {
    margin: 0;
    margin-left: auto;
}

yt-live-chat-paid-sticker-renderer #sticker-container {
  margin-top: 10px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 10px 15px 10px 15px !important;
  position: relative !important;
  width: fit-content !important;
  /* margin-top: 30px !important; */
  background: var(--background-message-sc) !important;
  border-radius: 10px !important;
  border-left: 10px solid var(--yt-live-chat-paid-sticker-background-color) !important;
  border-right: 10px solid var(--yt-live-chat-paid-sticker-background-color) !important;
  outline: 3px solid #ffffff !important;
  justify-content: center !important;
  /* display: flex; */
  z-index: 1 !important;
  animation: slide-scale-x 0.3s ease 0.2s both !important;
  
}




/* membership */
yt-live-chat-membership-item-renderer {
  text-align: center !important;
  margin-left: auto !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  margin-right: auto !important;
  padding: 0 !important;
  overflow: visible !important;
  position: relative !important;
}

yt-live-chat-membership-item-renderer #card {
  background: transparent !important;
  width: 70vw !important;
  margin: 0px auto 0px 30px !important;
  position: relative !important;
  overflow: visible !important;
  box-shadow: none !important;
  transform-origin: bottom !important;
  z-index: 1 !important;
  animation: slide-in-bottom 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275) both !important;
}

yt-live-chat-membership-item-renderer #header {
  background-color: var(--membership-bg-color) !important;
  color: transparent !important;
  width: 100% !important;
  border: 3px solid #ffffff !important;
  border-radius: 10px !important;
  overflow: visible !important;
  padding: 15px 0 !important;
  margin: 0 !important;
  /* padding: 10px 15px 15px 15px !important; */
  position: relative !important;
  animation: slide-in 0.3s ease both !important;
}

yt-live-chat-membership-item-renderer[show-only-header] #header.yt-live-chat-membership-item-renderer {
    position: relative !important;
    /* padding: 20px 20px 20px 40px !important; */
}

yt-live-chat-membership-item-renderer #header-content {
  display: block !important;
  overflow: visible !important;
  position: relative !important;
  text-align: center !important;
  align-items: center !important;
  align-content: center !important;
}

yt-live-chat-membership-item-renderer #author-photo {
  display: none !important;
  margin-left: 10px !important;
  transform: scale(1) !important;
  top: 20px !important;
  left: 15px !important;
  position: absolute !important;
}

yt-live-chat-membership-item-renderer[show-only-header] #author-photo {
  display: none !important;
  margin-left: 10px !important;
  transform: scale(1) !important;
  top: 20px !important;
  left: 15px !important;
  position: absolute !important;
}

yt-live-chat-membership-item-renderer[has-primary-header-text]:not( [dashboard-money-feed]) yt-live-chat-author-chip.yt-live-chat-membership-item-renderer, 
yt-live-chat-membership-item-renderer[has-primary-header-text]:not( [dashboard-money-feed]) #header-subtext.yt-live-chat-membership-item-renderer {
    font-size: 12px;
}

yt-live-chat-membership-item-renderer yt-live-chat-author-chip {
  background: var(--background-name-membership) !important;
  padding: 5px 20px !important;
  margin-bottom: 10px !important;
  border-radius: 50px !important;
  position: relative !important;
  z-index: 1 !important;
}

yt-live-chat-membership-item-renderer #author-name,
yt-live-chat-membership-item-renderer #author-name * {
  color: var(--membership-name-color) !important;
  font-family: 'Quicksand' !important;
  font-size: var(--membership-name-font-size, 20px) !important;
  text-align: start !important;
  letter-spacing: 0px !important;
  font-weight: 500 !important;
  width: fit-content !important;
  max-width: 40vw !important;
}

yt-live-chat-membership-item-renderer #header-primary-text {
  color: var(--membership-other-color) !important;
  font-size: var(--membership-other-font-size) !important;
  font-family: 'Quicksand' !important;
  font-weight: 500 !important;
  position: relative !important;
  /* padding-right: 60px !important; */
  /* padding: 5px 0 !important; */
}

yt-live-chat-membership-item-renderer #header-subtext {
  color: var(--membership-subtext-color) !important;
  font-size: var(--membership-subtext-font-size) !important;
  font-family: 'Quicksand' !important;
  letter-spacing: 1px !important;
  font-weight: 500 !important;
  position: relative !important;
  margin: 0 !important;
  /* padding-right: 60px !important; */
  /* padding: 5px 0 !important; */
}

yt-live-chat-membership-item-renderer[show-only-header] #content {
  display: none !important;
}

yt-live-chat-membership-item-renderer #content {
  background-color: var(--membership-bg-color) !important;
  color: white !important;
  font-family: 'Quicksand' !important;
  position: relative !important;
  overflow: visible !important;
  width: fit-content !important;
  /* width: 100% !important; */
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 0px !important;
  border: 3px solid #ffffff !important;
  margin-top: 10px !important;
  animation: slide-scale-x 0.3s ease 0.2s both !important;
  z-index: -1 !important;
  /* new */
  border-radius: 10px !important;
}

yt-live-chat-membership-item-renderer #message {
  padding: 10px 15px !important;
  width: fit-content !important;
  margin-left: 10px !important;
  margin-right: 10px !important;
  background: var(--background-message-membership) !important;
  border-radius: 8px !important;
}

yt-live-chat-membership-item-renderer #message,
yt-live-chat-membership-item-renderer #message * {
  color: var(--membership-message-color) !important;
  font-family: 'Quicksand' !important;
  font-size: var(--membership-message-font-size, 20px)!important;
  font-weight: 500 !important;
  line-height: normal !important;
  text-align: center !important;
}





/* gift */
/* ytd-sponsorships-live-chat-gift-purchase-announcement-renderer {
    display: block;
    padding: 4px 24px;
} */

ytd-sponsorships-live-chat-gift-purchase-announcement-renderer {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

ytd-sponsorships-live-chat-header-renderer {
  text-align: start !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 0 !important;
  overflow: visible !important;
  position: relative !important;
}

ytd-sponsorships-live-chat-header-renderer #header {
  display: block !important;
  background: transparent !important;
  margin: 0px auto 0px 5px !important;
  width: 70vw !important;
  position: relative !important;
  overflow: visible !important;
  box-shadow: none !important;
  transform-origin: bottom !important;
  z-index: 1 !important;
  animation: slide-in-bottom 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275) both !important;
}


ytd-sponsorships-live-chat-header-renderer yt-live-chat-author-chip {
  background: var(--background-name-membership) !important;
  line-height: normal !important;
  padding: 5px 20px !important;
  margin-bottom: 10px !important;
  border-radius: 50px !important;
  font-size: unset !important;
  position: relative !important;
}

ytd-sponsorships-live-chat-header-renderer #author-name,
ytd-sponsorships-live-chat-header-renderer #author-name * {
  color: var(--membership-name-color) !important;
  font-family: 'Quicksand' !important;
  font-size: var(--membership-name-font-size, 20px) !important;
  text-align: center !important;
  line-height: normal !important;
  letter-spacing: 0px !important;
  font-weight: 500 !important;
  width: fit-content !important;
  max-width: 30vw !important;
  position: relative !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  z-index: 99 !important;
}

#content.ytd-sponsorships-live-chat-header-renderer {
  display: flex;
  flex-direction: row;
  padding: 0 !important;
  /* width: 70vw !important; */
  padding: 10px 15px 15px 15px !important;
}

ytd-sponsorships-live-chat-header-renderer #content {
  background-color: var(--membership-bg-color) !important;
  color: transparent !important;
  border: 3px solid #ffffff !important;
  border-radius: 10px !important;
  overflow: visible !important;
  padding: 15px 0 !important;
  margin: 0 !important;
  /* padding: 10px 15px 15px 15px !important; */
  position: relative !important;
  animation: slide-in 0.3s ease both !important;
}

ytd-sponsorships-live-chat-header-renderer #header-content {
  flex-wrap: initial !important;
  text-align: center !important;
  align-items: start !important;
  align-content: start !important;
  overflow: visible !important;
  position: relative !important;
  margin-left: auto !important;
  margin-right: auto !important;
  justify-content: center !important;
  display: flex !important;
  /* width: 70vw !important; */
  align-self: center !important;
  /* padding: 0px 20px 0px 20px !important; */
}

ytd-sponsorships-live-chat-header-renderer #author-photo {
  display: none !important;
  margin-left: 10px !important;
  transform: scale(1.8) !important;
  bottom: 22px !important;
  left: 15px !important;
  position: absolute !important;
}

ytd-sponsorships-live-chat-header-renderer #header-content-primary-column {
  text-align: center !important;
  align-items: center !important;
  align-content: center !important;
  overflow: visible !important;
  position: relative !important;
  margin-left: auto !important;
  margin-right: auto !important;
  justify-content: center !important;
  /* width: 90vw !important; */
  align-self: center !important;
  margin: 0 !important;
}
ytd-sponsorships-live-chat-header-renderer #header-content-inner-column {
  text-align: center !important;
  align-items: center !important;
  align-content: start !important;
  overflow: visible !important;
  position: relative !important;
  margin-left: auto !important;
  margin-right: auto !important;
  justify-content: start !important;
  /* width: 100% !important; */
  align-self: center !important;
  margin: 0 !important;
  
}

ytd-sponsorships-live-chat-header-renderer #content {
  overflow: visible !important;
  position: relative !important;
  padding: 0 !important;
  margin: 0 !important;

}


ytd-sponsorships-live-chat-header-renderer #primary-text {
  /* display: flex !important; */
  position: relative !important;
  overflow: visible !important;
  color: var(--membership-other-color) !important;
  font-family: 'Quicksand' !important;
  font-weight: bold !important;
  font-size: var(--membership-other-font-size) !important;
  line-height: normal !important;
  background: transparent !important;
  white-space: unset !important;
  padding: 0 !important;
  margin: 0 !important;
  max-height: fit-content !important;
  /* padding-right: 60px !important; */
  z-index: -1;
}

.rhs-image.ytd-sponsorships-live-chat-header-renderer {
  display: none !important;
  /* display: block !important;
  position: absolute !important;
  bottom: -20px !important;
  right: -20px !important; */
  transform-origin: bottom left !important;
  animation: scale-in-bl-logo 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0.3s both;
}

.rhs-image.ytd-sponsorships-live-chat-header-renderer #img {
  transform: scale(0.7) !important;
  object-fit: cover !important;
}

ytd-sponsorships-live-chat-header-renderer #header #content #img {
  display: block !important;
}






[hidden] {
  display: none !important;
}

yt-live-chat-paid-sticker-renderer:not([modern]) #inline-action-button-container.yt-live-chat-paid-sticker-renderer {
  background-color: var(--yt-live-chat-moderation-mode-hover-background-color);
}

#inline-action-button-container.yt-live-chat-paid-sticker-renderer {
  position: absolute;
  top: -4px;
  right: 0;
  bottom: -4px;
  left: 0;
  display: none;
  align-items: center;
  justify-content: center;
}

yt-live-chat-paid-sticker-renderer:not([dashboard-money-feed]) #menu.yt-live-chat-paid-sticker-renderer {
  background: linear-gradient(to right, transparent, var(--yt-live-chat-paid-sticker-background-color) 100%);
  border-radius: 0 4px 4px 0;
  color: var(--yt-live-chat-paid-sticker-chip-text-color);
}

#menu.yt-live-chat-paid-sticker-renderer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  transform: translateX(100px);
  display: none !important;
}



ytd-sponsorships-live-chat-header-renderer #chat-badges {
  white-space: nowrap;
}

ytd-sponsorships-live-chat-header-renderer #chat-badges yt-live-chat-author-badge-renderer {
  margin: 0 0 0 2px;
  vertical-align: sub;
}

yt-live-chat-author-badge-renderer[type=member] {
  color: var(--yt-live-chat-sponsor-color, #107516);
}

yt-live-chat-author-badge-renderer {
  display: inline-block;
}

#menu {
  display: none !important;
}

yt-live-chat-membership-item-renderer #menu,
ytd-sponsorships-live-chat-gift-purchase-announcement-renderer #menu {
  display: none !important;
}

yt-live-chat-moderation-message-renderer {
  display: none !important;
}

/* yt-live-chat-paid-message-renderer {
  margin: 4px 0 !important;
  padding-left: 10px !important;
} */

yt-live-chat-legacy-paid-message-renderer {
  background-color: transparent !important;
  margin: 4px 0 !important;
}

yt-live-chat-legacy-paid-message-renderer {
  width: 60% !important;
}

/* 
yt-live-chat-text-message-renderer a,
yt-live-chat-legacy-paid-message-renderer a {
  text-decoration: none !important;
} */

yt-live-chat-text-message-renderer[is-deleted],
yt-live-chat-legacy-paid-message-renderer[is-deleted] {
  display: none !important;
}

yt-live-chat-ticker-renderer {
  background-color: transparent !important;
  box-shadow: none !important;
}

yt-live-chat-ticker-renderer {
  display: none !important;
}


yt-live-chat-ticker-paid-message-item-renderer,
yt-live-chat-ticker-paid-message-item-renderer *,
yt-live-chat-ticker-sponsor-item-renderer,
yt-live-chat-ticker-sponsor-item-renderer * {
  color: #ffffff !important;
  font-family: 'Quicksand';
}

yt-live-chat-mode-change-message-renderer,
yt-live-chat-viewer-engagement-message-renderer,
yt-live-chat-restricted-participation-renderer {
  display: none !important;
}

yt-live-chat-banner-manager {
  display: none !important;
}

yt-live-chat-action-panel-renderer,
yt-live-chat-renderer #action-panel {
  display: none !important;
}

#reaction-control-panel-overlay {
  display: none !important;
}

/* new */
yt-live-chat-item-bumper-view-model,
#lower-bumper,
#input-container,
#footer,
#buy-flow-button,
#inline-action-button-container,
#creator-heart-button {
  display: none !important;
}
/* ----- */

#panel-pages {
  border: none !important;
}

#separator {
  display: none !important;
}

#menu {
  display: none !important;
}
`