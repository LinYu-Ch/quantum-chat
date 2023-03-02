//Authors: @Chrysalia_Vt, @EcXcariot
//Last Updated: 2/2023
//Not authorized for editing or redistribution CC BY-ND
let totalMessages = 0, messagesLimit = 0, removeSelector, addition, customNickColor, channelName,
    provider;
let animationIn = 'bounceIn';
let animationOut = 'bounceOut';
let hideAfter = 60;
let hideCommands = "no";
let ignoredUsers = [];

let userLocale = "en-US",
    includeFollowers = true,
    includeRaids = true,
    minRaid = 0,
    includeSubs = true,
    includeTips = true,
    minTip = 0,
    includeCheers = true,
    minCheer = 0;

let userCurrency;

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.event.listener === 'widget-button') {

      
//test messeges, dev only 
        if (obj.detail.event.field === 'testMessage-b') {
            broadcaster = new CustomEvent("onEventReceived", {
                detail: {
                    listener: "message", event: {
                        service: "twitch",
                        data: {
                            time: Date.now(),
                            tags: {
                                "badge-info": "",
                                badges: "broadcaster/1",
                                color: "#5B99FF",
                                "display-name": "StreamElements",
                                emotes: "25:46-50",
                                flags: "",
                                id: "43285909-412c-4eee-b80d-89f72ba53142",
                                mod: "1",
                                "room-id": "85827806",
                                subscriber: "1",
                                "tmi-sent-ts": "1579444549265",
                                turbo: "0",
                                "user-id": "100135110",
                                "user-type": "broadcaster"
                            },
                            nick: "broadcaster",
                            userId: "100135110",
                            displayName: "Broadcaster",
                            displayColor: "#5B99FF",
                            channel: "",
                            text: msgBroadcaster,
                            isAction: !1,
                            emotes: [{
                                type: "Kappa",
                                name: "Kappa",
                                id: "25",
                                gif: !1,
                                urls: {
                                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
                                },
                                start: 46,
                                end: 50
                            }],
                            msgId: "43285909-412c-4eee-b80d-89f72ba53142"
                        },
                    }
                }
            });
            window.dispatchEvent(broadcaster);
       }

  if (obj.detail.event.field === 'testMessage-m') {
            let moderator = new CustomEvent("onEventReceived", {
                detail: {
                    listener: "message", event: {
                        service: "twitch",
                        data: {
                            time: Date.now(),
                            tags: {
                                "badge-info": "",
                                badges: "moderator/1",
                                color: "#5B99FF",
                                "display-name": "StreamElements",
                                emotes: "25:46-50",
                                flags: "",
                                id: "43285909-412c-4eee-b80d-89f72ba53142",
                                mod: "1",
                                "room-id": "85827806",
                                subscriber: "1",
                                "tmi-sent-ts": "1579444549265",
                                turbo: "0",
                                "user-id": "100135110",
                                "user-type": "mod"
                            },
                             nick: "moderator",
                            userId: "100135110",
                            displayName: "Moderator",
                            displayColor: "#5B99FF",
                            channel: "",
                            text: msgModerator,
                            isAction: !1,
                            emotes: [{
                                type: "twitch",
                                name: "Kappa",
                                id: "25",
                                gif: !1,
                                urls: {
                                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
                                },
                                start: 46,
                                end: 50
                            }],
                            msgId: "43285909-412c-4eee-b80d-89f72ba53142"
                        },
                    }
                }
            });
           
            window.dispatchEvent(moderator);
        }
       if (obj.detail.event.field === 'testMessage-s') {
            let subscriber = new CustomEvent("onEventReceived", {
                detail: {
                    listener: "message", event: {
                        service: "twitch",
                        data: {
                            time: Date.now(),
                            tags: {
                                "badge-info": "",
                                badges: "subscriber/1",
                                color: "#5B99FF",
                                "display-name": "StreamElements",
                                emotes: "25:46-50",
                                flags: "",
                                id: "43285909-412c-4eee-b80d-89f72ba53142",
                                mod: "0",
                                "room-id": "85827806",
                                subscriber: "1",
                                "tmi-sent-ts": "1579444549265",
                                turbo: "0",
                                "user-id": "100135110",
                                "user-type": "subscriber"
                            },
                             nick: "subscriber",
                            userId: "100135110",
                            displayName: "Subscriber",
                            displayColor: "#5B99FF",
                            channel: "",
                            text: msgSubscriber,
                            isAction: !1,
                            emotes: [{
                                type: "twitch",
                                name: "Kappa",
                                id: "25",
                                gif: !1,
                                urls: {
                                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
                                },
                                start: 46,
                                end: 50
                            }],
                            msgId: "43285909-412c-4eee-b80d-89f72ba53142"
                        },
                    }
                }
            });
           
            window.dispatchEvent(subscriber);
        }
        return;
    }
   //end of the test messages ^^^^^

    
  //calls the addmessage function which appends new chat instances to the container
  if (obj.detail.listener === "delete-message") {
        const msgId = obj.detail.event.msgId;
        $(`.message-row[data-msgid=${msgId}]`).remove();
        return;
    } else if (obj.detail.listener === "delete-messages") {
        const sender = obj.detail.event.userId;
        $(`.message-row[data-sender=${sender}]`).remove();
        return;
    }
  
    const listener = obj.detail.listener.split("-")[0];
	const event = obj.detail.event;
