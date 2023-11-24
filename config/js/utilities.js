function loadWidgetStyle(){
    let ownerStyle = getStyle(styleChat, "/* owner */","/* end-owner */");
    let moderatorStyle = getStyle(styleChat, "/* moderator */","/* end-moderator */");
    let memberStyle = getStyle(styleChat, "/* member */","/* end-member */");
    let generalStyle = getStyle(styleChat, "/* general */","/* end-general */");
    let membershipStyle = getStyle(styleChat, "/* membership */","/* end-membership */");
    let scStyle = getStyle(styleChat, "/* sc */","/* end-sc */");
    let chatFontSizeStyle = getStyle(styleChat, "/* chat-font-size */","/* end-chat-font-size */");
    let scFontSizeStyle = getStyle(styleChat, "/* sc-font-size */","/* end-sc-font-size */");
    let membershipFontSizeStyle = getStyle(styleChat, "/* membership-font-size */","/* end-membership-font-size */");

    generateStyleData(chatFontSizeStyle, "Chat Settings", "none", "number")
    generateStyleData(ownerStyle, "Chat Settings", "Streamer", "colorPicker")
    generateStyleData(moderatorStyle, "Chat Settings", "Moderator", "colorPicker")
    generateStyleData(memberStyle, "Chat Settings", "Member", "colorPicker")
    generateStyleData(generalStyle, "Chat Settings", "General", "colorPicker")

    generateStyleData(membershipFontSizeStyle, "Membership Settings", "none", "number")
    generateStyleData(membershipStyle, "Membership Settings", "none", "colorPicker")
    
    generateStyleData(scFontSizeStyle, "Superchat Settings", "none", "number")
    generateStyleData(scStyle, "Superchat Settings", "none", "colorPicker")
}

function getStyle(styleChat, start, end) {
    // Mencari awal dan akhir komentar /* @start */ dan /* @end*/
    let startIndex = styleChat.indexOf(start);
    let endIndex = styleChat.indexOf(end);
    let cssVariables = [];

    if (startIndex !== -1 && endIndex !== -1) {
        // Mengambil teks CSS antara komentar /* @change */ dan /* @end-change */
        var cssBetweenComments = styleChat.substring(startIndex, endIndex + end.length);

        // Memecah teks CSS menjadi baris-baris
        var cssLines = cssBetweenComments.split('\n');

        // Iterasi melalui setiap baris CSS
        for (var i = 0; i < cssLines.length; i++) {
            var line = cssLines[i].trim();

            // Memeriksa apakah baris CSS adalah definisi variabel
            if (line.startsWith("--")) {
            // Memecah baris CSS menjadi nama variabel dan nilainya
            var parts = line.split(":");
            if (parts.length === 2) {
                var variableName = parts[0].trim();
                var variableValue = parts[1].trim();

                // Menambahkan variabel ke objek cssVariables
                cssVariables.push(variableName);
            }
            }
        }
    }
    return cssVariables;
}

function generateStyleData(styles, group, subgroup, type) {
    $.each(styles, function(i, style){
        let key = style.replace('--','')
        key = key.replaceAll('-',' ')
        key = toCamelCase(key)

        fields[key] = {}

        fields[key]["id"] = style.replace('--','')
        fields[key]["css"] = style
        fields[key]["type"] = type
        fields[key]["label"] = capitalizeEachWord(style.replace('--','').replace('owner','').replace('moderator','').replace('membership','').replace('member','').replace('sc','').replace('general','').replaceAll('-',' ')).replace('Bg','Background')
        fields[key]["group"] = group
        fields[key]["sub-group"] = subgroup
    })
}


function toCamelCase(inputText) {
    var modifiedText = inputText.replace(/\s(.)/g, function(match, group1) {
        return group1.toUpperCase();
    }).replace(/\s/g, '');
    
    return modifiedText;
}