//I changed the params addEvent() takes in so it takes in (initial message, name of sender, thank you message)
    if (listener === 'follower') {
        if (includeFollowers) {
            addEvent('followed', event.name, "welcome!");
        }
      return;
    } 
 //there are multiple subscriber events so you have to sort through each one of them from most
 //easily identifiable to least easily identifiable 
  	if (listener === 'subscriber') {
        if (includeSubs) {
          
          	if (event.isCommunityGift) return;
          
             if (event.bulkGifted) {
                addEvent(`gifted`, event.name, `${event.amount} Subs`);
            } else if (event.gifted) {
                addEvent(`gifted`, event.name, `${event.amount} Sub`);
            } else if (event.amount > 1) {
            	addEvent(`resubscribed`, event.name, `${event.amount} months`);
            } else {
            	addEvent(`subscribed`, event.name, "welcome!");
            }
        }
      return;
    } 
  
  	if (listener === 'cheer') {
        if (includeCheers && minCheer <= event.amount) {
            addEvent(`has cheer'd`, event.name, `${event.amount.toLocaleString()} bits`);
        }
      return;
    } 
  //dono block
  	if (listener === 'tip') {
        if (includeTips && minTip <= event.amount) {
            if (event.amount === parseInt(event.amount)) {
                addEvent(`has donated`, event.name, `${event.amount.toLocaleString(userLocale, {
                    style: 'currency',
                    minimumFractionDigits: 0,
                    currency: userCurrency.code
                })}`);
            } else {
                addEvent(`has donated`, event.name, `${event.amount.toLocaleString(userLocale, {
                    style: 'currency',
                    currency: userCurrency.code
                })}`);
            }
        }
      return;
    } 
  //raid block
  	if (listener === 'raid') {
        if (includeRaids && minRaid <= event.amount) {
            addEvent(`raided`, event.name, `${event.amount} raiders`);
        }
      return;
    }
  
  // message block
  	if (obj.detail.listener === "message") { 
    let data = obj.detail.event.data;
    if (data.text.startsWith("!") && hideCommands === "yes") return;
    if (ignoredUsers.indexOf(data.nick) !== -1) return;
    let message = attachEmotes(data);
  	    
  
  // sets each user's chatbox identity based on their roles, not my best work I will admit but it works
  	let role;
  	let badges = data.tags.badges;	
  
  	if (badges.includes("broadcaster")){
	role = clrBroadcaster;
    } else if (badges.includes("moderator")){
	role = clrModerator;
    } else if (badges.includes("vip")){
	role = clrVip;
    } else if (badges.includes("artist-badge")){
	role = clrArtist;
    } else if (badges.includes("subscriber")){
    role = clrSubscriber;
    } else {
    role = clrDefault;
    }

  
  
    let username = data.displayName;
	const color = customNickColor;
    username = `<span style="color:${color}">${username}</span>`;
    
  
  addMessage(username, role, message, data.isAction, data.userId, data.msgId);
}
  
  
  
  
});
window.addEventListener('onWidgetLoad', function (obj) {
    const fieldData = obj.detail.fieldData;
    userCurrency = obj.detail.currency;

  // takes in the test message samples
  	msgBroadcaster = fieldData.broadcasterMsg;
  	msgModerator = fieldData.moderatorMsg;
  	msgSubscriber = fieldData.subscriberMsg;
  
  // role colors 
  	clrBroadcaster = fieldData.clrBroadcaster;
  	clrModerator = fieldData.clrModerator;
  	clrVip = fieldData.clrVip;
  	clrArtist = fieldData.clrArtist;
  	clrSubscriber = fieldData.clrSubscriber;
  	clrDefualt = fieldData.clrDefault;
  
  //event options
  	includeFollowers = (fieldData.includeFollowers === "yes");
    includeRaids = (fieldData.includeRaids === "yes");
    minRaid = fieldData.minRaid;
    includeSubs = (fieldData.includeSubs === "yes");
    includeTips = (fieldData.includeTips === "yes");
    minTip = fieldData.minTip;
    includeCheers = (fieldData.includeCheers === "yes");
    minCheer = fieldData.minCheer;
 
  //general user modifications
  	eventsLimit = fieldData.eventsLimit;
    direction = fieldData.direction;
    userLocale = fieldData.locale;
    textOrder = fieldData.textOrder;
    fadeoutTime = fieldData.fadeoutTime;
    animationIn = fieldData.animationIn;
    animationOut = fieldData.animationOut;
    hideAfter = fieldData.hideAfter;
    messagesLimit = fieldData.messagesLimit;
    customNickColor = fieldData.customNickColor;
    hideCommands = fieldData.hideCommands;
    channelName = obj.detail.channel.username;
  
    fetch('https://api.streamelements.com/kappa/v2/channels/' + obj.detail.channel.id + '/').then(response => response.json()).then((profile) => {
        provider = profile.provider;
    });
    if (fieldData.alignMessages === "block") {
        addition = "prepend";
        removeSelector = ".message-row:nth-child(n+" + (messagesLimit + 1) + ")"
    } else {
        addition = "append";
        removeSelector = ".message-row:nth-last-child(n+" + (messagesLimit + 1) + ")"
    }

    ignoredUsers = fieldData.ignoredUsers.toLowerCase().replace(" ", "").split(",");
});

//this makes the emotes actually work as intended. something something regex works 
function attachEmotes(message) {
    let text = html_encode(message.text);
    let data = message.emotes;
    if (typeof message.attachment !== "undefined") {
        if (typeof message.attachment.media !== "undefined") {
            if (typeof message.attachment.media.image !== "undefined") {
                text = `${message.text}<img src="${message.attachment.media.image.src}">`;
            }
        }
    }
    return text
        .replace(
            /([^\s]*)/gi,
            function (m, key) {
                let result = data.filter(emote => {
                    return html_encode(emote.name) === key
                });
                if (typeof result[0] !== "undefined") {
                    let url = result[0]['urls'][1];
                    if (provider === "twitch") {
                        return `<img class="emote" " src="${url}"/>`;
                    } else {
                        if (typeof result[0].coords === "undefined") {
                            result[0].coords = {x: 0, y: 0};
                        }
                        let x = parseInt(result[0].coords.x);
                        let y = parseInt(result[0].coords.y);

                        let width = "{emoteSize}vw";
                        let height = "auto";

                        return `<div class="emote" style="width: ${width}; height:${height}; display: inline-block; background-image: url(${url}); background-position: -${x}px -${y}px;"></div>`;
                    }
                } else return key;

            }
        );
}

//encodes the emote ids into a format html is capable of transforming into emotes
function html_encode(e) {
    return e.replace(/[<>"^]/g, function (e) {
        return "&#" + e.charCodeAt(0) + ";";
    });
}