function capitalizeEachWord(inputText) {
    return inputText
        .split(' ')
        .map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

async function getJsonData(path) {
    try {
        var response = await $.getJSON(path); // Menunggu hingga data JSON dimuat
        return response;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data JSON: " + error);
        return null;
    }
}

function loadData(selector, key, identifier) {
    $(selector).val( localStorage.getItem(identifier+key) ?? docStyleGetter.getPropertyValue(key).trim());
    docStyle.setProperty(key, localStorage.getItem(identifier+key) ?? docStyleGetter.getPropertyValue(key).trim());
    styleChat = replaceValue(styleChat, key, localStorage.getItem(identifier+key) ?? docStyleGetter.getPropertyValue(key).trim())

}

function loadDataNumber(selector, key, identifier) {
    $(selector).val( localStorage.getItem(identifier+key) ?? (docStyleGetter.getPropertyValue(key).trim().replace("px","")));
    docStyle.setProperty(key, localStorage.getItem(identifier+key) != null ? localStorage.getItem(identifier+key) + 'px' : docStyleGetter.getPropertyValue(key).trim());
    styleChat = replaceValue(styleChat, key, localStorage.getItem(identifier+key) != null ? localStorage.getItem(identifier+key) + 'px' : docStyleGetter.getPropertyValue(key).trim())
}

function loadWidgetData(fields, identifier) {
    $.each(fields, function(key, field){
        if (field.type === 'colorPicker') {
            loadData("."+field.id, field.css, identifier)
        } else if (field.type === 'number') {
            loadDataNumber("."+field.id, field.css, identifier)
        }
    })

    // jika mengubah warna svg, panggil fungsi loadSVGData dibaris dibawah ini
    // loadSVGData("--nama-variabel-svg","nama-variabel-warna","FFCD40");
}


// mengambil data svg dari local storage
// key = nama variabel css/svg
// identifier = nama variabel yang akan memicu trigger perubahan warna (tanpa --)
// initialValue = nilai awal dari warna svg
function loadSVGData(key, identifier, initialValue) {
    savedVal = localStorage.getItem(key+identifier);
    originalColor = initialValue;
    var decoration = docStyleGetter.getPropertyValue(key).trim();
    decoration = decoration.replaceAll(new RegExp(originalColor, 'g'), savedVal ?? initialValue);
    styleChat = replaceValue(styleChat, key, decoration);

    docStyle.setProperty(key, decoration);
}


// mengubah data svg
// key = nama variabel css/svg
// identifier = nama variabel yang akan memicu trigger perubahan warna (tanpa --)
// initialValue = nilai awal dari warna svg
// newValue = warna baru
function replaceSVGValue(key, identifier, initialValue, newValue) {
    var savedVal = localStorage.getItem(key+identifier);
    var originalColor = savedVal ?? initialValue;
    var decoration = docStyleGetter.getPropertyValue(key).trim();
    decoration = decoration.replaceAll(new RegExp(originalColor, 'g'), newValue);
    localStorage.setItem(key+identifier, newValue);

    styleChat = replaceValue(styleChat, key, decoration);
    docStyle.setProperty(key, decoration);
}


// setup untuk melakukan perubahan pada svg pada saat dilakukan input
// field = inputan ketika terjadi perubahan
function onSVGChange(field) {

    // mengubah svg pada chat
    if(field['group'] === 'Chat Settings') {

        // check role
        if(field['sub-group'] === 'Streamer') {

            // contoh jika ingin mengubah warna svg tertentu ketika background-name diubah
            // 'background-name' dapat disesuaikan dengan nama variabel pada css
            // '--owner-name-left' = nama variabel svg pada css
            if(field.id.includes("background-name")) {
                // parameter key, identifier, initialValue, dan newValue
                replaceSVGValue("--owner-name-left","background-name","FFCD40",capitalizeEachWord($(this).val().substring(1)))
            }
        }

        if(field['sub-group'] === 'Moderator') {
            if(field.id.includes("background-name")) {
                replaceSVGValue("--moderator-name-left","background-name","C174DE",capitalizeEachWord($(this).val().substring(1)))
            }
        }
        if(field['sub-group'] === 'Member') {
            if(field.id.includes("background-name")) {
                replaceSVGValue("--member-name-left","background-name","75C9B6",capitalizeEachWord($(this).val().substring(1)))
            }
        }
        if(field['sub-group'] === 'General') {
            if(field.id.includes("background-name")) {
                replaceSVGValue("--general-name-left","background-name","5654DB",capitalizeEachWord($(this).val().substring(1)))
            }
        }
    }

    // ini untuk svg pada membership alert
    if(field['group'] === 'Membership Settings') {
        if(field.id.includes("background-name")) {
            replaceSVGValue("--membership-name-decoration","background-name","383695",capitalizeEachWord($(this).val().substring(1)))
        }
    }

    // ini untuk svg pada superchat alert
    if(field['group'] === 'Superchat Settings') {
        if(field.id.includes("background-name")) {
            replaceSVGValue("--sc-name-decoration","background-name","383695",capitalizeEachWord($(this).val().substring(1)))
        }
    }
}

function replaceValue(data, variableName, newValue) {
    var regex = new RegExp(variableName + ':\\s*(.*?);', 'g');
    return data.replace(regex, variableName + ': ' + newValue + ';');
}

function addEventTrigger(fields, identifier){
    $.each(fields, function(key, field) {
        if (field.type === 'colorPicker') {
            // update: mengubah 'input' ke 'change' untuk menghindari lagging saat merubah warna svg
            $("."+field.id).on('change', function(){
                docStyle.setProperty(field.css, $(this).val());
                localStorage.setItem(identifier+field.css, $(this).val());
                $("."+field.id).val($(this).val())
                styleChat = replaceValue(styleChat, field.css, $(this).val())

                // jika ingin merubah svg, panggil fungsi onSVGChange() pada baris dibawah
                // onSVGChange(field)

            })
        } else if (field.type === 'number') {
            $("#"+field.id).on('change', function(){
                docStyle.setProperty(field.css, $(this).val() + "px");
                localStorage.setItem(identifier+field.css, $(this).val());
                styleChat = replaceValue(styleChat, field.css, $(this).val() + "px");
            })
        }
    })
}

function onEventShow(fields) {
    var groupLists = {};

    $.each(fields, function(key, value) {
        var group = value.group;
        if (group) {
            if (!groupLists[group]) {
                groupLists[group] = [];
            }
            groupLists[group].push(value);
        }
    });

    $.each(groupLists, function(key, value){
        $("#flush-heading"+key.split(' ').join('')).click(function(){
            if(key.split(' ').join('') === 'ChatSettings') {
                $(".widget-wrapper").empty()
                showChat(".widget-wrapper");
            } else if (key.split(' ').join('') === 'MembershipSettings') {
                $(".widget-wrapper").empty()
                showMembership(".widget-wrapper");
            } else if (key.split(' ').join('') === 'SuperchatSettings') {
                $(".widget-wrapper").empty()
                showSuperchat(".widget-wrapper");
            }
        })
    })
}

function showChat(selector){
    $(selector).append(`
    <!-- message 1 -->
    <yt-live-chat-text-message-renderer class="style-scope yt-live-chat-item-list-renderer" author-type="owner">
        <yt-img-shadow id="author-photo" class="no-transition style-scope yt-live-chat-text-message-renderer" height="24" width="24" style="background-color: transparent;" loaded="">
            <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png" width="24" height="24">
        </yt-img-shadow>
        <div id="content" class="style-scope yt-live-chat-text-message-renderer">
            <span id="timestamp" class="style-scope yt-live-chat-text-message-renderer">11:32 AM</span>
            <yt-live-chat-author-chip class="style-scope yt-live-chat-text-message-renderer" is-highlighted="">
                <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                <span id="author-name" dir="auto" class="owner style-scope yt-live-chat-author-chip">Streamer name<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                <span id="chat-badges" class="style-scope yt-live-chat-author-chip"></span>
            </yt-live-chat-author-chip>
            ​<span id="message" dir="auto" class="style-scope yt-live-chat-text-message-renderer">Hello everyone!</span>
            <span id="deleted-state" class="style-scope yt-live-chat-text-message-renderer"></span>
            <a id="show-original" href="#" class="style-scope yt-live-chat-text-message-renderer"></a>
        </div>
        <div id="menu" class="style-scope yt-live-chat-text-message-renderer">
            <yt-icon-button id="menu-button" class="style-scope yt-live-chat-text-message-renderer">
                <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                    <yt-icon icon="more_vert" class="style-scope yt-live-chat-text-message-renderer">
                        <yt-icon-shape class="style-scope yt-icon">
                            <icon-shape class="yt-spec-icon-shape">
                                <div style="width: 100%; height: 100%; fill: currentcolor;">
                                    <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                </div>
                            </icon-shape>
                        </yt-icon-shape>
                    </yt-icon>
                </button>
                <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                    <div class="stroke style-scope yt-interaction"></div>
                    <div class="fill style-scope yt-interaction"></div>
                </yt-interaction>
            </yt-icon-button>
        </div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-text-message-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-text-message-renderer">
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Hapus">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Masukkan pengguna dalam waktu tunggu">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M18 3h1V2H5v1h1v5.21L9.79 12 6 15.79V21H5v1h14v-1h-1v-5.21L14.21 12 18 8.21Zm-5.21 9L17 16.21V21H7v-4.79L11.21 12 7 7.79V3h10v4.79ZM12 16l4 4H8ZM9 7h6l-3 3Z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Sembunyikan pengguna di channel ini">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path></g></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
            </div>
        </div>
    </yt-live-chat-text-message-renderer>
    <!-- end message 1 -->
    <!-- message 2 -->
    <yt-live-chat-text-message-renderer class="style-scope yt-live-chat-item-list-renderer" author-type="moderator">
        <yt-img-shadow id="author-photo" class="no-transition style-scope yt-live-chat-text-message-renderer" height="24" width="24" style="background-color: transparent;" loaded="">
            <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png" width="24" height="24">
        </yt-img-shadow>
        <div id="content" class="style-scope yt-live-chat-text-message-renderer">
            <span id="timestamp" class="style-scope yt-live-chat-text-message-renderer">11:32 AM</span>
            <yt-live-chat-author-chip class="style-scope yt-live-chat-text-message-renderer" is-highlighted="">
                <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                <span id="author-name" dir="auto" class="owner style-scope yt-live-chat-author-chip">Moderator name<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                    <yt-live-chat-author-badge-renderer class="style-scope yt-live-chat-author-chip" aria-label="Moderator" type="moderator" shared-tooltip-text="Moderator">
                        <div id="image" class="style-scope yt-live-chat-author-badge-renderer">
                            <yt-icon class="style-scope yt-live-chat-author-badge-renderer">
                                <yt-icon-shape class="style-scope yt-icon">
                                    <icon-shape class="yt-spec-icon-shape">
                                        <div style="width: 100%;height: 100%;/* fill: currentcolor; */">
                                            <svg viewBox="0 0 16 16" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z"></path></svg>
                                        </div>
                                    </icon-shape>
                                </yt-icon-shape>
                            </yt-icon>
                        </div>
                        <tp-yt-paper-tooltip class="style-scope yt-live-chat-author-badge-renderer" role="tooltip" tabindex="-1" style="--paper-tooltip-delay-in: 0ms; inset: -51.4px auto auto 184.133px;">
                            <div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip"> Moderator </div>
                        </tp-yt-paper-tooltip>
                    </yt-live-chat-author-badge-renderer>
                    <yt-live-chat-author-badge-renderer class="style-scope yt-live-chat-author-chip" aria-label="Pelanggan (6 bulan)" type="member" shared-tooltip-text="Pelanggan (6 bulan)">
                        <div id="image" class="style-scope yt-live-chat-author-badge-renderer">
                            <img src="https://i.ibb.co/yWxg4J1/image-6.png" class="style-scope yt-live-chat-author-badge-renderer" alt="Pelanggan (6 bulan)">
                        </div>
                    </yt-live-chat-author-badge-renderer>
                </span>
            </yt-live-chat-author-chip>
            ​<span id="message" dir="auto" class="style-scope yt-live-chat-text-message-renderer">Hi, how's your day?</span>
            <span id="deleted-state" class="style-scope yt-live-chat-text-message-renderer"></span>
            <a id="show-original" href="#" class="style-scope yt-live-chat-text-message-renderer"></a>
        </div>
        <div id="menu" class="style-scope yt-live-chat-text-message-renderer">
            <yt-icon-button id="menu-button" class="style-scope yt-live-chat-text-message-renderer">
                <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                    <yt-icon icon="more_vert" class="style-scope yt-live-chat-text-message-renderer">
                        <yt-icon-shape class="style-scope yt-icon">
                            <icon-shape class="yt-spec-icon-shape">
                                <div style="width: 100%; height: 100%;">
                                    <svg viewBox="0 0 16 16" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z"></path></svg>
                                </div>
                            </icon-shape>
                        </yt-icon-shape>
                    </yt-icon>
                </button>
                <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                    <div class="stroke style-scope yt-interaction"></div>
                    <div class="fill style-scope yt-interaction"></div>
                </yt-interaction>
            </yt-icon-button>
        </div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-text-message-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-text-message-renderer">
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Hapus">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Masukkan pengguna dalam waktu tunggu">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M18 3h1V2H5v1h1v5.21L9.79 12 6 15.79V21H5v1h14v-1h-1v-5.21L14.21 12 18 8.21Zm-5.21 9L17 16.21V21H7v-4.79L11.21 12 7 7.79V3h10v4.79ZM12 16l4 4H8ZM9 7h6l-3 3Z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Sembunyikan pengguna di channel ini">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path></g></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
            </div>
        </div>
    </yt-live-chat-text-message-renderer>
    <!-- end message 2 -->
    <!-- message 3 -->
    <yt-live-chat-text-message-renderer class="style-scope yt-live-chat-item-list-renderer" author-type="member">
        <yt-img-shadow id="author-photo" class="no-transition style-scope yt-live-chat-text-message-renderer" height="24" width="24" style="background-color: transparent;" loaded="">
            <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png" width="24" height="24">
        </yt-img-shadow>
        <div id="content" class="style-scope yt-live-chat-text-message-renderer">
            <span id="timestamp" class="style-scope yt-live-chat-text-message-renderer">11:32 AM</span>
            <yt-live-chat-author-chip class="style-scope yt-live-chat-text-message-renderer" is-highlighted="">
                <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                <span id="author-name" dir="auto" class="owner style-scope yt-live-chat-author-chip">Member name<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                    <yt-live-chat-author-badge-renderer class="style-scope yt-live-chat-author-chip" aria-label="Pelanggan (6 bulan)" type="member" shared-tooltip-text="Pelanggan (6 bulan)">
                        <div id="image" class="style-scope yt-live-chat-author-badge-renderer">
                            <img src="https://i.ibb.co/yWxg4J1/image-6.png" class="style-scope yt-live-chat-author-badge-renderer" alt="Pelanggan (6 bulan)">
                        </div>
                    </yt-live-chat-author-badge-renderer>
                </span>
            </yt-live-chat-author-chip>
            ​<span id="message" dir="auto" class="style-scope yt-live-chat-text-message-renderer">Great! thanks</span>
            <span id="deleted-state" class="style-scope yt-live-chat-text-message-renderer"></span>
            <a id="show-original" href="#" class="style-scope yt-live-chat-text-message-renderer"></a>
        </div>
        <div id="menu" class="style-scope yt-live-chat-text-message-renderer">
            <yt-icon-button id="menu-button" class="style-scope yt-live-chat-text-message-renderer">
                <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                    <yt-icon icon="more_vert" class="style-scope yt-live-chat-text-message-renderer">
                        <yt-icon-shape class="style-scope yt-icon">
                            <icon-shape class="yt-spec-icon-shape">
                                <div style="width: 100%; height: 100%; fill: currentcolor;">
                                    <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                </div>
                            </icon-shape>
                        </yt-icon-shape>
                    </yt-icon>
                </button>
                <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                    <div class="stroke style-scope yt-interaction"></div>
                    <div class="fill style-scope yt-interaction"></div>
                </yt-interaction>
            </yt-icon-button>
        </div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-text-message-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-text-message-renderer">
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Hapus">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Masukkan pengguna dalam waktu tunggu">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M18 3h1V2H5v1h1v5.21L9.79 12 6 15.79V21H5v1h14v-1h-1v-5.21L14.21 12 18 8.21Zm-5.21 9L17 16.21V21H7v-4.79L11.21 12 7 7.79V3h10v4.79ZM12 16l4 4H8ZM9 7h6l-3 3Z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Sembunyikan pengguna di channel ini">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path></g></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
            </div>
        </div>
    </yt-live-chat-text-message-renderer>
    <!-- end message 3 -->
    <!-- message 4 -->
    <yt-live-chat-text-message-renderer class="style-scope yt-live-chat-item-list-renderer" author-type>
        <yt-img-shadow id="author-photo" class="no-transition style-scope yt-live-chat-text-message-renderer" height="24" width="24" style="background-color: transparent;" loaded="">
            <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png" width="24" height="24">
        </yt-img-shadow>
        <div id="content" class="style-scope yt-live-chat-text-message-renderer">
            <span id="timestamp" class="style-scope yt-live-chat-text-message-renderer">11:32 AM</span>
            <yt-live-chat-author-chip class="style-scope yt-live-chat-text-message-renderer" is-highlighted="">
                <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                <span id="author-name" dir="auto" class="owner style-scope yt-live-chat-author-chip">Viewers name<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                <span id="chat-badges" class="style-scope yt-live-chat-author-chip"></span>
            </yt-live-chat-author-chip>
            ​<span id="message" dir="auto" class="style-scope yt-live-chat-text-message-renderer">Who am I?</span>
            <span id="deleted-state" class="style-scope yt-live-chat-text-message-renderer"></span>
            <a id="show-original" href="#" class="style-scope yt-live-chat-text-message-renderer"></a>
        </div>
        <div id="menu" class="style-scope yt-live-chat-text-message-renderer">
            <yt-icon-button id="menu-button" class="style-scope yt-live-chat-text-message-renderer">
                <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                    <yt-icon icon="more_vert" class="style-scope yt-live-chat-text-message-renderer">
                        <yt-icon-shape class="style-scope yt-icon">
                            <icon-shape class="yt-spec-icon-shape">
                                <div style="width: 100%; height: 100%; fill: currentcolor;">
                                    <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                </div>
                            </icon-shape>
                        </yt-icon-shape>
                    </yt-icon>
                </button>
                <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                    <div class="stroke style-scope yt-interaction"></div>
                    <div class="fill style-scope yt-interaction"></div>
                </yt-interaction>
            </yt-icon-button>
        </div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-text-message-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-text-message-renderer">
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Hapus">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Masukkan pengguna dalam waktu tunggu">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M18 3h1V2H5v1h1v5.21L9.79 12 6 15.79V21H5v1h14v-1h-1v-5.21L14.21 12 18 8.21Zm-5.21 9L17 16.21V21H7v-4.79L11.21 12 7 7.79V3h10v4.79ZM12 16l4 4H8ZM9 7h6l-3 3Z"></path></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
                <yt-button-renderer class="style-scope yt-live-chat-text-message-renderer style-default size-default" is-icon-button="" has-no-text="">
                    <a class="yt-simple-endpoint style-scope yt-button-renderer" tabindex="-1">
                        <yt-icon-button id="button" class="style-scope yt-button-renderer style-default size-default">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Sembunyikan pengguna di channel ini">
                                <yt-icon class="style-scope yt-button-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm7 11H5v-2h14v2z"></path></g></svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </a>
                </yt-button-renderer>
            </div>
        </div>
    </yt-live-chat-text-message-renderer>
    <!-- end message 4 -->
    `)
}

function showSuperchat(selector){
    $(selector).append(`
    <!-- SC new -->
    <yt-live-chat-paid-message-renderer class="style-scope yt-live-chat-item-list-renderer" modern="" id="ChwKGkNOUG9ub3I0MllFREZiM0R3Z1FkUVNJSkJR" show-only-header="" is-v2-style="" allow-animations="" style="--yt-live-chat-paid-message-primary-color: rgba(30,136,229,1); --yt-live-chat-paid-message-secondary-color: rgba(21,101,192,1); --yt-live-chat-paid-message-header-color: rgba(255,255,255,1); --yt-live-chat-paid-message-timestamp-color: rgba(255,255,255,0.5019607843137255); --yt-live-chat-paid-message-color: rgba(255,255,255,1); --yt-live-chat-disable-highlight-message-author-name-color: rgba(255,255,255,0.7019607843137254); --yt-live-chat-text-input-background-color: rgba(0,0,0,0.18823529411764706);">
        <div id="card" class="style-scope yt-live-chat-paid-message-renderer">
            <div id="header" class="style-scope yt-live-chat-paid-message-renderer">
                <yt-img-shadow id="author-photo" class="style-scope yt-live-chat-paid-message-renderer no-transition" style="background-color: transparent;" loaded="">
                    <imgid="img" draggable="false" class="style-scope yt-img-shadow" alt="" width="32" height="32" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png">
                </yt-img-shadow>
                <dom-if restamp="" class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                <dom-if class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                <dom-if restamp="" class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                <div id="header-content" class="style-scope yt-live-chat-paid-message-renderer">
                    <div id="header-content-primary-column" class="style-scope yt-live-chat-paid-message-renderer">
                        <div id="single-line" class="style-scope yt-live-chat-paid-message-renderer">
                            <div id="author-name-chip" class="style-scope yt-live-chat-paid-message-renderer">
                                <yt-live-chat-author-chip disable-highlighting="" single-line="" class="style-scope yt-live-chat-paid-message-renderer">
                                    <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                                    <span id="author-name" dir="auto" class="member single-line style-scope yt-live-chat-author-chip style-scope yt-live-chat-author-chip">Username<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                                    <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                                        
                                    </span>
                                </yt-live-chat-author-chip>
                            </div>
                            <div id="purchase-amount-column" class="style-scope yt-live-chat-paid-message-renderer">
                                <yt-img-shadow id="currency-img" height="16" width="16" class="style-scope yt-live-chat-paid-message-renderer no-transition" hidden="">
                                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" height="16" width="16">
                                </yt-img-shadow>
                                <div id="purchase-amount" class="style-scope yt-live-chat-paid-message-renderer">
                                    <yt-formatted-string class="style-scope yt-live-chat-paid-message-renderer">Rp&nbsp;10.000,00</yt-formatted-string>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span id="timestamp" class="style-scope yt-live-chat-paid-message-renderer">8:02 PM</span>
                    <div id="gradient-container" class="style-scope yt-live-chat-paid-message-renderer">
                        <div id="gradient" class="style-scope yt-live-chat-paid-message-renderer"></div>
                    </div>
                    <div id="menu" class="style-scope yt-live-chat-paid-message-renderer">
                        <yt-icon-button id="menu-button" class="style-scope yt-live-chat-paid-message-renderer">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                                <yt-icon icon="more_vert" class="style-scope yt-live-chat-paid-message-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                                                    <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                                                </svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction></yt-icon-button>
                    </div>
                    <div id="creator-heart-button" class="style-scope yt-live-chat-paid-message-renderer"></div>
                </div>
            </div>
            <div id="content" class="style-scope yt-live-chat-paid-message-renderer">
                <div id="message" dir="auto" class="style-scope yt-live-chat-paid-message-renderer"></div>
                <div id="input-container" class="style-scope yt-live-chat-paid-message-renderer">
                    <dom-if class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                </div>
                <yt-formatted-string id="deleted-state" class="style-scope yt-live-chat-paid-message-renderer" is-empty="">
                    <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
                </yt-formatted-string>
                <div id="footer" class="style-scope yt-live-chat-paid-message-renderer"></div>
            </div>
        </div>
        <div id="lower-bumper" class="style-scope yt-live-chat-paid-message-renderer"></div>
        <div id="buy-flow-button" class="style-scope yt-live-chat-paid-message-renderer" hidden=""></div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-paid-message-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-paid-message-renderer"></div>
        </div>
    </yt-live-chat-paid-message-renderer>
    <!-- end SC new -->
    <!-- new SC 2 -->
    <yt-live-chat-paid-message-renderer class="style-scope yt-live-chat-item-list-renderer" modern="" id="ChwKGkNQZlZ3cDM0MllFREZaa0RyUVlkZW1RUDBn" is-v2-style="" allow-animations="" style="--yt-live-chat-paid-message-primary-color: rgba(0,229,255,1); --yt-live-chat-paid-message-secondary-color: rgba(0,184,212,1); --yt-live-chat-paid-message-header-color: rgba(0,0,0,1); --yt-live-chat-paid-message-timestamp-color: rgba(0,0,0,0.5019607843137255); --yt-live-chat-paid-message-color: rgba(0,0,0,1); --yt-live-chat-disable-highlight-message-author-name-color: rgba(0,0,0,0.7019607843137254); --yt-live-chat-text-input-background-color: rgba(255,255,255,0.18823529411764706);">
        <div id="card" class="style-scope yt-live-chat-paid-message-renderer">
            <div id="header" class="style-scope yt-live-chat-paid-message-renderer">
                <yt-img-shadow id="author-photo" class="style-scope yt-live-chat-paid-message-renderer no-transition" style="background-color: transparent;" loaded="">
                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" width="32" height="32" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png">
                </yt-img-shadow>
                <dom-if restamp="" class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                <dom-if class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                <dom-if restamp="" class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                <div id="header-content" class="style-scope yt-live-chat-paid-message-renderer">
                    <div id="header-content-primary-column" class="style-scope yt-live-chat-paid-message-renderer">
                        <div id="single-line" class="style-scope yt-live-chat-paid-message-renderer">
                            <div id="author-name-chip" class="style-scope yt-live-chat-paid-message-renderer">
                                <yt-live-chat-author-chip disable-highlighting="" single-line="" class="style-scope yt-live-chat-paid-message-renderer">
                                    <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                                    <span id="author-name" dir="auto" class="member single-line style-scope yt-live-chat-author-chip style-scope yt-live-chat-author-chip">Username<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                                    <span id="chat-badges" class="style-scope yt-live-chat-author-chip">

                                    </span>
                                </yt-live-chat-author-chip>
                            </div>
                            <div id="purchase-amount-column" class="style-scope yt-live-chat-paid-message-renderer">
                                <yt-img-shadow id="currency-img" height="16" width="16" class="style-scope yt-live-chat-paid-message-renderer no-transition" hidden="">
                                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" height="16" width="16">
                                </yt-img-shadow>
                                <div id="purchase-amount" class="style-scope yt-live-chat-paid-message-renderer">
                                    <yt-formatted-string class="style-scope yt-live-chat-paid-message-renderer">Rp&nbsp;20.000,00</yt-formatted-string>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span id="timestamp" class="style-scope yt-live-chat-paid-message-renderer">8:03 PM</span>
                    <div id="gradient-container" class="style-scope yt-live-chat-paid-message-renderer">
                        <div id="gradient" class="style-scope yt-live-chat-paid-message-renderer"></div>
                    </div>
                    <div id="menu" class="style-scope yt-live-chat-paid-message-renderer">
                        <yt-icon-button id="menu-button" class="style-scope yt-live-chat-paid-message-renderer">
                            <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                                <yt-icon icon="more_vert" class="style-scope yt-live-chat-paid-message-renderer">
                                    <yt-icon-shape class="style-scope yt-icon">
                                        <icon-shape class="yt-spec-icon-shape">
                                            <div style="width: 100%; height: 100%; fill: currentcolor;">
                                                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                                                    <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                                                </svg>
                                            </div>
                                        </icon-shape>
                                    </yt-icon-shape>
                                </yt-icon>
                            </button>
                            <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                                <div class="stroke style-scope yt-interaction"></div>
                                <div class="fill style-scope yt-interaction"></div>
                            </yt-interaction>
                        </yt-icon-button>
                    </div>
                    <div id="creator-heart-button" class="style-scope yt-live-chat-paid-message-renderer"></div>
                </div>
            </div>
            <div id="content" class="style-scope yt-live-chat-paid-message-renderer">
                <div id="message" dir="auto" class="style-scope yt-live-chat-paid-message-renderer">Lorem ipsum dolor sit amet</div>
                <div id="input-container" class="style-scope yt-live-chat-paid-message-renderer">
                    <dom-if class="style-scope yt-live-chat-paid-message-renderer"><template is="dom-if"></template></dom-if>
                </div>
                <yt-formatted-string id="deleted-state" class="style-scope yt-live-chat-paid-message-renderer" is-empty="">
                    <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
                </yt-formatted-string>
                <div id="footer" class="style-scope yt-live-chat-paid-message-renderer"></div>
            </div>
        </div>
        <div id="lower-bumper" class="style-scope yt-live-chat-paid-message-renderer"></div>
        <div id="buy-flow-button" class="style-scope yt-live-chat-paid-message-renderer" hidden=""></div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-paid-message-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-paid-message-renderer"></div>
        </div>
    </yt-live-chat-paid-message-renderer>
    <!-- end new SC 2 -->
    <!-- sticker -->
    <yt-live-chat-paid-sticker-renderer class="style-scope yt-live-chat-item-list-renderer" style="--yt-live-chat-paid-sticker-chip-background-color: rgba(30,136,229,1); --yt-live-chat-paid-sticker-chip-text-color: rgba(255,255,255,1); --yt-live-chat-paid-sticker-background-color: rgba(21,101,192,1); --yt-live-chat-disable-highlight-message-author-name-color: rgba(255,255,255,0.7019607843137254);">
        <div id="card" class="style-scope yt-live-chat-paid-sticker-renderer">
            <div id="author-info" tabindex="0" class="style-scope yt-live-chat-paid-sticker-renderer">
                <yt-img-shadow id="author-photo" class="no-transition style-scope yt-live-chat-paid-sticker-renderer" style="background-color: transparent;" loaded="">
                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" src="https://yt3.ggpht.com/1KqRN-uj2pOiaJqesu3o_rc2ogQmVc4RnjIf-1zTxO2OmYLPJrYbmP5K1pW6ngX9WTEXI20Q=s88-c-k-c0x00ffffff-no-rj-mo" width="40" height="40">
                </yt-img-shadow>
                <div id="content" class="style-scope yt-live-chat-paid-sticker-renderer">
                    <span id="timestamp" class="style-scope yt-live-chat-paid-sticker-renderer">36.27</span>
                    <div id="content-primary-column" class="style-scope yt-live-chat-paid-sticker-renderer">
                        <div id="author-name-chip" class="style-scope yt-live-chat-paid-sticker-renderer">
                            <yt-live-chat-author-chip disable-highlighting="" single-line="" class="style-scope yt-live-chat-paid-sticker-renderer">
                                <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                                <span id="author-name" dir="auto" class="member single-line style-scope yt-live-chat-author-chip">Username<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                                </span>
                            </yt-live-chat-author-chip>
                        </div>
                        <span id="price-column" class="style-scope yt-live-chat-paid-sticker-renderer">
                            <yt-formatted-string id="purchase-amount-chip" class="style-scope yt-live-chat-paid-sticker-renderer">Rp10,000</yt-formatted-string>
                            <yt-formatted-string id="deleted-state" class="style-scope yt-live-chat-paid-sticker-renderer" is-empty="">
                                <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
                            </yt-formatted-string>
                        </span>
                    </div>
                </div>
            </div>
            <div id="sticker-container" class="style-scope yt-live-chat-paid-sticker-renderer sticker-loaded">
                <yt-img-shadow id="sticker" notify-on-loaded="" tabindex="0" class="style-scope yt-live-chat-paid-sticker-renderer no-transition" style="background-color: transparent;" loaded="">
                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="Gambar hati berwarna merah" src="https://lh3.googleusercontent.com/svP4llsw-MrtAFpcCnvSogzZqb8MvZ8Hs1zl2BMlsPAbipq1TFdIwQVGJ_db6AFC4N2uKBHThsw3iQOring=s40-rp" width="40" height="40">
                </yt-img-shadow>
            </div>
            <yt-formatted-string id="dashboard-deleted-state" class="style-scope yt-live-chat-paid-sticker-renderer" is-empty="">
                <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
            </yt-formatted-string>
            <div id="menu" class="style-scope yt-live-chat-paid-sticker-renderer">
                <yt-icon-button id="menu-button" class="style-scope yt-live-chat-paid-sticker-renderer">
                    <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                        <yt-icon icon="more_vert" class="style-scope yt-live-chat-paid-sticker-renderer">
                            <yt-icon-shape class="style-scope yt-icon">
                                <icon-shape class="yt-spec-icon-shape">
                                    <div style="width: 100%; height: 100%; fill: currentcolor;">
                                        <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                    </div>
                                </icon-shape>
                            </yt-icon-shape>
                        </yt-icon>
                    </button>
                    <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                        <div class="stroke style-scope yt-interaction"></div>
                        <div class="fill style-scope yt-interaction"></div>
                    </yt-interaction>
                </yt-icon-button>
            </div>
        </div>
        <div id="buy-flow-button" class="style-scope yt-live-chat-paid-sticker-renderer" hidden=""></div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-paid-sticker-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-paid-sticker-renderer"></div>
        </div>
    </yt-live-chat-paid-sticker-renderer>
    <!-- end sticker -->
    `)
}

function showMembership(selector){
    $(selector).append(`
    <!-- member 1 -->
    <yt-live-chat-membership-item-renderer show-only-header class="style-scope yt-live-chat-item-list-renderer">
        <div id="card" class="style-scope yt-live-chat-membership-item-renderer">
            <div id="header" class="style-scope yt-live-chat-membership-item-renderer">
                <yt-img-shadow id="author-photo" height="40" width="40" class="style-scope yt-live-chat-membership-item-renderer no-transition" style="background-color: transparent" loaded="">
                    <img id="img" class="style-scope yt-img-shadow" alt="" height="40" width="40" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png">
                </yt-img-shadow>
                <div id="header-content" class="style-scope yt-live-chat-membership-item-renderer">
                    <div id="header-content-primary-column" class="style-scope yt-live-chat-membership-item-renderer">
                        <div id="header-content-inner-column" class="style-scope yt-live-chat-membership-item-renderer">
                            <yt-live-chat-author-chip class="style-scope yt-live-chat-membership-item-renderer">
                                <span id="author-name" dir="auto" class="member style-scope yt-live-chat-author-chip">Username<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                                    <yt-live-chat-author-badge-renderer class="style-scope yt-live-chat-author-chip" aria-label="New member" type="member" shared-tooltip-text="New member">
                                        <div id="image" class="style-scope yt-live-chat-author-badge-renderer">
                                            <img src="https://i.ibb.co/yWxg4J1/image-6.png" class="style-scope yt-live-chat-author-badge-renderer" alt="New member">
                                        </div>
                                    </yt-live-chat-author-badge-renderer>
                                </span>
                            </yt-live-chat-author-chip>
                            <div id="header-primary-text" class="style-scope yt-live-chat-membership-item-renderer"></div>
                        </div>
                        <div id="header-subtext" class="style-scope yt-live-chat-membership-item-renderer"> Welcome to Membership!</div>
                    </div>
                    <div id="timestamp" class="style-scope yt-live-chat-membership-item-renderer"> 11:44 AM </div>
                </div>
            </div>
        </div>
    </yt-live-chat-membership-item-renderer>
    <!-- end member 1 -->
    <!-- member 2 -->
    <yt-live-chat-membership-item-renderer class="style-scope yt-live-chat-membership-item-renderer" has-primary-header-text="">
        <div id="card" class="style-scope yt-live-chat-membership-item-renderer">
            <div id="header" class="style-scope yt-live-chat-membership-item-renderer">
                <yt-img-shadow id="author-photo" height="40" width="40" class="style-scope yt-live-chat-membership-item-renderer no-transition" style="background-color: transparent;" loaded="">
                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png" width="40" height="40">
                </yt-img-shadow>
                <div id="header-content" class="style-scope yt-live-chat-membership-item-renderer">
                    <div id="header-content-primary-column" class="style-scope yt-live-chat-membership-item-renderer">
                        <div id="header-content-inner-column" class="style-scope yt-live-chat-membership-item-renderer">
                            <yt-live-chat-author-chip class="style-scope yt-live-chat-membership-item-renderer">
                                <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                                <span id="author-name" dir="auto" class="member style-scope yt-live-chat-author-chip">Username<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                                <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                                    <yt-live-chat-author-badge-renderer class="style-scope yt-live-chat-author-chip" aria-label="New member" type="member" shared-tooltip-text="New member">
                                        <div id="image" class="style-scope yt-live-chat-author-badge-renderer">
                                            <img src="https://i.ibb.co/yWxg4J1/image-6.png" class="style-scope yt-live-chat-author-badge-renderer" alt="New member">
                                        </div>
                                    </yt-live-chat-author-badge-renderer>
                                </span>
                            </yt-live-chat-author-chip>
                            <div id="header-primary-text" class="style-scope yt-live-chat-membership-item-renderer">Member for 2 months</div>
                        </div>
                        <div id="header-subtext" class="style-scope yt-live-chat-membership-item-renderer">Membership Name</div>
                    </div>
                    <div id="timestamp" class="style-scope yt-live-chat-membership-item-renderer">2:27 PM</div>
                </div>
                <div id="menu" class="style-scope yt-live-chat-membership-item-renderer">
                    <yt-icon-button id="menu-button" class="style-scope yt-live-chat-membership-item-renderer">
                        <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                            <yt-icon icon="more_vert" class="style-scope yt-live-chat-membership-item-renderer">
                                <yt-icon-shape class="style-scope yt-icon">
                                    <icon-shape class="yt-spec-icon-shape">
                                        <div style="width: 100%; height: 100%; fill: currentcolor;">
                                            <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                        </div>
                                    </icon-shape>
                                </yt-icon-shape>
                            </yt-icon>
                        </button>
                        <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                            <div class="stroke style-scope yt-interaction"></div>
                            <div class="fill style-scope yt-interaction"></div>
                        </yt-interaction>
                    </yt-icon-button>
                </div>
            </div>
            <div id="content" class="style-scope yt-live-chat-membership-item-renderer">
                <div id="message" dir="auto" class="style-scope yt-live-chat-membership-item-renderer">Lorem ipsum dolor sit amet<tp-yt-paper-tooltip class="style-scope yt-live-chat-membership-item-renderer" role="tooltip" tabindex="-1" style="--paper-tooltip-delay-in: 0ms; inset: 20.6px auto auto 36.8333px;"><div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip"> :_lucubPat: </div></tp-yt-paper-tooltip></div>
                <yt-formatted-string id="deleted-state" class="style-scope yt-live-chat-membership-item-renderer" is-empty="">
                    <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
                </yt-formatted-string>
            </div>
        </div>
        <div id="footer-button" class="style-scope yt-live-chat-membership-item-renderer" hidden=""></div>
        <div id="inline-action-button-container" class="style-scope yt-live-chat-membership-item-renderer" aria-hidden="true">
            <div id="inline-action-buttons" class="style-scope yt-live-chat-membership-item-renderer"></div>
        </div>
    </yt-live-chat-membership-item-renderer>
    <!-- end member 2 -->
    <!-- gift -->
    <ytd-sponsorships-live-chat-gift-purchase-announcement-renderer class="style-scope yt-live-chat-item-list-renderer">
        <ytd-sponsorships-live-chat-header-renderer id="header" class="style-scope ytd-sponsorships-live-chat-gift-purchase-announcement-renderer">
            <div id="header" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                <div id="content" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                    <yt-img-shadow id="author-photo" height="40" width="40" class="style-scope ytd-sponsorships-live-chat-header-renderer no-transition" style="background-color: transparent;" loaded="">
                        <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" height="40" width="40" src="https://i.ibb.co/J5d7tq7/Ellipse-13.png">
                    </yt-img-shadow>
                    <div id="header-content" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                        <div id="header-content-primary-column" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                            <div id="header-content-inner-column" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                                <yt-live-chat-author-chip single-line="" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                                    <span id="prepend-chat-badges" class="style-scope yt-live-chat-author-chip"></span>
                                    <span id="author-name" dir="auto" class="member single-line style-scope yt-live-chat-author-chip">Username<span id="chip-badges" class="style-scope yt-live-chat-author-chip"></span></span>
                                    <span id="chat-badges" class="style-scope yt-live-chat-author-chip">
                                        <yt-live-chat-author-badge-renderer class="style-scope yt-live-chat-author-chip" aria-label="Pelanggan baru" type="member" shared-tooltip-text="Pelanggan baru">
                                            <div id="image" class="style-scope yt-live-chat-author-badge-renderer">
                                                <img src="https://i.ibb.co/yWxg4J1/image-6.png" class="style-scope yt-live-chat-author-badge-renderer" alt="Pelanggan baru">
                                            </div>
                                        </yt-live-chat-author-badge-renderer>
                                    </span>
                                </yt-live-chat-author-chip>
                                <div id="primary-text" class="style-scope ytd-sponsorships-live-chat-header-renderer">Gifted 2 Memberships</div>
                            </div>
                            <div id="secondary-text" class="style-scope ytd-sponsorships-live-chat-header-renderer"></div>
                        </div>
                        <div id="header-content-deleted-state" class="style-scope ytd-sponsorships-live-chat-header-renderer" hidden="">
                            <div id="deleted-primary-text" class="style-scope ytd-sponsorships-live-chat-header-renderer"></div>
                        </div>
                    </div>
                </div>
                <yt-img-shadow class="rhs-image style-scope ytd-sponsorships-live-chat-header-renderer no-transition" height="104" width="104" style="background-color: transparent;" loaded="">
                    <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" height="104" width="104" src="https://www.gstatic.com/youtube/img/sponsorships/sponsorships_gift_purchase_announcement_artwork.png">
                </yt-img-shadow>
                <div id="menu" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                    <yt-icon-button id="menu-button" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                        <button id="button" class="style-scope yt-icon-button" aria-label="Tindakan chat">
                            <yt-icon icon="more_vert" class="style-scope ytd-sponsorships-live-chat-header-renderer">
                                <yt-icon-shape class="style-scope yt-icon">
                                    <icon-shape class="yt-spec-icon-shape">
                                        <div style="width: 100%; height: 100%; fill: currentcolor;">
                                            <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"> <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"> </path> </svg>
                                        </div>
                                    </icon-shape>
                                </yt-icon-shape>
                            </yt-icon>
                        </button>
                        <yt-interaction id="interaction" class="circular style-scope yt-icon-button">
                            <div class="stroke style-scope yt-interaction"></div>
                            <div class="fill style-scope yt-interaction"></div>
                        </yt-interaction>
                    </yt-icon-button>
                </div>
            </div>
        </ytd-sponsorships-live-chat-header-renderer>
    </ytd-sponsorships-live-chat-gift-purchase-announcement-renderer>
    <!-- end gift -->
    `)
}

function generateMenu(fields) {
    var groupLists = {};
    $("#parentMenu").empty()

    $.each(fields, function(key, value) {
        var group = value.group;
        if (group) {
            if (!groupLists[group]) {
                groupLists[group] = [];
            }
            groupLists[group].push(value);
        }
    });

    $.each(groupLists, function(key, items) {
        id = key.split(' ').join('');

        $("#parentMenu").append(`
            <!-- accordion item -->
            <div class="rounded-none">
                <!-- heading accordion -->
                <h2 class="mb-0" id="flush-heading${id}">
                    <button
                        class="group relative flex w-full items-center rounded-none border-0 bg-white px-1 py-4 text-right text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary  dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                        type="button" data-te-collapse-init data-te-collapse-collapsed data-te-target="#flush-collapse${id}"
                        aria-expanded="false" aria-controls="flush-collapse${id}">
                        <span
                            class="-ml-0 mr-3 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#212529] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:ml-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#212529] dark:group-[[data-te-collapse-collapsed]]:fill-[#212529]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="#212529" class="h-5 w-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                        <span class="text-gray-600 text-sm font-bold">${key}</span>
                    </button>
                </h2>
                <!-- end heading -->
                <!-- content -->
                <div id="flush-collapse${id}" class="!visible hidden border-0" data-te-collapse-item
                    aria-labelledby="flush-heading${id}" data-te-parent="#parentMenu">
                    <div id="item-widget-${id}" class="px-5 py-2 text-xs">
                        
                    </div>
                </div>
                <!-- end content -->
            </div>
            <!-- end accordion item -->
        `)

        var subGroupList = []

        $.each(items, function(i, item){

            if(item['sub-group'] !== 'none') {
                if(subGroupList.indexOf(item['sub-group']) === -1) {
                    $("#item-widget-"+id).append(`
                    <div id="child-menu-${item['sub-group']}">
                        <!-- accordion item -->
                        <div class="rounded-none">
                            <!-- heading accordion -->
                            <h2 class="mb-0" id="flush-heading${item['sub-group']}">
                                <button
                                    class="group relative flex w-full items-center rounded-none border-0 bg-white px-1 py-4 text-right text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary  dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                                    type="button" data-te-collapse-init data-te-collapse-collapsed data-te-target="#flush-collapse${item['sub-group']}"
                                    aria-expanded="false" aria-controls="flush-collapse${item['sub-group']}">
                                    <span
                                        class="-ml-0 mr-3 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#212529] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:ml-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#212529] dark:group-[[data-te-collapse-collapsed]]:fill-[#212529]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="#212529" class="h-5 w-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                    <span class="text-gray-600 text-sm font-bold">${item['sub-group']}</span>
                                </button>
                            </h2>
                            <!-- end heading -->
                            <!-- content -->
                            <div id="flush-collapse${item['sub-group']}" class="!visible hidden border-0" data-te-collapse-item
                                aria-labelledby="flush-heading${item['sub-group']}" data-te-parent="#child-menu-${item['sub-group']}">
                                <div id="item-widget-${item['sub-group']}" class="px-5 py-2 text-xs">
                                    
                                </div>
                            </div>
                            <!-- end content -->
                        </div>
                        <!-- end accordion item -->
                    </div>
                    `)

                    subGroupList.push(item['sub-group']);
                }

                if (item.type === 'colorPicker') {
                    $("#item-widget-"+item['sub-group']).append(`
                        <div class="pb-2">
                            <label class="pl-0">${item.label}</label>
                            <div class="input-container py-3 flex flex-row">
                                <input class="custom-input-color-2 ${item.id}" type="color" value="#000000" name="${item.id}">
                                <input class="ml-2 custom-input-text ${item.id}" type="text" name="${item.id}">
                            </div>
                        </div>
                    `)
                } else if(item.type === 'number') {
                    $("#item-widget-"+item['sub-group']).append(`
                        <div class="pb-2">
                            <label class="pl-0">${item.label}</label>
                            <div class="input-container py-3">
                                <input class="custom-input-text ${item.id}" id="${item.id}" type="number" name="${item.id}">
                            </div>
                        </div>
                    `)
                }


            } else {
                if (item.type === 'colorPicker') {
                    $("#item-widget-"+id).append(`
                        <div class="pb-2">
                            <label class="pl-0">${item.label}</label>
                            <div class="input-container py-2 flex flex-row">
                                <input class="custom-input-color-2 ${item.id}" type="color" value="#000000" name="${item.id}">
                                <input class="ml-2 custom-input-text ${item.id}" type="text" name="${item.id}">
                            </div>
                        </div>
                    `)
                } else if(item.type === 'number') {
                    $("#item-widget-"+id).append(`
                        <div class="pb-2">
                            <label class="pl-0">${item.label}</label>
                            <div class="input-container py-2">
                                <input class="custom-input-text ${item.id}" id="${item.id}" type="number" name="${item.id}">
                            </div>
                        </div>
                    `)
                }
            }

        })
    })
}