// appends the following html block into the main container 
function addMessage(username, role, message, isAction, uid, msgId) {
    totalMessages += 1;
    let actionClass = "";
    if (isAction) {
        actionClass = "action";
    }
    const element = $.parseHTML(`<div class="chat-wrapper message-row {animationIn} animated" data-sender="${uid}" data-msgid="${msgId}" id="msg-${totalMessages}">
      <div class="username-wrapper">
        <div class="user-class"><svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="userClass">
          <path id="Vector" d="M45.19 12.64H12.77V45.06H45.19V12.64Z" stroke="${role}" stroke-width="3" stroke-miterlimit="10"/>
          <path id="Vector_2" d="M42.69 15.01H1V56.7H42.69V15.01Z" stroke="white" stroke-width="0.8" stroke-miterlimit="10"/>
          <path id="Vector_3" d="M56.97 1.27002H15.28V42.96H56.97V1.27002Z" stroke="white" stroke-width="0.8" stroke-miterlimit="10"/>
          <path id="Vector_4" d="M1 15.01L15.01 1" stroke="white" stroke-width="0.8" stroke-miterlimit="10"/>
          <path id="Vector_5" d="M42.69 15.01L56.7 1" stroke="white" stroke-width="0.8" stroke-miterlimit="10"/>
          <path id="Vector_6" d="M1 56.69L15.01 42.69" stroke="white" stroke-width="0.8" stroke-miterlimit="10"/>
          <path id="Vector_7" d="M42.69 56.69L56.97 42.96" stroke="white" stroke-width="0.8" stroke-miterlimit="10"/>
          </g>
          </svg>
          </div>
        <div class="username-box">${username}</div>
        <div class="chat-decoration"><svg viewBox="0 0 332 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="chatDecoration" d="M1 32.8349C55.3399 42.7744 100.862 33.8561 150.24 17.3746C171.859 10.1551 193.98 2.47043 218.057 1.1964C260.073 -1.02811 299.491 16.0298 331 32.8349" stroke="#FFFFFA" stroke-width="2" stroke-miterlimit="10"/>
          </svg>
          <div class="chat-decoration-accent"><svg viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="chatDecorationAccent">
            <path d="M29.73 7.45999L25.85 4L16.86 14.06L7.88 4L4 7.45999L13.38 17.96L4 28.45L7.88 31.92L16.86 21.86L25.85 31.92L29.73 28.45L20.35 17.96L29.73 7.45999Z" fill="white"/>
            </g>
            </svg>
            </div>
        </div>
      </div>
      <div class="chat-box ${actionClass}"> ${message}
        
      </div>
    </div>`);
    if (addition === "append") {
        if (hideAfter !== 999) {
            $(element).appendTo('.main-container').delay(hideAfter * 1000).queue(function () {
                $(this).removeClass(animationIn).addClass(animationOut).delay(1000).queue(function () {
                    $(this).remove()
                }).dequeue();
            });
        } else {
            $(element).appendTo('.main-container');
        }
    } else {
        if (hideAfter !== 999) {
            $(element).prependTo('.main-container').delay(hideAfter * 1000).queue(function () {
                $(this).removeClass(animationIn).addClass(animationOut).delay(1000).queue(function () {
                    $(this).remove()
                }).dequeue();
            });
        } else {
            $(element).prependTo('.main-container');
        }
    }

    if (totalMessages > messagesLimit) {
        removeRow();
    }
}

//removes the block of chat after a specific time has passed or if the limit is reached 
function removeRow() {
    $(removeSelector).animate({
        height: 0,
        opacity: 0
    }, 'slow', function () {
        $(removeSelector).remove();
    });
}

//function to add subscriber events to the textbox
function addEvent(text, username, remarks) {
    totalMessages += 1;
    let element;
  
        element = `
        <div class="event-chat-wrapper {animationIn} animated message-row" id="msg-${totalMessages}">
      <div class="accent-wrapper">
        <div class="event-chat-decoration-accent floating" id="accent-1"><svg viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
          <path d="M29.73 7.45999L25.85 4L16.86 14.06L7.88 4L4 7.45999L13.38 17.96L4 28.45L7.88 31.92L16.86 21.86L25.85 31.92L29.73 28.45L20.35 17.96L29.73 7.45999Z" fill="white"/>
          </g>
          </svg></div>
          <div class="event-chat-decoration-accent floating" id="accent-2"><svg viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
            <path d="M29.73 7.45999L25.85 4L16.86 14.06L7.88 4L4 7.45999L13.38 17.96L4 28.45L7.88 31.92L16.86 21.86L25.85 31.92L29.73 28.45L20.35 17.96L29.73 7.45999Z" fill="white"/>
            </g>
            </svg></div>
      </div>
      
      <div class="event-chat"><b style="font-weight: 900;">${username}&nbsp;</b> ${text} <b>!</b></div>
      <div class="event-period-container">${remarks}</div>
    </div>`;
    if (addition === "append") {
        if (hideAfter !== 999) {
            $(element).appendTo('.main-container').delay(hideAfter * 1000).queue(function () {
                $(this).removeClass(animationIn).addClass(animationOut).delay(1000).queue(function () {
                    $(this).remove()
                }).dequeue();
            });
        } else {
            $(element).appendTo('.main-container');
        }
    } else {
        if (hideAfter !== 999) {
            $(element).prependTo('.main-container').delay(hideAfter * 1000).queue(function () {
                $(this).removeClass(animationIn).addClass(animationOut).delay(1000).queue(function () {
                    $(this).remove()
                }).dequeue();
            });
        } else {
            $(element).prependTo('.main-container');
        }
    }

    if (totalMessages > messagesLimit) {
        removeRow();
    }
}

